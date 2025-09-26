import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Sprawdza czy użytkownik jest zalogowany
export async function checkAuth() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get('admin-auth')?.value === 'true';
  
  if (!isLoggedIn) {
    redirect('/login');
  }
  
  return isLoggedIn;
}

// Pobiera rolę aktualnego użytkownika
export async function getUserRole() {
  const cookieStore = await cookies();
  return cookieStore.get('user-role')?.value || 'viewer';
}

// Pobiera ID aktualnego użytkownika
export async function getUserId() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('user-id')?.value;
  return userId ? parseInt(userId) : null;
}

// Sprawdza czy użytkownik ma rolę admin (pełny dostęp)
export async function requireAdmin() {
  await checkAuth();
  const role = await getUserRole();
  
  if (role !== 'admin') {
    redirect('/dashboard/reviews-only');
  }
}

// Pozwala na dostęp dla admin i viewer
export async function requireViewerOrAdmin() {
  await checkAuth();
  // Pozwala na dostęp zarówno dla admin jak i viewer
}

// Pobiera dane aktualnego użytkownika z bazy
export async function getCurrentUser() {
  const userId = await getUserId();
  
  if (!userId) {
    return null;
  }

  const { data: user } = await supabase
    .from('admin_users')
    .select('id, email, role, created_at, last_login')
    .eq('id', userId)
    .eq('is_active', true)
    .single();

  return user;
}

// Sprawdza czy użytkownik ma określoną rolę
export async function hasRole(requiredRole: 'admin' | 'viewer') {
  const currentRole = await getUserRole();
  
  if (requiredRole === 'viewer') {
    return currentRole === 'admin' || currentRole === 'viewer';
  }
  
  return currentRole === requiredRole;
}