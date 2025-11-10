import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(request: NextRequest) {
  try {
    // Sprawdzenie czy klucz Stripe jest dostępny
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('❌ STRIPE_SECRET_KEY not found');
      return NextResponse.json(
        { error: 'Błąd konfiguracji płatności' },
        { status: 500 }
      );
    }

    const requestBody = await request.json();
    
    const {
      document_id,
      email,
      company_name,
      nip,
      address,
      city,
      zipCode,
    } = requestBody;

    // Walidacja wymaganych pól
    if (!document_id || !email || !company_name) {
      console.error('❌ Missing required fields:', { document_id, email, company_name });
      return NextResponse.json(
        { error: 'Brak wymaganych danych' },
        { status: 400 }
      );
    }

    // Tworzenie klienta z danymi firmy
    let customer;
    if (company_name) {
      customer = await stripe.customers.create({
        email: email,
        name: company_name,
        ...(address && city && {
          address: {
            line1: address,
            ...(zipCode && { postal_code: zipCode }),
            city: city,
            country: 'PL',
          }
        }),
        metadata: {
          company_name: company_name,
          ...(nip && { nip }),
          ...(nip && { vat_number: `PL${nip}` }),
          type: 'wizaro_client',
        },
      });
      
      // Dodaj tax_id automatycznie do klienta (bez pytania użytkownika)
      if (nip && customer) {
        try {
          await stripe.customers.createTaxId(customer.id, {
            type: 'eu_vat',
            value: `PL${nip}`,
          });
        } catch (taxError) {
          console.error('⚠️ Nie udało się dodać VAT ID:', taxError);
        }
      }
    }

    // Tworzenie sesji płatności Stripe
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'pln',
            product_data: {
              name: 'Wniosek RODO - Żądanie usunięcia danych osobowych',
              description: 'Gotowy wniosek RODO o usunięcie danych osobowych, zgodny z art. 17 RODO. Otrzymasz w pełni przygotowany dokument z Twoimi danymi gotowy do wysłania do dowolnej firmy lub portalu.',
            },
            unit_amount: 29900, // 299 zł brutto
          },
          quantity: 1,
          // Dodanie tax rate dla polskiego VAT 23% (inclusive)
          ...(nip && {
            tax_rates: ['txr_1R7D3ILEJlt9ALSCyamMiFnX']
          }),
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success-rodo?session_id={CHECKOUT_SESSION_ID}&document_id=${document_id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/wniosek-rodo`,
      
      // Przypisanie klienta do sesji lub email
      ...(customer ? { customer: customer.id } : { customer_email: email }),
      
      metadata: {
        document_id: document_id.toString(),
        type: 'rodo_request',
        company_name: company_name,
        ...(nip && { nip }),
        ...(nip && { vat_number: `PL${nip}` }),
        ...(address && { address }),
        ...(city && { city }),
        ...(zipCode && { zip_code: zipCode }),
      },
      invoice_creation: {
        enabled: false,
        invoice_data: {
          metadata: {
            document_id: document_id.toString(),
            type: 'rodo_request',
            company_name: company_name,
            ...(nip && { nip }),
            ...(nip && { vat_number: `PL${nip}` }),
          },
          // Dane odbiorcy faktury będą pobrane z customer
          description: `Wniosek RODO - Usunięcie danych osobowych`,
          
          
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('❌ Stripe payment error:', error);
    
    // Dodatkowe logowanie dla debugowania
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { 
        error: 'Błąd podczas tworzenia płatności',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}