import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/app/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

const VAT_TAX_RATE_ID = 'txr_1R7DBmLEJlt9ALSCIZlfxiv1'; // <- Twój VAT 23%

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      document_id,
      email,
      name,
      company_name,
      nip,
      street,
      zip,
      city,
      quantity,
    } = body;

    if (!document_id || !email || !quantity) {
      return NextResponse.json({ error: 'Brak wymaganych danych' }, { status: 400 });
    }

    // 1. Utwórz klienta Stripe z adresem i NIP-em
    const customer = await stripe.customers.create({
      email,
      name: company_name || name,
      address: {
        line1: street,
        postal_code: zip,
        city,
        country: 'PL',
      },
      metadata: {
        nip,
        document_id,
        client_fullname: name,
      },
    });

    // 2. Dodaj VAT UE jeśli jest NIP
    if (nip) {
      const cleanedNip = nip.replace(/\D/g, '');
      if (cleanedNip.length === 10) {
        const taxId = `PL${cleanedNip}`;
        await stripe.customers.createTaxId(customer.id, {
          type: 'eu_vat',
          value: taxId,
        });
      }
    }

    // 3. Utwórz sesję Checkout z VAT-em i quantity
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card', 'p24'],
      locale: 'pl',
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'pln',
            unit_amount: 29900,
            product_data: {
              name: 'Usługa Marketingowa - Moderacja Opinii',
            },
          },
          quantity,
          tax_rates: [VAT_TAX_RATE_ID],
        },
      ],
      invoice_creation: {
        enabled: true,
      },
      metadata: {
        document_id,
        name,
        company_name,
        nip,
        street,
        zip,
        city,
        quantity: quantity.toString(),
      },
      success_url: `${process.env.DOMAIN}/success-page-reviews?documentId=${document_id}&sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/formularz-opinie`,
    });

    // 4. Zapisz do Supabase
    const { error } = await supabase.from('payments').insert({
      document_id,
      session_id: session.id,
      status: 'pending',
    });

    if (error) {
      console.error('❌ Błąd zapisu do Supabase:', error);
      return NextResponse.json({ error: 'Błąd zapisu do Supabase' }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('❌ Stripe payment error:', err);
    return NextResponse.json({ error: 'Stripe checkout error' }, { status: 500 });
  }
}
