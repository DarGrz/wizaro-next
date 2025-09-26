import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { sendAdminNotification } from '@/app/lib/mailer';
import { REGULAMIN_VERSION } from '@/app/constants/regulamin-version';

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

    // 🔍 DEBUGOWANIE RLS - company-with-reviews endpoint
    console.log('🔐 [REVIEWS] Supabase connection check...');
    
    // 🔍 Przygotuj dane do zapisu
    const companyDataToInsert = {
      ...company,
      price: totalPrice,
      review_count: numberOfReviews,
      // Dodaj akceptację regulaminu bezpośrednio przy tworzeniu
      regulation_accepted: true,
      regulation_version: REGULAMIN_VERSION,
      regulation_accepted_at: new Date().toISOString(),
    };
    
    console.log('📝 [REVIEWS] Dane do zapisu w companies:', JSON.stringify(companyDataToInsert, null, 2));

    // 1. Zapisz firmę
    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .insert(companyDataToInsert)
      .select()
      .single();

    if (companyError || !companyData) {
      console.error('❌ [REVIEWS] Błąd zapisu firmy:', companyError);
      console.error('🔍 [REVIEWS] Szczegóły błędu RLS:');
      console.error('  - Code:', companyError?.code);
      console.error('  - Message:', companyError?.message);
      console.error('  - Details:', companyError?.details);
      console.error('  - Hint:', companyError?.hint);
      
      return NextResponse.json(
        { 
          error: 'Błąd zapisu firmy', 
          details: companyError,
          debug: {
            endpoint: 'company-with-reviews',
            supabaseUrl: process.env.SUPABASE_URL,
            hasAnonKey: !!process.env.SUPABASE_ANON_KEY,
            insertData: companyDataToInsert
          }
        },
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
        status: 'draft'
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

    // Wyślij powiadomienie o nowym zamówieniu
    await sendAdminNotification({
      orderType: 'review-removal',
      companyName: company.name,
      orderId: documentId
    });

    return NextResponse.json(
      {
        success: true,
        company_id: companyData.id,
        document_id: documentId
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