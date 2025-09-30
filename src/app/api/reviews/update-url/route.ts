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

    const { reviewId, url } = await req.json();

    if (!reviewId) {
      return NextResponse.json({ error: 'Brak ID opinii' }, { status: 400 });
    }

    console.log('🔄 Aktualizacja URL opinii:', { reviewId, url, userId, userRole });

    // Aktualizuj URL opinii i zapisz kto dokonał zmiany
    const { data, error } = await supabase
      .from('reviews')
      .update({
        url: url || null,
        last_modified_by: userId ? parseInt(userId) : null,
        last_modified_at: new Date().toISOString()
      })
      .eq('id', reviewId)
      .select();

    if (error) {
      console.error('❌ Błąd aktualizacji URL opinii:', error);
      return NextResponse.json({ 
        error: 'Błąd aktualizacji URL opinii',
        details: error.message 
      }, { status: 500 });
    }

    console.log('✅ URL opinii zaktualizowany:', data);
    
    return NextResponse.json({ 
      success: true,
      message: 'URL opinii zaktualizowany pomyślnie',
      data: data
    }, { status: 200 });
    
  } catch (err) {
    console.error('❌ Błąd API update-url:', err);
    return NextResponse.json({ 
      error: 'Błąd serwera',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 });
  }
}