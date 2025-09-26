-- 🔍 DEBUGOWANIE RLS - sprawdź aktualny stan polityk bezpieczeństwa

-- ========================================
-- 1. SPRAWDŹ STAN RLS DLA WSZYSTKICH TABEL
-- ========================================
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled,
    CASE 
        WHEN rowsecurity THEN '🔒 RLS WŁĄCZONY'
        ELSE '🔓 RLS WYŁĄCZONY'
    END as status
FROM pg_tables 
WHERE tablename IN ('companies', 'documents', 'reviews', 'profile_removals', 'admin_users', 'system_settings')
ORDER BY tablename;

-- ========================================
-- 2. SPRAWDŹ WSZYSTKIE POLITYKI DLA COMPANIES
-- ========================================
SELECT 
    '🏢 COMPANIES POLICIES:' as info,
    schemaname, 
    tablename, 
    policyname, 
    cmd as operation,
    roles,
    qual as using_expression,
    with_check as with_check_expression
FROM pg_policies 
WHERE tablename = 'companies'
ORDER BY policyname;

-- ========================================
-- 3. SPRAWDŹ UPRAWNIENIA RÓL
-- ========================================
SELECT 
    '👤 ROLE PERMISSIONS:' as info,
    rolname as role_name,
    rolsuper as is_superuser,
    rolcreaterole as can_create_roles,
    rolcreatedb as can_create_db,
    rolcanlogin as can_login
FROM pg_roles 
WHERE rolname IN ('anon', 'authenticated', 'service_role')
ORDER BY rolname;

-- ========================================
-- 4. SPRAWDŹ CZY TABELA COMPANIES ISTNIEJE I MA KOLUMNY
-- ========================================
SELECT 
    '📋 COMPANIES TABLE STRUCTURE:' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'companies' 
ORDER BY ordinal_position;

-- ========================================
-- 5. TEST ZAPISU - spróbuj wstawić testowy rekord
-- ========================================
-- UWAGA: Ten test może nie zadziałać z poziomu SQL Editor jeśli RLS blokuje
INSERT INTO companies (
    name, 
    first_name, 
    last_name, 
    email, 
    nip, 
    phone, 
    street, 
    city, 
    zip,
    price,
    regulation_accepted,
    regulation_version,
    regulation_accepted_at
) VALUES (
    'TEST COMPANY DEBUG', 
    'Test', 
    'User', 
    'test@debug.com', 
    '1234567890', 
    '123456789',
    'Test Street 1',
    'Test City',
    '00-000',
    100.00,
    true,
    '2025-09-27',
    NOW()
) RETURNING id, name, email;

-- Jeśli powyższy INSERT zadziała, usuń testowy rekord:
-- DELETE FROM companies WHERE email = 'test@debug.com';