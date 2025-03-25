import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import db from '@/app/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  try {
    const { document_id } = await req.json();

    if (!document_id) {
      return NextResponse.json({ error: 'Brak document_id' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card','p24'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'pln',
            product_data: {
              name: 'Usunięcie danych firmy – rozwiązanie gotowe do wysłania',
            },
            unit_amount: 39900, // 399.00 PLN
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.DOMAIN}/success?documentId=${document_id}&sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/formularz`,
      metadata: {
        document_id: document_id.toString(),
      },
    });

    db.prepare(
      `INSERT INTO payments (document_id, session_id, status) VALUES (?, ?, 'pending')`
    ).run(document_id, session.id);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('❌ Stripe payment error:', error);
    return NextResponse.json({ error: 'Błąd tworzenia płatności' }, { status: 500 });
  }
}
