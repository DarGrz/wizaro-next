-- ========================================
-- DODANIE SUB-ADMINA Z OGRANICZONYM DOSTĘPEM
-- ========================================

-- 1. Dodaj nową rolę 'sub_admin' do istniejącej tabeli
ALTER TABLE admin_users DROP CONSTRAINT IF EXISTS admin_users_role_check;
ALTER TABLE admin_users ADD CONSTRAINT admin_users_role_check 
CHECK (role IN ('admin', 'sub_admin', 'viewer'));

-- 2. Dodaj sub-admina przemek@wizaro.pl
INSERT INTO admin_users (email, password_hash, role, is_active) 
VALUES (
    'przemek@wizaro.pl', 
    'Yawnie02',  -- będzie zahashowane przez aplikację przy pierwszym logowaniu
    'sub_admin',
    TRUE
) ON CONFLICT (email) DO UPDATE SET 
    password_hash = EXCLUDED.password_hash,
    role = EXCLUDED.role,
    is_active = EXCLUDED.is_active,
    updated_at = CURRENT_TIMESTAMP;

-- 3. Sprawdź czy sub-admin został dodany
SELECT 
    id,
    email,
    role,
    is_active,
    created_at,
    last_login
FROM admin_users 
WHERE email = 'przemek@wizaro.pl';

-- 4. Pokaż wszystkich użytkowników
SELECT 
    'WSZYSCY UŻYTKOWNICY:' as info,
    id,
    email,
    role,
    is_active,
    created_at,
    last_login
FROM admin_users 
ORDER BY created_at;