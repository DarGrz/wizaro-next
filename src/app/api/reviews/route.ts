import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

interface Review {
  author: string;
  content: string;
  url: string;
  date_added: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { company_id, reviews }: { company_id: string; reviews: Review[] } = body;

    if (!company_id || !Array.isArray(reviews)) {
      return NextResponse.json({ error: 'Brak danych' }, { status: 400 });
    }

    const formattedReviews = reviews.map((review) => ({
      company_id,
      author: review.author,
      url: review.url,
      link: review.url,
      content: review.content,
      date_added: review.date_added,
    }));

    const { error } = await supabase
      .from('reviews')
      .insert(formattedReviews);

    if (error) {
      console.error('❌ Błąd zapisu opinii:', error.message);
      return NextResponse.json({ error: 'Błąd zapisu opinii' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Opinie zapisane poprawnie' }, { status: 200 });
  } catch (err) {
    console.error('❌ Błąd API /reviews:', err);
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 });
  }
}
