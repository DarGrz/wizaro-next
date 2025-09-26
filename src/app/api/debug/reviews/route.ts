import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function GET() {
  console.log('🔍 Debug Reviews Table - GET request');
  
  try {
    // Pobierz wszystkie reviews z szczegółami
    const { data: reviews, error, count } = await supabase
      .from('reviews')
      .select(`
        *,
        companies (
          id,
          name,
          email,
          gmb_url
        )
      `, { count: 'exact' })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Błąd pobierania reviews:', error);
      return NextResponse.json({ 
        success: false,
        error: 'Błąd pobierania reviews',
        details: error
      }, { status: 500 });
    }

    console.log('✅ Pobrano reviews:', { count, reviewsLength: reviews?.length });

    // Dodatkowe statystyki
    const stats = {
      total: count || 0,
      withCompany: reviews?.filter(r => r.companies).length || 0,
      withGmbUrl: reviews?.filter(r => r.companies?.gmb_url).length || 0,
      withAuthor: reviews?.filter(r => r.author).length || 0,
      withContent: reviews?.filter(r => r.content).length || 0,
      withUrl: reviews?.filter(r => r.url).length || 0,
      withDateAdded: reviews?.filter(r => r.date_added).length || 0,
      withDocumentId: reviews?.filter(r => r.document_id).length || 0,
    };

    // Grupuj po company_id
    const byCompany = reviews?.reduce((acc, review) => {
      const companyId = review.company_id || 'no-company';
      if (!acc[companyId]) {
        acc[companyId] = {
          company_id: companyId,
          company_name: review.companies?.name || 'Brak nazwy',
          reviews: []
        };
      }
      acc[companyId].reviews.push(review);
      return acc;
    }, {} as Record<string, { company_id: string; company_name: string; reviews: unknown[] }>);

    const companiesWithReviews = Object.values(byCompany || {});

    return NextResponse.json({
      success: true,
      stats,
      companies: companiesWithReviews,
      allReviews: reviews?.slice(0, 10), // Tylko pierwsze 10 dla podglądu
      message: `Znaleziono ${count} opinii w bazie danych`
    });

  } catch (err) {
    console.error('❌ Błąd debug reviews:', err);
    return NextResponse.json({
      success: false,
      error: 'Błąd serwera',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 });
  }
}