-- NAJPROSTSZE ROZWIĄZANIE PROBLEMU RLS dla tabeli companies
-- Usuwa wszystkie polityki i tworzy jedną uniwersalną

-- Usuń wszystkie istniejące polityki z tabeli companies
DO $$
DECLARE
    policy_name TEXT;
BEGIN
    -- Usuń wszystkie polityki dla tabeli companies
    FOR policy_name IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'companies'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_name || '" ON companies';
    END LOOP;
END $$;

-- Stwórz jedną prostą politykę - każdy może wszystko robić z companies
CREATE POLICY "allow_all_for_companies" ON companies
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Sprawdź czy polityka została utworzona
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    cmd, 
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'companies';

-- WYNIK: Tabela companies będzie miała jedną politykę która pozwala na wszystko każdemu