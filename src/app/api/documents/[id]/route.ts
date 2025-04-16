import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

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
      .select('*')
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