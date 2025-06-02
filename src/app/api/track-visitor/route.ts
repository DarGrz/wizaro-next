import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const user_agent = req.headers.get('user-agent') || '';

    const { referrer, landing_page, utm, gclid, keyword } = data;

    const { error } = await supabase.from('visitors').insert([
      {
        ip_address: ip,
        user_agent,
        referrer,
        landing_page,
        utm_source: utm?.source,
        utm_medium: utm?.medium,
        utm_campaign: utm?.campaign,
        utm_term: utm?.term,
        utm_keyword: utm?.keyword,
        gclid: gclid || null,
        keyword: keyword || null,
      },
    ]);

    if (error) {
      console.error('❌ Błąd zapisu odwiedzin:', error.message);
      return NextResponse.json({ error: 'Błąd przy zapisie odwiedzin' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('❌ Nieoczekiwany błąd:', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
