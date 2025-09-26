-- 🔍 DEBUGOWANIE PROBLEMU LOGOWANIA
-- Sprawdź czy tabela admin_users istnieje i czy są w niej użytkownicy

-- ========================================
-- 1. SPRAWDŹ CZY TABELA ISTNIEJE
-- ========================================
SELECT 
    '📋 TABELA ADMIN_USERS:' as info,
    EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'admin_users'
    ) as table_exists;

-- ========================================
-- 2. SPRAWDŹ WSZYSTKICH UŻYTKOWNIKÓW
-- ========================================
SELECT 
    '👥 WSZYSCY UŻYTKOWNICY:' as info,
    id, 
    email, 
    role, 
    is_active,
    CASE 
        WHEN password_hash LIKE '$2b$%' THEN 'HASHED'
        ELSE 'PLAIN_TEXT'
    END as password_type,
    LENGTH(password_hash) as password_length,
    created_at,
    last_login
FROM admin_users 
ORDER BY created_at;

-- ========================================
-- 3. SPRAWDŹ KONKRETNIE admin@wizaro.pl
-- ========================================
SELECT 
    '🔍 ADMIN@WIZARO.PL:' as info,
    COUNT(*) as user_count,
    COALESCE(MAX(email), 'BRAK') as email_found,
    COALESCE(MAX(role), 'BRAK') as role_found,
    COALESCE(MAX(is_active::text), 'BRAK') as is_active_found
FROM admin_users 
WHERE email = 'admin@wizaro.pl';

-- ========================================
-- 4. JEŚLI BRAK UŻYTKOWNIKA - UTWÓRZ GO
-- ========================================
INSERT INTO admin_users (email, password_hash, role, is_active) 
VALUES (
    'admin@wizaro.pl', 
    'admin123', 
    'admin',
    true
) ON CONFLICT (email) DO UPDATE SET
    password_hash = 'admin123',
    role = 'admin',
    is_active = true,
    updated_at = CURRENT_TIMESTAMP;

-- ========================================
-- 5. SPRAWDŹ REZULTAT
-- ========================================
SELECT 
    '✅ REZULTAT:' as info,
    id, 
    email, 
    role, 
    is_active,
    password_hash,
    created_at
FROM admin_users 
WHERE email = 'admin@wizaro.pl';

-- ========================================
-- INSTRUKCJA:
-- ========================================
-- Po uruchomieniu tego skryptu powinno być możliwe logowanie:
-- Email: admin@wizaro.pl
-- Hasło: admin123