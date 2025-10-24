import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Brak ID sesji' },
        { status: 400 }
      );
    }

    // Pobierz dane sesji ze Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer']
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Nie znaleziono sesji płatności' },
        { status: 404 }
      );
    }

    // Sprawdź czy płatność została zakończona pomyślnie
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Płatność nie została zakończona' },
        { status: 400 }
      );
    }

    // Pobierz dane firmy z metadanych lub z bazy danych
    const customer = session.customer as Stripe.Customer | null;
    const customerEmail = session.customer_email || customer?.email;
    
    let companyData = null;

    // Jeśli mamy order_id w metadata, pobierz dane z bazy
    if (session.metadata?.order_id) {
      const { data: orderData } = await supabase
        .from('documents')
        .select(`
          *,
          companies (
            name,
            first_name,
            last_name,
            email,
            phone,
            nip,
            street,
            city,
            zip
          )
        `)
        .eq('id', session.metadata.order_id)
        .single();

      if (orderData?.companies) {
        companyData = orderData.companies;
      }
    }

    // Jeśli nie mamy danych z zamówienia, spróbuj znaleźć po emailu
    if (!companyData && customerEmail) {
      const { data: companies } = await supabase
        .from('companies')
        .select('*')
        .eq('email', customerEmail)
        .order('created_at', { ascending: false })
        .limit(1);

      if (companies && companies.length > 0) {
        companyData = companies[0];
      }
    }

    return NextResponse.json({
      success: true,
      session_id: sessionId,
      customer_email: customerEmail,
      amount_total: session.amount_total,
      currency: session.currency,
      payment_status: session.payment_status,
      company: companyData,
      order_id: session.metadata?.order_id
    });

  } catch (error) {
    console.error('❌ Błąd pobierania danych płatności:', error);
    
    return NextResponse.json(
      { 
        error: 'Błąd podczas pobierania danych płatności',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}