-- Polityki RLS dla tabeli companies - KAŻDY może robić INSERT
-- Włącznie z całkowicie niezalogowanymi użytkownikami (bez żadnej roli)

-- Wyłącz RLS tymczasowo, aby usunąć istniejące polityki
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;

-- Usuń wszystkie istniejące polityki dla companies
DROP POLICY IF EXISTS "anonymous_can_insert_companies" ON companies;
DROP POLICY IF EXISTS "authenticated_full_access_companies" ON companies;

-- Włącz RLS ponownie
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- ========================================
-- NOWE POLITYKI DLA TABELI COMPANIES
-- ========================================

-- 1. KAŻDY może dodawać firmy (INSERT) - bez względu na rolę
CREATE POLICY "everyone_can_insert_companies" ON companies
    FOR INSERT
    WITH CHECK (true);

-- 2. Tylko zalogowani administratorzy mogą odczytywać/modyfikować dane
CREATE POLICY "authenticated_full_access_companies" ON companies
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ========================================
-- PODSUMOWANIE UPRAWNIEŃ DLA COMPANIES:
-- ========================================
-- 
-- KAŻDY UŻYTKOWNIK (również bez roli):
-- ✅ Może tworzyć firmy (INSERT)
-- ❌ NIE może odczytywać danych (brak SELECT)
-- ❌ NIE może modyfikować danych (brak UPDATE/DELETE)
--
-- ZALOGOWANI ADMINISTRATORZY (authenticated):
-- ✅ Pełny dostęp (SELECT, INSERT, UPDATE, DELETE)
--
-- BEZPIECZEŃSTWO:
-- - Formularz może zapisywać dane firm bez żadnych ograniczeń
-- - Tylko administratorzy mogą przeglądać i zarządzać danymi
-- - Klienci nie mogą podglądać danych innych firm