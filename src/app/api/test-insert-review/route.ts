import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Pobierz URL firmy do synchronizacji gmb_link
    let companyUrl = '';
    if (body.company_id) {
      const { data: companyData } = await supabase
        .from('companies')
        .select('url')
        .eq('id', body.company_id)
        .single();
      companyUrl = companyData?.url || '';
    }

    const review = {
      author: body.author?.trim() || 'Brak autora',
      content: body.content?.trim() || 'Brak treści',
      url: body.url?.trim() || '',
      date_added: body.date_added?.slice(0, 10) || null,
      company_id: body.company_id,
      gmb_link: companyUrl, // ✅ synchronizacja gmb_link z company URL
    };

    console.log('📦 Dane do zapisu:', review);
    console.log('📏 Typy:', {
      author: typeof review.author,
      content: typeof review.content,
      url: typeof review.url,
      date_added: typeof review.date_added,
      company_id: typeof review.company_id,
    });

    const { data, error } = await supabase
      .from('reviews')
      .insert([review])
      .select();

    if (error) {
      console.error('❌ Błąd zapisu testowego:', error);
      return NextResponse.json({ error: 'Błąd zapisu testowego', details: error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    const error = err as Error;
    console.error('❌ Błąd ogólny:', error.message);
    return NextResponse.json({ error: 'Błąd ogólny', details: error.message }, { status: 500 });
  }
}
