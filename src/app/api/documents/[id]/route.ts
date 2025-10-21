import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: 'Brak ID dokumentu' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('documents')
      .select(`
        *,
        company: companies (
          id,
          name,
          first_name,
          last_name,
          email,
          nip,
          phone,
          street,
          city,
          zip,
          url
        )
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('❌ Supabase error:', error);
      return NextResponse.json({ error: 'Błąd bazy danych' }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Dokument nie istnieje' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('❌ Internal server error:', err);
    return NextResponse.json({ error: 'Wewnętrzny błąd serwera' }, { status: 500 });
  }
}