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
      amount = 29900, // domyślnie 299 zł (w groszach)
      orderId,
      email,
      description = 'Natychmiastowa płatność za usługę',
      returnPage = 'thankyou', // domyślnie thankyou, może być też 'dziekuje'
    } = requestBody;

    // Walidacja podstawowych danych
    if (!email) {
      return NextResponse.json(
        { error: 'Brak adresu email' },
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
              name: 'Płatność za usługę Wizaro.pl',
              description: description,
            },
            unit_amount: amount, // kwota w groszach
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success-payment?session_id={CHECKOUT_SESSION_ID}${orderId ? `&order_id=${orderId}` : ''}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${returnPage}?amount=${Math.round(amount / 100)}&description=${encodeURIComponent(description)}${orderId ? `&orderId=${orderId}` : ''}`,
      customer_email: email,
      metadata: {
        ...(orderId && { order_id: orderId }),
        type: 'quick_payment',
      },
      
      customer_creation: 'always',
      invoice_creation: {
        enabled: true,
        invoice_data: {
          metadata: {
            ...(orderId && { order_id: orderId }),
            type: 'quick_payment',
          },
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