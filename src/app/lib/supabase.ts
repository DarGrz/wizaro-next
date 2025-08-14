import { createClient } from '@supabase/supabase-js';

// Environment variables - use NEXT_PUBLIC_ prefix for client-side access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create a standard client with anonymous key (for client-side operations)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create an admin client with service role key (for administrative operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

// For server components and API routes
export function createServerSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

// For server-side administrative operations
export function createServerSupabaseAdminClient() {
  return createClient(supabaseUrl, supabaseServiceRoleKey);
}
