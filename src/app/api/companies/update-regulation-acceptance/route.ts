import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Inicjalizacja klienta Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyId, version, acceptedAt } = body;
    
    console.log('📥 Dane do aktualizacji regulaminu:', body);

    // Walidacja danych
    if (!companyId || !version) {
      console.error('❌ Brak wymaganych danych:', { companyId, version });
      return NextResponse.json(
        { error: 'Brak wymaganych danych' },
        { status: 400 }
      );
    }
    
    console.log('🔍 Aktualizuję akceptację regulaminu dla firmy ID:', companyId);
    
    // Aktualizacja danych w bazie - uproszczona wersja bez sprawdzania
    const updateData = {
      regulation_accepted: true,
      regulation_version: version,
      regulation_accepted_at: acceptedAt,
    };
    
    console.log('📝 Dane do aktualizacji:', updateData);
    
    // Bezpośrednia aktualizacja
    const { data, error } = await supabase
      .from('companies')
      .update(updateData)
      .eq('id', companyId)
      .select();

    if (error) {
      console.error('❌ Błąd bazy danych:', error);
      return NextResponse.json(
        { error: 'Błąd podczas aktualizacji danych', details: error },
        { status: 500 }
      );
    }

    console.log('✅ Akceptacja regulaminu zapisana:', data);
    return NextResponse.json(
      { success: true, message: 'Akceptacja regulaminu została zapisana', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Nieoczekiwany błąd:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas przetwarzania żądania' },
      { status: 500 }
    );
  }
}
