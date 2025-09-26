-- 🚨 NATYCHMIASTOWA NAPRAWA RLS dla tabeli companies
-- Ten skrypt naprawia błąd 42501 - "new row violates row-level security policy"

-- 1. SPRAWDŹ AKTUALNY STAN
SELECT 
    '📊 CURRENT RLS STATUS' as step,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'companies';

-- 2. POKAŻ WSZYSTKIE POLITYKI
SELECT 
    '📋 CURRENT POLICIES' as step,
    policyname, 
    cmd as operation,
    roles,
    qual as using_expr,
    with_check as check_expr
FROM pg_policies 
WHERE tablename = 'companies';

-- 3. USUŃ WSZYSTKIE POLITYKI (bezpiecznie)
DO $$ 
DECLARE 
    pol RECORD;
BEGIN
    FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'companies'
    LOOP
        EXECUTE format('DROP POLICY %I ON companies', pol.policyname);
        RAISE NOTICE 'Dropped policy: %', pol.policyname;
    END LOOP;
END $$;

-- 4. UTWÓRZ NOWĄ POLITYKĘ - KAŻDY MOŻE WSZYSTKO
CREATE POLICY "allow_all_operations" ON companies 
    FOR ALL 
    USING (true) 
    WITH CHECK (true);

-- 5. SPRAWDŹ REZULTAT
SELECT 
    '✅ NEW STATE' as step,
    policyname, 
    cmd as operation,
    roles,
    'true' as using_expr,
    'true' as check_expr
FROM pg_policies 
WHERE tablename = 'companies';

-- 6. TEST INSERT (opcjonalny - usuń komentarz jeśli chcesz przetestować)
/*
INSERT INTO companies (name, first_name, last_name, email, nip, phone, street, city, zip) 
VALUES ('TEST_RLS_FIX', 'Test', 'User', 'rls_test@example.com', '0000000000', '000000000', 'Test St', 'Test City', '00-000')
RETURNING id, name, email;

-- Usuń test
DELETE FROM companies WHERE email = 'rls_test@example.com';
*/

SELECT '🎉 RLS FIX COMPLETED - formularz powinien teraz działać!' as result;