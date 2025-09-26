import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email i hasło są wymagane' }, { status: 400 });
    }

    console.log('🔐 Próba logowania:', { email: email.toLowerCase() });

    // Najpierw sprawdź czy w ogóle są jakiś użytkownicy
    const { data: allUsers, error: allUsersError } = await supabase
      .from('admin_users')
      .select('email, is_active, role');
    
    console.log('👥 Wszyscy użytkownicy w bazie:', allUsers);
    console.log('❓ Błąd pobierania wszystkich użytkowników:', allUsersError);

    // Pobierz użytkownika z bazy danych
    const { data: user, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('is_active', true)
      .single();

    if (error || !user) {
      console.error('❌ Błąd pobierania użytkownika:', error);
      console.log('🔍 Sprawdzenie użytkownika:', { email: email.toLowerCase(), userFound: !!user });
      
      // Sprawdź bez filtru is_active
      const { data: inactiveUser } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email.toLowerCase())
        .single();
      
      console.log('🔍 Użytkownik bez filtru is_active:', inactiveUser);
      
      return NextResponse.json({ 
        error: 'Nieprawidłowe dane logowania',
        debug: {
          allUsers: allUsers,
          searchedEmail: email.toLowerCase(),
          userFound: !!user,
          inactiveUserFound: !!inactiveUser
        }
      }, { status: 401 });
    }

    console.log('✅ Użytkownik znaleziony:', { 
      id: user.id, 
      email: user.email, 
      role: user.role,
      passwordType: user.password_hash.startsWith('$2b$') ? 'HASHED' : 'PLAIN_TEXT',
      passwordLength: user.password_hash.length
    });

    // Sprawdź hasło - obsługa zarówno plain text jak i hash
    let isValidPassword = false;
    let needsHashing = false;

    // Sprawdź czy hasło jest już zahashowane (zaczyna się od $2b$)
    if (user.password_hash.startsWith('$2b$')) {
      // Hasło już zahashowane - użyj bcrypt.compare
      isValidPassword = await bcrypt.compare(password, user.password_hash);
    } else {
      // Hasło w plain text - porównaj bezpośrednio i zaplanuj hashowanie
      isValidPassword = password === user.password_hash;
      needsHashing = isValidPassword; // Zahashuj tylko jeśli hasło jest prawidłowe
    }
    
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Nieprawidłowe dane logowania' }, { status: 401 });
    }

    // Jeśli hasło było w plain text i jest prawidłowe, zahashuj je teraz
    if (needsHashing) {
      const hashedPassword = await bcrypt.hash(password, 12);
      await supabase
        .from('admin_users')
        .update({ password_hash: hashedPassword })
        .eq('id', user.id);
    }

    // Aktualizuj ostatnie logowanie
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);

    const response = NextResponse.json({ 
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

    // Ustawiamy ciasteczka z tokenem i rolą
    response.cookies.set('admin-auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 godzin
    });

    response.cookies.set('user-role', user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 godzin
    });

    response.cookies.set('user-id', user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 godzin
    });

    return response;
  } catch (error) {
    console.error('Błąd logowania:', error);
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 });
  }
}
