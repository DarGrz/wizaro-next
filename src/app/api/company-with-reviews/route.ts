import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid'; // 🔥 importujemy uuid

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

    // 1. Zapisz firmę
    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .insert({
        ...company,
        price: totalPrice,
        review_count: numberOfReviews,
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

    // 2. Wygeneruj UUID dokumentu z góry
    const documentId = uuidv4();

    // 3. Utwórz dokument z podanym ID
    const { error: documentError } = await supabase
      .from('documents')
      .insert({
        id: documentId, // 🔥 ręcznie ustawiony ID
        company_id: companyData.id,
        type: 'żądanie usunięcia opinii',
        status: 'draft',
      });

    if (documentError) {
      console.error('❌ Błąd tworzenia dokumentu:', documentError);
      return NextResponse.json(
        { error: 'Błąd tworzenia dokumentu', details: documentError },
        { status: 500 }
      );
    }

    // 4. Zapisz opinie z przypisanym document_id
    const reviewsWithDocumentId = reviews.map((r, i) => ({
      author: r.author?.trim() || `Autor ${i + 1}`,
      content: r.content?.trim() || 'Brak treści',
      url: r.url?.trim() || '',
      date_added: r.date_added?.slice(0, 10) || null,
      company_id: companyData.id,
      document_id: documentId, // ✅ przypisujemy ten sam ID
    }));

    const { error: reviewError } = await supabase
      .from('reviews')
      .insert(reviewsWithDocumentId);

    if (reviewError) {
      console.error('❌ Błąd zapisu opinii:', reviewError);
      return NextResponse.json(
        { error: 'Błąd zapisu opinii', details: reviewError },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        company_id: companyData.id,
        document_id: documentId,
      },
      { status: 201 }
    );
  } catch (err) {
    const error = err as Error;
    console.error('❌ Błąd ogólny:', error.message);
    return NextResponse.json(
      { error: 'Błąd ogólny', details: error.message },
      { status: 500 }
    );
  }
}