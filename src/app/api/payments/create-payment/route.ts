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

    const {
      document_id,
      email,
      company_name,
      nip,
    } = await request.json();

    // Walidacja wymaganych pól
    if (!document_id || !email || !company_name) {
      console.error('❌ Missing required fields:', { document_id, email, company_name });
      return NextResponse.json(
        { error: 'Brak wymaganych danych' },
        { status: 400 }
      );
    }

    // Tworzenie sesji płatności Stripe
    const session = await stripe.checkout.sessions.create({
    
      line_items: [
        {
          price_data: {
            currency: 'pln',
            product_data: {
              name: 'Wniosek RODO - Usunięcie danych osobowych',
              description: 'Przygotowanie wniosku o usunięcie danych osobowych zgodnie z RODO',
            },
            unit_amount: 29900, // 299 zł brutto
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success-rodo?session_id={CHECKOUT_SESSION_ID}&document_id=${document_id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/wniosek-rodo`,
      customer_email: email,
      metadata: {
        document_id: document_id.toString(),
        type: 'rodo_request',
        company_name,
        nip,
      },
      
      customer_creation: 'always',
      invoice_creation: {
        enabled: true,
        invoice_data: {
          metadata: {
            document_id: document_id.toString(),
            type: 'rodo_request',
          },
          custom_fields: [
            {
              name: 'NIP',
              value: nip,
            },
            {
              name: 'Nazwa firmy',
              value: company_name,
            },
          ],
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