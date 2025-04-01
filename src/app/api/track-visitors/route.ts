import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { ip_address, user_agent, referrer, landing_page, utm } = data;

    const { error } = await supabase.from('visitors').insert({
      ip_address,
      user_agent,
      referrer,
      landing_page,
      utm_source: utm?.source,
      utm_medium: utm?.medium,
      utm_campaign: utm?.campaign,
      utm_term: utm?.term,
      utm_keyword: utm?.keyword,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }

    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
