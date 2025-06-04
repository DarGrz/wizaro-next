import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const id = formData.get('id');
  if (!id) return NextResponse.json({ error: 'Brak ID zamówienia' }, { status: 400 });

  // Oznacz zamówienie jako "w trakcie"
  const { error } = await supabase
    .from('documents')
    .update({ processing_status: 'w trakcie' })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.redirect(`${req.nextUrl.origin}/dashboard/orders/${id}`);
}
