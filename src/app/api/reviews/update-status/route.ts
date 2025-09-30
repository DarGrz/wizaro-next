import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    // Sprawdź autoryzację
    const cookieStore = await cookies();
    const isLoggedIn = cookieStore.get('admin-auth')?.value === 'true';
    const userRole = cookieStore.get('user-role')?.value;
    const userId = cookieStore.get('user-id')?.value;
    
    if (!isLoggedIn || (userRole !== 'admin' && userRole !== 'sub_admin')) {
      return NextResponse.json({ error: 'Brak uprawnień' }, { status: 401 });
    }

    const { reviewId, status, notes } = await req.json();

    if (!reviewId || !status) {
      return NextResponse.json({ error: 'Brak wymaganych danych' }, { status: 400 });
    }

    // Walidacja statusu
    const validStatuses = ['nowa', 'usunięta', 'przywrócona', 'w_trakcie', 'brak_możliwości'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Nieprawidłowy status' }, { status: 400 });
    }

    console.log('🔄 Aktualizacja statusu opinii:', { reviewId, status, notes, userId, userRole });

    // Aktualizuj status opinii i zapisz kto dokonał zmiany
    const { data, error } = await supabase
      .from('reviews')
      .update({
        status: status,
        notes: notes || null,
        last_modified_by: userId ? parseInt(userId) : null,
        last_modified_at: new Date().toISOString()
      })
      .eq('id', reviewId)
      .select();

    if (error) {
      console.error('❌ Błąd aktualizacji statusu opinii:', error);
      return NextResponse.json({ 
        error: 'Błąd aktualizacji statusu opinii',
        details: error.message 
      }, { status: 500 });
    }

    console.log('✅ Status opinii zaktualizowany:', data);
    
    return NextResponse.json({ 
      success: true,
      message: 'Status opinii zaktualizowany pomyślnie',
      data: data
    }, { status: 200 });
    
  } catch (err) {
    console.error('❌ Błąd API update-status:', err);
    return NextResponse.json({ 
      error: 'Błąd serwera',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 });
  }
}