-- WARIANT 2: Całkowite wyłączenie RLS dla tabeli companies
-- UWAGA: To usuwa wszystkie ograniczenia bezpieczeństwa dla tej tabeli

-- Wyłącz RLS dla tabeli companies
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;

-- Sprawdź status RLS dla wszystkich tabel
SELECT 
    schemaname,
    tablename,
    rowsecurity,
    CASE 
        WHEN rowsecurity THEN 'RLS WŁĄCZONY'
        ELSE 'RLS WYŁĄCZONY'
    END as status
FROM pg_tables 
WHERE tablename IN ('companies', 'documents', 'reviews', 'profile_removals', 'admin_users', 'system_settings')
ORDER BY tablename;

-- WYNIK: 
-- companies -> RLS WYŁĄCZONY (każdy może wszystko)
-- inne tabele -> RLS WŁĄCZONY (chronione politykami)