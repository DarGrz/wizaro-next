import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/app/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

const VAT_TAX_RATE_ID = 'txr_1R7D3ILEJlt9ALSCyamMiFnX'; // <- Twój VAT 23%

export async function POST(req: NextRequest) {
  try {
    const {
      email,
      name,
      company_name,
      nip,
      document_id,
      street,
      zip,
      city,
    } = await req.json();

    if (!document_id) {
      return NextResponse.json({ error: 'Brak document_id' }, { status: 400 });
    }

    // 1. Utwórz klienta w Stripe
    const customer = await stripe.customers.create({
      email,
      name: company_name || name,
      address: {
        line1: street,
        postal_code: zip,
        city: city,
        country: 'PL', // Zakładamy, że to Polska
      },
      metadata: {
        nip,
        document_id,
        client_fullname: name,
      },
    });

    // 2. Dodaj NIP jako VAT EU
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

    // 3. Utwórz sesję Checkout z VAT-em i metadata
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card', 'p24'],
      locale: 'pl',
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'pln',
            product_data: {
              name: 'Usługa Marketingowa - Ochrona reputacji online.',
              description: 'Przygotowanie pisma RODO w celu usunięcia danych z portalu internetowego.',
            },
            unit_amount: 200,
          },
          quantity: 1,
          tax_rates: [VAT_TAX_RATE_ID],
        },
      ],
      invoice_creation: {
        enabled: true,
      },
      metadata: {
        document_id,
      },
      success_url: `${process.env.DOMAIN}/success?documentId=${document_id}&sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/cancel`,
    });

    // 4. Zapisz sesję do Supabase
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
  } catch (error) {
    console.error('❌ Błąd Stripe Checkout:', error);
    return NextResponse.json({ error: 'Błąd podczas tworzenia płatności' }, { status: 500 });
  }
}
