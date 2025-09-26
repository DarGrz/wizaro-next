-- Tworzenie tabeli użytkowników z systemem ról
-- UWAGA: Użytkownicy są dodawani RĘCZNIE przez administratora bazy danych
-- Dashboard NIE ma funkcji tworzenia użytkowników ani resetowania haseł
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'viewer')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Wstaw domyślnego administratora (hasło będzie zahashowane przez aplikację)
-- Email: admin@wizaro.pl, Hasło: admin123
INSERT INTO admin_users (email, password_hash, role) 
VALUES (
    'admin@wizaro.pl', 
    'admin123', 
    'admin'
) ON CONFLICT (email) DO NOTHING;

-- INSTRUKCJE DODAWANIA NOWYCH UŻYTKOWNIKÓW RĘCZNIE:
-- 
-- 1. ADMIN (pełny dostęp):
-- INSERT INTO admin_users (email, password_hash, role) 
-- VALUES ('admin@example.com', 'twoje_hasło_plaintext', 'admin');
--
-- 2. VIEWER (tylko opinie):
-- INSERT INTO admin_users (email, password_hash, role) 
-- VALUES ('viewer@example.com', 'twoje_hasło_plaintext', 'viewer');
--
-- WAŻNE: 
-- - Wpisuj hasła w plain text (zwykły tekst)
-- - System automatycznie zahashuje je podczas pierwszego logowania
-- - Po pierwszym logowaniu hasło zostanie automatycznie zastąpione hashem
--
-- DEZAKTYWACJA UŻYTKOWNIKA:
-- UPDATE admin_users SET is_active = FALSE WHERE email = 'email@example.com';

-- Trigger do automatycznego ustawiania updated_at
CREATE OR REPLACE FUNCTION update_admin_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_admin_users_updated_at();

-- Dodaj indeksy dla wydajności
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);
CREATE INDEX IF NOT EXISTS idx_admin_users_is_active ON admin_users(is_active);