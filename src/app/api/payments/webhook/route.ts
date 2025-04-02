import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import type { AxiosError } from 'axios';


const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
});

interface Company {
  name: string;
  nip: string;
  url: string;
  first_name: string;
  last_name: string;
  phone: string;
  opinie: string;
}

async function createFakturowniaInvoice(company: Company, session: Stripe.Checkout.Session) {
  const fakturowniaApiKey = process.env.FAKTUROWNIA_API_KEY!;
  const fakturowniaDomain = process.env.FAKTUROWNIA_DOMAIN!;

  const invoiceData = {
    api_token: fakturowniaApiKey,
    invoice: {
      kind: "vat",
      number: null,
      sell_date: new Date().toISOString().slice(0, 10),
      issue_date: new Date().toISOString().slice(0, 10),
      payment_to: new Date().toISOString().slice(0, 10),
      // payment_method: "przelew",
      buyer_name: `${company.first_name} ${company.last_name}`,
      buyer_email: session.customer_details?.email || '',
      buyer_tax_no: company.nip,
      buyer_post_code: session.customer_details?.address?.postal_code || '',
      buyer_city: session.customer_details?.address?.city || '',
      buyer_street: session.customer_details?.address?.line1 || '',
      positions: [
        {
          name: "Usługa usunięcia firmy z internetu",
          quantity: 1,
          tax: 23,
          total_price_net: 129.00
        }
      ]
    }
  };

  const response = await axios.post(
    `https://${fakturowniaDomain}.fakturownia.pl/invoices.json`,
    invoiceData,
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );

  return response.data;
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get('stripe-signature');
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !endpointSecret) {
    console.error('❌ Brak signature lub endpointSecret');
    return new NextResponse('Brak danych webhooka', { status: 400 });
  }

  const rawBody = await req.text();
  console.log('📥 Odebrano raw body:', rawBody);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('❌ Webhook signature error:', errorMessage);
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  console.log('✅ Odebrano event Stripe:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const document_id = session.metadata?.document_id;
    const session_id = session.id;

    console.log('📄 document_id:', document_id);
    console.log('💳 session_id:', session_id);

    if (!document_id) {
      console.error('❌ Brak document_id w webhooku');
      return new NextResponse('Brak document_id', { status: 400 });
    }

    const { data, error } = await supabase
      .from('documents')
      .select(`
        companies (
          name,
          nip,
          url,
          first_name,
          last_name,
          phone,
          opinie
        )
      `)
      .eq('id', document_id)
      .single();

    if (error || !data || !data.companies) {
      console.error('❌ Błąd pobierania danych firmy:', error?.message);
      return new NextResponse('Błąd pobierania danych firmy', { status: 500 });
    }

    const company = data.companies as unknown as Company;

    const html = `
Szanowni Państwo,<br><br>
Na podstawie art. 17 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO) zwracam się z uprzejmą prośbą o usunięcie danych mojej firmy:<br><br>  
<strong>${company.name}</strong><br>
${company.nip}<br><br>  
Dane te znajdują się pod adresem:<br>  
<a href="${company.url}">${company.url}</a><br><br>
Proszę o ich usunięcie w związku z realizacją mojego prawa do ochrony danych osobowych oraz ograniczenia ich przetwarzania.<br><br>Jednocześnie wycofuję wszelkie zgody na przetwarzanie tych danych w celach marketingowych, promocyjnych oraz innych.<br><br>
Proszę o potwierdzenie realizacji mojej prośby oraz kontakt w razie potrzeby uzupełnienia dodatkowych informacji.<br><br>  
Z góry dziękuję za współpracę i profesjonalne podejście do sprawy.<br><br>
Z wyrazami szacunku,<br>
${company.first_name} ${company.last_name}<br><br>
<p style="font-style:italic;">Szablon wiadomości został pobrany ze strony wzorypism.io.</p>
    `;

    console.log('📝 Generuję treść dokumentu dla firmy:', company.name);

    const { error: updateError } = await supabase
      .from('documents')
      .update({ content: html })
      .eq('id', document_id);

    if (updateError) {
      console.error('❌ Błąd przy aktualizacji dokumentu:', updateError.message);
    } else {
      console.log('✅ Treść dokumentu zaktualizowana');
    }

    const { error: paymentError } = await supabase
      .from('payments')
      .update({ status: 'paid' })
      .eq('session_id', session_id);

    if (paymentError) {
      console.error('❌ Błąd przy aktualizacji płatności:', paymentError.message);
    } else {
      console.log('✅ Status płatności ustawiony na "paid"');
    }

    // 🧾 Faktura z Fakturowni
    try {
      const faktura = await createFakturowniaInvoice(company, session);
      console.log('🧾 Faktura Fakturowni utworzona:', faktura.id);
    }catch (err) {
      const error = err as AxiosError;
    
      if (error.response) {
        console.error('❌ Błąd Fakturowni:', {
          status: error.response.status,
          data: error.response.data,
        });
      } else if (error.request) {
        console.error('❌ Brak odpowiedzi od Fakturowni:', error.request);
      } else {
        console.error('❌ Błąd axios:', error.message);
      }
    }

    if (!updateError && !paymentError) {
      console.log(`✅ Wszystko OK dla dokumentu ${document_id}`);
    }
  }

  return new NextResponse('Webhook odebrany', { status: 200 });
}