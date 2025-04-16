import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { name, first_name, last_name, email, nip, regon, phone, opinie, industry, url, street, city, zip } = body;

  const { data, error } = await supabase
    .from('companies')
    .insert([{ name, first_name, last_name, email, nip, regon, phone, opinie, industry, url, street, city, zip }])
    .select()
    .single();

  if (error) {
    console.error('❌ Error inserting company:', error.message);
    return NextResponse.json({ error: 'Błąd przy dodawaniu firmy' }, { status: 500 });
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}