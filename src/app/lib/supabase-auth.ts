import { createClient } from '@supabase/supabase-js';

// Extend window interface for Supabase config
declare global {
  interface Window {
    __SUPABASE_URL__: string;
    __SUPABASE_ANON_KEY__: string;
  }
}

// Server-side client (używa twoich oryginalnych zmiennych)
const createServerClient = () => {
  if (typeof window === 'undefined') {
    // Server side - używa twoich zmiennych
    return createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );
  }
  // Client side - użyje window config
  return createClient(
    window.__SUPABASE_URL__,
    window.__SUPABASE_ANON_KEY__
  );
};

export const supabaseAuth = createServerClient();

// Dla kompatybilności z istniejącym kodem
export const createSupabaseClient = () => supabaseAuth;

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          phone: string | null;
          company_name: string | null;
          subscription_status: string | null;
          subscription_plan: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name?: string | null;
          phone?: string | null;
          company_name?: string | null;
          subscription_status?: string | null;
          subscription_plan?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string | null;
          phone?: string | null;
          company_name?: string | null;
          subscription_status?: string | null;
          subscription_plan?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      monitoring_requests: {
        Row: {
          id: string;
          user_id: string;
          request_type: 'profile_removal' | 'review_removal' | 'profile_monitoring';
          target_url: string | null;
          target_platform: string | null;
          status: 'pending' | 'in_progress' | 'completed' | 'failed';
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          request_type: 'profile_removal' | 'review_removal' | 'profile_monitoring';
          target_url?: string | null;
          target_platform?: string | null;
          status?: 'pending' | 'in_progress' | 'completed' | 'failed';
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          request_type?: 'profile_removal' | 'review_removal' | 'profile_monitoring';
          target_url?: string | null;
          target_platform?: string | null;
          status?: 'pending' | 'in_progress' | 'completed' | 'failed';
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};

// Helper types
export type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
export type MonitoringRequest = Database['public']['Tables']['monitoring_requests']['Row'];
export type UserProfileInsert = Database['public']['Tables']['user_profiles']['Insert'];
export type MonitoringRequestInsert = Database['public']['Tables']['monitoring_requests']['Insert'];
export type UserProfileUpdate = Database['public']['Tables']['user_profiles']['Update'];
export type MonitoringRequestUpdate = Database['public']['Tables']['monitoring_requests']['Update'];

// Auth helper functions
export const getUser = async () => {
  const supabase = createSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const signIn = async (email: string, password: string) => {
  const supabase = createSupabaseClient();
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signUp = async (email: string, password: string) => {
  const supabase = createSupabaseClient();
  return await supabase.auth.signUp({ email, password });
};

export const signOut = async () => {
  const supabase = createSupabaseClient();
  return await supabase.auth.signOut();
};
