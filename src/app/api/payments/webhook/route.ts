import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Tworzymy klienta Supabase z Service Role Key (dostęp do zapisu)
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

export async function POST(req: NextRequest) {
  const signature = req.headers.get('stripe-signature');
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !endpointSecret) {
    return new NextResponse('Brak danych webhooka', { status: 400 });
  }

  const rawBody = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('❌ Webhook signature error:', errorMessage);
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
  }
  

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const document_id = session.metadata?.document_id;
    const session_id = session.id;

    if (!document_id) {
      console.error('❌ Brak document_id w webhooku');
      return new NextResponse('Brak document_id', { status: 400 });
    }

    // Pobierz firmę powiązaną z dokumentem
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
      console.error('❌ Nie udało się pobrać danych firmy:', error?.message);
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

    // Zapisz wygenerowaną treść dokumentu
    const { error: updateError } = await supabase
      .from('documents')
      .update({ content: html })
      .eq('id', document_id);

    // Zaktualizuj status płatności
    const { error: paymentError } = await supabase
      .from('payments')
      .update({ status: 'paid' })
      .eq('session_id', session_id);

    if (updateError || paymentError) {
      console.error('❌ Błąd podczas aktualizacji dokumentu lub płatności:', updateError?.message, paymentError?.message);
      return new NextResponse('Błąd podczas aktualizacji', { status: 500 });
    }

    console.log(`✅ Dokument ${document_id} został zaktualizowany po płatności`);
  }

  return new NextResponse('Webhook odebrany', { status: 200 });
}
