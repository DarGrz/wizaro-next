-- Konfiguracja RLS (Row Level Security) dla tabel zamówień
-- Niezalogowani użytkownicy mogą tylko zapisywać dane (INSERT), ale nie odczytywać (SELECT)
-- Zalogowani administratorzy mają pełny dostęp

-- ========================================
-- 1. WŁĄCZENIE RLS DLA WSZYSTKICH TABEL
-- ========================================

-- Włącz RLS dla tabeli companies
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Włącz RLS dla tabeli documents  
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Włącz RLS dla tabeli reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Włącz RLS dla tabeli review (jeśli istnieje)
ALTER TABLE review ENABLE ROW LEVEL SECURITY;

-- Włącz RLS dla tabeli profile_removals
ALTER TABLE profile_removals ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 2. POLITYKI DLA TABELI COMPANIES
-- ========================================

-- KAŻDY może dodawać firmy (INSERT) - bez względu na rolę
CREATE POLICY "everyone_can_insert_companies" ON companies
    FOR INSERT
    WITH CHECK (true);

-- Zalogowani administratorzy mają pełny dostęp
CREATE POLICY "authenticated_full_access_companies" ON companies
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ========================================
-- 3. POLITYKI DLA TABELI DOCUMENTS
-- ========================================

-- Niezalogowani mogą tylko tworzyć dokumenty (INSERT)
CREATE POLICY "anonymous_can_insert_documents" ON documents
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Zalogowani administratorzy mają pełny dostęp
CREATE POLICY "authenticated_full_access_documents" ON documents
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ========================================
-- 4. POLITYKI DLA TABELI REVIEWS
-- ========================================

-- Niezalogowani mogą tylko dodawać opinie (INSERT)
CREATE POLICY "anonymous_can_insert_reviews" ON reviews
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Zalogowani administratorzy mają pełny dostęp
CREATE POLICY "authenticated_full_access_reviews" ON reviews
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ========================================
-- 5. POLITYKI DLA TABELI REVIEW (jeśli istnieje)
-- ========================================

-- Niezalogowani mogą tylko dodawać opinie (INSERT)
CREATE POLICY "anonymous_can_insert_review" ON review
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Zalogowani administratorzy mają pełny dostęp
CREATE POLICY "authenticated_full_access_review" ON review
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ========================================
-- 6. POLITYKI DLA TABELI PROFILE_REMOVALS
-- ========================================

-- Niezalogowani mogą tylko dodawać żądania usunięcia profili (INSERT)
CREATE POLICY "anonymous_can_insert_profile_removals" ON profile_removals
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Zalogowani administratorzy mają pełny dostęp
CREATE POLICY "authenticated_full_access_profile_removals" ON profile_removals
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ========================================
-- 7. DODATKOWE TABELE SYSTEMOWE
-- ========================================

-- Tabela admin_users - tylko dla zalogowanych administratorów
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_users_authenticated_only" ON admin_users
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ========================================
-- 8. POLITYKI DLA TABELI SYSTEM_SETTINGS
-- ========================================

-- Włącz RLS dla tabeli system_settings
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Niezalogowani mogą tylko odczytywać ustawienia systemowe (SELECT)
CREATE POLICY "anonymous_can_read_system_settings" ON system_settings
    FOR SELECT
    TO anon
    USING (true);

-- Zalogowani administratorzy mają pełny dostęp
CREATE POLICY "authenticated_full_access_system_settings" ON system_settings
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ========================================
-- PODSUMOWANIE UPRAWNIEŃ:
-- ========================================
-- 
-- NIEZALOGOWANI UŻYTKOWNICY (anon):
-- ✅ Mogą tworzyć zamówienia (INSERT do companies, documents, reviews, profile_removals)
-- ✅ Mogą odczytywać ustawienia systemowe (SELECT system_settings)
-- ❌ NIE mogą odczytywać zamówień (brak SELECT dla companies, documents, reviews)
-- ❌ NIE mogą modyfikować danych (brak UPDATE/DELETE)
--
-- ZALOGOWANI ADMINISTRATORZY (authenticated):
-- ✅ Pełny dostęp do wszystkich tabel (SELECT, INSERT, UPDATE, DELETE)
-- ✅ Dostęp do tabeli admin_users
-- ✅ Pełny dostęp do ustawień systemowych
--
-- BEZPIECZEŃSTWO:
-- - Klienci mogą składać zamówienia przez formularze
-- - Klienci nie mogą przeglądać zamówień innych klientów
-- - Tylko administratorzy widzą wszystkie dane w dashboardzie