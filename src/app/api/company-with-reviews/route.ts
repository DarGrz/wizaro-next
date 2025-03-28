import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

interface Company {
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  nip: string;
  phone: string;
  url: string;
  street: string;
  city: string;
  zip: string;
}

interface Review {
  author: string;
  content: string;
  url: string;
  date_added: string;
}

export async function POST(req: NextRequest) {
  try {
    const {
      company,
      reviews,
      totalPrice,
      numberOfReviews,
    }: {
      company: Company;
      reviews: Review[];
      totalPrice: number;
      numberOfReviews: number;
    } = await req.json();

    console.log('🟢 Firma:', company);
    console.log('🟢 Opinie:', reviews);
    console.log('💰 Cena całkowita:', totalPrice);
    console.log('📊 Liczba opinii:', numberOfReviews);

    if (!reviews || reviews.length === 0) {
      return NextResponse.json(
        { error: 'Brak opinii do usunięcia' },
        { status: 400 }
      );
    }

    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .insert({
        ...company,
        price: totalPrice,
        review_count: numberOfReviews, // zakładamy, że masz kolumnę `review_count`
      })
      .select()
      .single();

    if (companyError || !companyData) {
      console.error('❌ Błąd zapisu firmy:', companyError);
      return NextResponse.json(
        { error: 'Błąd zapisu firmy', details: companyError },
        { status: 500 }
      );
    }

    const reviewsWithCompanyId = reviews.map((r, i) => ({
      author: r.author?.trim() || `Autor ${i + 1}`,
      content: r.content?.trim() || 'Brak treści',
      url: r.url?.trim() || '',
      date_added: r.date_added?.slice(0, 10) || null,
      company_id: companyData.id,
    }));

    const { error: reviewError } = await supabase
      .from('reviews')
      .insert(reviewsWithCompanyId);

    if (reviewError) {
      console.error('❌ Błąd zapisu opinii:', reviewError);
      return NextResponse.json(
        { error: 'Błąd zapisu opinii', details: reviewError },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, company_id: companyData.id }, { status: 201 });
  } catch (err) {
    const error = err as Error;
    console.error('❌ Błąd ogólny:', error.message);
    return NextResponse.json(
      { error: 'Błąd ogólny', details: error.message },
      { status: 500 }
    );
  }
}
