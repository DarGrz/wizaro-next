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
export async function GET(req: NextRequest) {
  console.log('🔄 API /reviews - GET request');
  
  try {
    const { searchParams } = new URL(req.url);
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    console.log('🔍 DEBUG API - Parameters:', { dateFrom, dateTo, page, limit });
    
    let query = supabase
      .from('reviews')
      .select(`
        *,
        companies (
          name,
          email,
          gmb_url,
          phone
        ),
        admin_users (
          email
        )
      `, { count: 'exact' });

    console.log('🔍 DEBUG API - Initial query created');

    // Filtrowanie po dacie jeśli parametry są podane (używamy created_at)
    if (dateFrom) {
      query = query.gte('created_at', dateFrom);
    }
    if (dateTo) {
      query = query.lte('created_at', dateTo);
    }

    // Oblicz offset dla paginacji
    const offset = (page - 1) * limit;
    
    const { data: reviews, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1); // Supabase używa range() dla paginacji

    if (error) {
      console.error('❌ Błąd pobierania opinii:', error);
      return NextResponse.json({ 
        error: 'Błąd pobierania opinii',
        details: error.message 
      }, { status: 500 });
    }

    console.log('✅ Pobrano opinie:', { count, reviewsLength: reviews?.length });
    
    // DEBUG: Sprawdź pierwsze 3 opinie żeby zobaczyć sortowanie
    if (reviews && reviews.length > 0) {
      console.log('🔍 DEBUG - Pierwsze 3 opinie (sortowanie):');
      reviews.slice(0, 3).forEach((review, index) => {
        console.log(`  ${index + 1}. ID: ${review.id}, created_at: ${review.created_at}, author: ${review.author}`);
      });
    }
    
    // Oblicz informacje o paginacji
    const totalPages = Math.ceil((count || 0) / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    
    return NextResponse.json({ 
      reviews: reviews || [],
      count: count || 0,
      pagination: {
        currentPage: page,
        totalPages,
        hasNextPage,
        hasPrevPage,
        limit,
        total: count || 0
      },
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
