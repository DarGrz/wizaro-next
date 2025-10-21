import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(request: NextRequest) {
  try {
    const {
      document_id,
      email,
      company_name,
      nip,
    } = await request.json();

    // Tworzenie sesji płatności Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'blik', 'p24'],
      line_items: [
        {
          price_data: {
            currency: 'pln',
            product_data: {
              name: 'Wniosek RODO - Usunięcie danych osobowych',
              description: 'Przygotowanie i wysłanie wniosku o usunięcie danych osobowych zgodnie z RODO',
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
      billing_address_collection: 'required',
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
    return NextResponse.json(
      { error: 'Błąd podczas tworzenia płatności' },
      { status: 500 }
    );
  }
}