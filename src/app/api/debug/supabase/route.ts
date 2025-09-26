import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function GET() {
  console.log('🔧 Debug Supabase connection test');
  
  try {
    // Test podstawowego połączenia
    console.log('📡 Testing Supabase connection...');
    console.log('🔗 Supabase URL:', process.env.SUPABASE_URL ? 'Set' : 'Not set');
    console.log('🔑 Supabase Key:', process.env.SUPABASE_ANON_KEY ? 'Set' : 'Not set');

    // Test tabeli reviews - sprawdź strukturę
    const { data: reviewsStructure, error: structureError } = await supabase
      .from('reviews')
      .select('*')
      .limit(1);

    if (structureError) {
      console.error('❌ Błąd struktury tabeli reviews:', structureError);
      return NextResponse.json({
        success: false,
        error: 'Błąd tabeli reviews',
        details: structureError,
        tables_tested: ['reviews']
      });
    }

    console.log('✅ Struktura tabeli reviews OK');

    // Test tabeli companies
    const { data: companiesStructure, error: companiesError } = await supabase
      .from('companies')
      .select('*')
      .limit(1);

    if (companiesError) {
      console.error('❌ Błąd struktury tabeli companies:', companiesError);
    }

    // Policz istniejące rekordy
    const { count: reviewsCount } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true });

    const { count: companiesCount } = await supabase
      .from('companies')
      .select('*', { count: 'exact', head: true });

    console.log('📊 Statystyki:', { reviewsCount, companiesCount });

    // Test wstawienia i usunięcia testowego rekordu
    const testReview = {
      company_id: 'debug-test-' + Date.now(),
      author: 'Debug Test User',
      content: 'This is a debug test review',
      url: 'https://debug-test.com',
      date_added: new Date().toISOString()
    };

    console.log('🧪 Testing insert operation...');
    const { data: insertData, error: insertError } = await supabase
      .from('reviews')
      .insert([testReview])
      .select();

    if (insertError) {
      console.error('❌ Błąd testu wstawienia:', insertError);
      return NextResponse.json({
        success: false,
        error: 'Błąd testu wstawienia',
        details: insertError,
        reviewsCount,
        companiesCount: companiesCount || 0,
        reviewsStructure: reviewsStructure?.[0] || null,
        companiesStructure: companiesStructure?.[0] || null
      });
    }

    console.log('✅ Test insert OK:', insertData);

    // Usuń testowy rekord
    if (insertData?.[0]?.id) {
      const { error: deleteError } = await supabase
        .from('reviews')
        .delete()
        .eq('id', insertData[0].id);

      if (deleteError) {
        console.warn('⚠️ Nie udało się usunąć testowego rekordu:', deleteError);
      } else {
        console.log('🗑️ Testowy rekord usunięty');
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Połączenie z Supabase działa poprawnie',
      reviewsCount,
      companiesCount: companiesCount || 0,
      testInsert: 'OK',
      reviewsStructure: reviewsStructure?.[0] || null,
      companiesStructure: companiesStructure?.[0] || null,
      environment: {
        supabaseUrl: process.env.SUPABASE_URL ? 'Set' : 'Not set',
        supabaseKey: process.env.SUPABASE_ANON_KEY ? 'Set' : 'Not set'
      }
    });

  } catch (err) {
    console.error('❌ Błąd debug Supabase:', err);
    return NextResponse.json({
      success: false,
      error: 'Błąd serwera debug',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 });
  }
}