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
  console.log('🔄 API /reviews - Rozpoczęcie żądania POST');
  
  try {
    const body = await req.json();
    console.log('📝 Otrzymane dane:', { body });
    
    const { company_id, reviews }: { company_id: string; reviews: Review[] } = body;

    console.log('🏢 Company ID:', company_id);
    console.log('📋 Liczba opinii:', reviews?.length);

    if (!company_id || !Array.isArray(reviews)) {
      console.error('❌ Brak wymaganych danych:', { company_id, reviewsIsArray: Array.isArray(reviews) });
      return NextResponse.json({ error: 'Brak danych' }, { status: 400 });
    }

    const formattedReviews = reviews.map((review, index) => {
      const formatted = {
        company_id,
        author: review.author,
        url: review.url,
        content: review.content,
        date_added: review.date_added,
      };
      console.log(`📝 Sformatowana opinia ${index + 1}:`, formatted);
      return formatted;
    });

    console.log('💾 Próba zapisu do Supabase...');
    const { data, error } = await supabase
      .from('reviews')
      .insert(formattedReviews);

    if (error) {
      console.error('❌ Błąd zapisu opinii:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return NextResponse.json({ 
        error: 'Błąd zapisu opinii',
        details: error.message 
      }, { status: 500 });
    }

    console.log('✅ Opinie zapisane pomyślnie:', data);
    return NextResponse.json({ 
      message: 'Opinie zapisane poprawnie',
      count: formattedReviews.length,
      data: data
    }, { status: 200 });
  } catch (err) {
    console.error('❌ Błąd API /reviews:', err);
    return NextResponse.json({ 
      error: 'Błąd serwera',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 });
  }
}

// GET endpoint do sprawdzania reviews
export async function GET() {
  console.log('🔄 API /reviews - GET request');
  
  try {
    const { data: reviews, error, count } = await supabase
      .from('reviews')
      .select(`
        *,
        companies (
          name,
          email,
          gmb_url
        )
      `, { count: 'exact' })
      .order('date_added', { ascending: false })
      .limit(50);

    if (error) {
      console.error('❌ Błąd pobierania opinii:', error);
      return NextResponse.json({ 
        error: 'Błąd pobierania opinii',
        details: error.message 
      }, { status: 500 });
    }

    console.log('✅ Pobrano opinie:', { count, reviewsLength: reviews?.length });
    
    return NextResponse.json({ 
      reviews: reviews || [],
      count: count || 0,
      message: 'Opinie pobrane pomyślnie'
    }, { status: 200 });
  } catch (err) {
    console.error('❌ Błąd GET /reviews:', err);
    return NextResponse.json({ 
      error: 'Błąd serwera',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 });
  }
}
