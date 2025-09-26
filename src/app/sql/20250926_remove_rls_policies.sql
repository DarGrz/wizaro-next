-- Usunięcie wszystkich istniejących polityk RLS
-- Uruchom ten skrypt PRZED zastosowaniem nowych polityk

-- ========================================
-- USUNIĘCIE ISTNIEJĄCYCH POLITYK
-- ========================================

-- Wyłącz RLS tymczasowo, aby usunąć polityki
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;
ALTER TABLE documents DISABLE ROW LEVEL SECURITY;
ALTER TABLE reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE profile_removals DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings DISABLE ROW LEVEL SECURITY;

-- Próba wyłączenia dla tabeli 'review' jeśli istnieje
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'review') THEN
        ALTER TABLE review DISABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Usuń wszystkie polityki dla companies
DROP POLICY IF EXISTS "anonymous_can_insert_companies" ON companies;
DROP POLICY IF EXISTS "everyone_can_insert_companies" ON companies;
DROP POLICY IF EXISTS "authenticated_full_access_companies" ON companies;

-- Usuń wszystkie polityki dla documents
DROP POLICY IF EXISTS "anonymous_can_insert_documents" ON documents;
DROP POLICY IF EXISTS "authenticated_full_access_documents" ON documents;

-- Usuń wszystkie polityki dla reviews
DROP POLICY IF EXISTS "anonymous_can_insert_reviews" ON reviews;
DROP POLICY IF EXISTS "authenticated_full_access_reviews" ON reviews;

-- Usuń wszystkie polityki dla review (jeśli tabela istnieje)
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'review') THEN
        DROP POLICY IF EXISTS "anonymous_can_insert_review" ON review;
        DROP POLICY IF EXISTS "authenticated_full_access_review" ON review;
    END IF;
END $$;

-- Usuń wszystkie polityki dla profile_removals
DROP POLICY IF EXISTS "anonymous_can_insert_profile_removals" ON profile_removals;
DROP POLICY IF EXISTS "authenticated_full_access_profile_removals" ON profile_removals;

-- Usuń wszystkie polityki dla admin_users
DROP POLICY IF EXISTS "admin_users_authenticated_only" ON admin_users;

-- Usuń wszystkie polityki dla system_settings
DROP POLICY IF EXISTS "anonymous_can_read_system_settings" ON system_settings;
DROP POLICY IF EXISTS "authenticated_full_access_system_settings" ON system_settings;

-- ========================================
-- INFORMACJA
-- ========================================
-- Po uruchomieniu tego skryptu:
-- 1. Wszystkie tabele mają wyłączony RLS
-- 2. Wszystkie polityki zostały usunięte
-- 3. Możesz teraz zastosować nowe polityki z pliku: 20250926_setup_rls_policies.sql