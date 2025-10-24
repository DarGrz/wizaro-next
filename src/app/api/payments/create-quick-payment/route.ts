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
      amount, // kwota musi być przekazana z frontendu
      orderId,
      email,
      companyName,
      nip,
      address,
      city,
      zipCode,
      description = 'Natychmiastowa płatność za usługę',
      returnPage = 'thankyou', // domyślnie thankyou, może być też 'dziekuje'
    } = requestBody;

    // Walidacja podstawowych danych
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Brak kwoty płatności lub nieprawidłowa kwota' },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Brak adresu email' },
        { status: 400 }
      );
    }

    if (!companyName) {
      return NextResponse.json(
        { error: 'Brak nazwy firmy' },
        { status: 400 }
      );
    }

    // Tworzenie klienta z danymi firmy
    let customer;
    if (companyName) {
      customer = await stripe.customers.create({
        email: email,
        name: companyName,
        ...(address && city && {
          address: {
            line1: address,
            ...(zipCode && { postal_code: zipCode }),
            city: city,
            country: 'PL',
          }
        }),
        metadata: {
          company_name: companyName,
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
              name: 'Płatność za usługę Wizaro.pl',
              description: description,
            },
            unit_amount: amount, // kwota w groszach
          },
          quantity: 1,
          // Dodanie tax rate dla polskiego VAT 23% (inclusive)
          ...(nip && {
            tax_rates: ['txr_1R7D3ILEJlt9ALSCyamMiFnX']
          }),
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success-payment?session_id={CHECKOUT_SESSION_ID}${orderId ? `&order_id=${orderId}` : ''}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${returnPage}?amount=${Math.round(amount / 100)}&description=${encodeURIComponent(description)}${orderId ? `&orderId=${orderId}` : ''}`,
      
      // Przypisanie klienta do sesji lub email
      ...(customer ? { customer: customer.id } : { customer_email: email }),
      
      metadata: {
        ...(orderId && { order_id: orderId }),
        type: 'quick_payment',
        company_name: companyName,
        ...(nip && { nip }),
        ...(nip && { vat_number: `PL${nip}` }),
        ...(address && { address }),
        ...(city && { city }),
        ...(zipCode && { zip_code: zipCode }),
      },
      invoice_creation: {
        enabled: true,
        invoice_data: {
          metadata: {
            ...(orderId && { order_id: orderId }),
            type: 'quick_payment',
            company_name: companyName,
            ...(nip && { nip }),
            ...(nip && { vat_number: `PL${nip}` }),
          },
          // Dane odbiorcy faktury będą pobrane z customer
          description: `Płatność za usługę Wizaro.pl - ${description}`,
          
          
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