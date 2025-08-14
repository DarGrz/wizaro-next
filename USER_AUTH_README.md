# System Uwierzytelniania Użytkowników - Instrukcja Uruchomienia

## Wprowadzenie
Zaimplementowany został kompletny system uwierzytelniania dla usługi abonamentowej monitorowania wizerunku. System umożliwia:
- Rejestrację nowych użytkowników
- Logowanie/wylogowywanie
- Reset hasła przez email
- Zarządzanie profilem użytkownika
- Zabezpieczenie tras (middleware)
- System ról i subskrypcji

## 1. Konfiguracja Supabase

### A. Utwórz projekt w Supabase (jeśli nie masz)
1. Idź na https://supabase.com
2. Utwórz nowy projekt
3. Skopiuj dane z Settings > API:
   - Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - Anon public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - Service role key (SUPABASE_SERVICE_ROLE_KEY)

### B. Skonfiguruj tabele bazy danych
1. Uruchom skrypt PowerShell:
   ```powershell
   .\setup_user_auth_supabase.ps1
   ```
2. Skopiuj zawartość pliku `setup_user_auth_tables.sql`
3. W Supabase Dashboard > SQL Editor wklej i uruchom SQL

### C. Konfiguracja Email Authentication
1. W Supabase Dashboard > Authentication > Settings
2. Skonfiguruj Email settings (SMTP lub Supabase provider)
3. Skonfiguruj Site URL na twój domain (np. https://twoja-domena.com)
4. Dodaj redirect URLs:
   - https://twoja-domena.com/auth/reset-password
   - http://localhost:3000/auth/reset-password (dla rozwoju)

## 2. Konfiguracja zmiennych środowiskowych

Dodaj do pliku `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Istniejące zmienne administratora (zachowaj)
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

## 3. Instalacja dodatkowych zależności

Sprawdź czy masz w package.json:
```json
{
  "dependencies": {
    "@supabase/auth-helpers-nextjs": "^0.10.0",
    "@supabase/supabase-js": "^2.49.3"
  }
}
```

Jeśli nie, zainstaluj:
```bash
npm install @supabase/auth-helpers-nextjs @supabase/supabase-js
```

## 4. Struktura nowych plików

### Pliki uwierzytelniania:
- `src/app/lib/supabase-auth.ts` - Konfiguracja Supabase Auth
- `src/app/hooks/useAuth.ts` - Hook do zarządzania uwierzytelnianiem
- `src/app/hooks/useUserProfile.ts` - Hook do zarządzania profilem
- `middleware.ts` - Middleware ochrony tras

### Strony uwierzytelniania:
- `src/app/auth/login/page.tsx` - Logowanie
- `src/app/auth/register/page.tsx` - Rejestracja
- `src/app/auth/forgot-password/page.tsx` - Reset hasła
- `src/app/auth/reset-password/page.tsx` - Ustawienie nowego hasła
- `src/app/auth/verify-email/page.tsx` - Potwierdzenie emaila

### Dashboard użytkownika:
- `src/app/monitor/page.tsx` - Główny dashboard
- `src/app/monitor/profile/page.tsx` - Zarządzanie profilem

## 5. Testowanie systemu

### A. Uruchom aplikację
```bash
npm run dev
```

### B. Testuj funkcjonalności:

1. **Rejestracja:**
   - Idź na `/auth/register`
   - Zarejestruj nowego użytkownika
   - Sprawdź email z linkiem aktywacyjnym

2. **Logowanie:**
   - Idź na `/auth/login`
   - Zaloguj się z danymi użytkownika

3. **Dashboard:**
   - Po zalogowaniu zostaniesz przekierowany na `/monitor`
   - Sprawdź informacje o koncie i subskrypcji

4. **Profil:**
   - Kliknij "Profil" w dashboardzie
   - Przetestuj edycję danych osobowych i zmiany hasła

5. **Reset hasła:**
   - Na stronie logowania kliknij "Zapomniałeś hasła?"
   - Wprowadź email i sprawdź link resetujący

## 6. Bezpieczeństwo

### Row Level Security (RLS)
- Tabele są zabezpieczone RLS
- Użytkownicy widzą tylko swoje dane
- Automatyczne filtrowanie po user_id

### Middleware
- Chroni trasy `/monitor/*`
- Przekierowuje niezalogowanych na `/auth/login`
- Przekierowuje zalogowanych z `/auth/*` na `/monitor`

## 7. Dalszy rozwój

### A. Dodanie płatności (Stripe)
Możesz rozszerzyć system o:
- Integrację ze Stripe dla subskrypcji
- Webhooks do aktualizacji statusu subskrypcji
- Różne plany cenowe (basic, premium, enterprise)

### B. Funkcjonalności monitorowania
- Dodanie formularzy do konfiguracji monitorowania
- Raporty i dashboardy dla użytkowników
- Powiadomienia email/SMS

### C. Panel administratora
- Zarządzanie użytkownikami
- Przegląd subskrypcji
- Statystyki systemu

## 8. Rozwiązywanie problemów

### Błędy uwierzytelniania:
1. Sprawdź zmienne środowiskowe
2. Sprawdź konfigurację Supabase Auth
3. Sprawdź logi w konsoli przeglądarki

### Błędy bazy danych:
1. Sprawdź czy tabele zostały utworzone
2. Sprawdź polityki RLS
3. Sprawdź logi w Supabase Dashboard

### Problemy z emailami:
1. Sprawdź konfigurację SMTP w Supabase
2. Sprawdź spam/promocje
3. Sprawdź redirect URLs

## Gotowe!

System uwierzytelniania jest gotowy do użycia. Użytkownicy mogą się rejestrować, logować, zarządzać swoimi kontami i korzystać z chronionego obszaru aplikacji.

Następne kroki to dodanie funkcjonalności monitorowania wizerunku i systemu płatności.
