import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {  const formData = await req.formData();
  const id = formData.get('id') as string;
  const proforma_invoice_url = formData.get('proforma_invoice_url') as string;
  const invoice_url = formData.get('invoice_url') as string;
  const payment_url = formData.get('payment_url') as string;
  
  if (!id) return NextResponse.json({ error: 'Brak ID zamówienia' }, { status: 400 });
  if (!proforma_invoice_url && !invoice_url && !payment_url) {
    return NextResponse.json({ error: 'Brak danych do aktualizacji' }, { status: 400 });
  }

  // Przygotuj obiekt z danymi do aktualizacji
  const updates: Record<string, string> = {};
  if (proforma_invoice_url) updates.proforma_invoice_url = proforma_invoice_url;
  if (invoice_url) updates.invoice_url = invoice_url;
  if (payment_url) updates.payment_url = payment_url;

  // Aktualizuj dokument
  const { error } = await supabase
    .from('documents')
    .update(updates)
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.redirect(`${req.nextUrl.origin}/dashboard/orders/${id}`);
}
