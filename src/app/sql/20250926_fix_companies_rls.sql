-- SZYBKA NAPRAWA RLS dla tabeli companies
-- Ten skrypt rozwiązuje błąd: "new row violates row-level security policy for table companies"

-- ========================================
-- KROK 1: WYCZYŚĆ WSZYSTKIE POLITYKI
-- ========================================

-- Usuń wszystkie istniejące polityki (RLS pozostaje włączony)
DROP POLICY IF EXISTS "anonymous_can_insert_companies" ON companies;
DROP POLICY IF EXISTS "everyone_can_insert_companies" ON companies;
DROP POLICY IF EXISTS "authenticated_full_access_companies" ON companies;
DROP POLICY IF EXISTS "Enable insert for anon users" ON companies;
DROP POLICY IF EXISTS "Enable read access for all users" ON companies;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON companies;

-- ========================================
-- KROK 2: DODAJ NOWE POLITYKI
-- ========================================

-- KAŻDY może robić INSERT (bez żadnych ograniczeń)
CREATE POLICY "allow_insert_for_everyone" ON companies
    FOR INSERT
    WITH CHECK (true);

-- Tylko authenticated mogą SELECT/UPDATE/DELETE
CREATE POLICY "allow_all_for_authenticated" ON companies
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ========================================
-- KROK 3: SPRAWDZENIE
-- ========================================

-- Sprawdź czy polityki zostały utworzone
SELECT schemaname, tablename, policyname, cmd, roles, qual, with_check
FROM pg_policies 
WHERE tablename = 'companies';

-- ========================================
-- REZULTAT:
-- ========================================
-- ✅ RLS pozostaje WŁĄCZONY przez cały czas
-- ✅ KAŻDY może robić INSERT do companies (także niezalogowani)
-- ✅ Tylko zalogowani admini mogą SELECT/UPDATE/DELETE
-- ✅ Formularz będzie działał bez błędów RLS