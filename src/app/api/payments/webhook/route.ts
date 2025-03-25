import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import db from '@/app/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

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
    if (err instanceof Error) {
      console.error('❌ Webhook signature error:', err.message);
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    } else {
      console.error('❌ Unknown error in webhook:', err);
      return new NextResponse(`Unknown Webhook Error`, { status: 400 });
    }
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const document_id = session.metadata?.document_id;
    const session_id = session.id;

    if (!document_id) {
      console.error('❌ Brak document_id w webhooku');
      return new NextResponse('Brak document_id', { status: 400 });
    }

    const company = db.prepare(`
      SELECT c.*, d.type FROM documents d
      JOIN companies c ON c.id = d.company_id
      WHERE d.id = ?
    `).get(document_id);

    if (!company) {
      console.error('❌ Nie znaleziono firmy dla dokumentu', document_id);
      return new NextResponse('Brak danych firmy', { status: 500 });
    }

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
<p style="font-style:italic;">Szablon wiadomości został pobrany ze strony wzorypism.io.
    `;

    db.prepare(`UPDATE documents SET content = ? WHERE id = ?`).run(html, document_id);
    db.prepare(`UPDATE payments SET status = 'paid' WHERE session_id = ?`).run(session_id);

    console.log(`✅ Dokument ${document_id} wygenerowany po płatności`);
  }

  return new NextResponse('Webhook odebrany', { status: 200 });
}
