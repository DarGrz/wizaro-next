import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
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
              name: 'Wniosek o usunięcie danych – dokument HTML',
            },
            unit_amount: 39900, // 399 zł w groszach
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?documentId=${document_id}&sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cancel`,
      metadata: {
        document_id,
      },
    });

    const { error } = await supabase.from('payments').insert({
      document_id,
      session_id: session.id,
      status: 'pending',
    });

    if (error) {
      console.error('❌ Błąd zapisu płatności:', error);
      return NextResponse.json({ error: 'Błąd zapisu płatności' }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('❌ Stripe error:', err);
    return NextResponse.json({ error: 'Błąd tworzenia płatności' }, { status: 500 });
  }
}
