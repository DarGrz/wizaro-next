# System zarządzania opiniami - Dokumentacja

## Przegląd funkcjonalności

System pozwala administratorom na włączanie/wyłączanie możliwości zgłaszania opinii do usunięcia w aplikacji.

## Komponenty

### 1. API Endpoint
- **Ścieżka**: `/api/reviews-settings`
- **Metody**: GET (sprawdzenie statusu), POST (zmiana statusu)
- **Zabezpieczenia**: POST wymaga autoryzacji admin

### 2. Tabela w bazie danych
- **Nazwa**: `app_settings`
- **Klucz**: `reviews_enabled`
- **Wartości**: `'true'` / `'false'`

### 3. Komponenty React

#### ReviewsToggleButton
Przycisk w dashboard do włączania/wyłączania opinii.

#### ReviewForm (zmodyfikowany)
- Dodano prop `reviewsEnabled`
- Gdy wyłączone: formularz wyblurowany, przycisk zablokowany
- Wyświetla komunikat o wstrzymaniu usługi

#### ReviewFormGoogle (zmodyfikowany)
- Dodano prop `reviewsEnabled`
- Gdy wyłączone: 
  - Przycisk "Dodaj opinię" zablokowany
  - Komunikat o zbyt dużej ilości zgłoszeń
  - Propozycja usunięcia całej wizytówki
  - Przycisk przekierowania do formularza usuwania profilu

## Instalacja

1. Wykonaj migrację SQL:
```sql
-- Uruchom zawartość pliku setup_app_settings_table.sql w Supabase
```

2. Lub użyj skryptu PowerShell:
```powershell
.\apply_app_settings_migration.ps1
```

## Użycie

### Dashboard
1. Zaloguj się do dashboard (`/dashboard`)
2. W sekcji "Zarządzanie usługami" znajdziesz przełącznik
3. Kliknij aby włączyć/wyłączyć przyjmowanie opinii

### Formularz opinii
- Gdy wyłączone: użytkownicy widzą komunikat o wstrzymaniu usługi
- Formularze są wyblurowane i nieaktywne
- W przypadku Google - propozycja alternatywnej usługi

## Zmienne środowiskowe
Wymagane standardowe zmienne Supabase:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (dla API admin)

## Struktura plików
```
src/
├── app/
│   ├── api/
│   │   └── reviews-settings/
│   │       └── route.ts              # API endpoint
│   └── dashboard/
│       └── page.tsx                  # Dashboard z przyciskiem
├── components/
│   ├── ReviewsToggleButton.tsx       # Przycisk włącz/wyłącz
│   └── formSteps/
│       ├── ReviewForm.tsx            # Formularz opinii (ogólny)
│       └── ReviewFormGoogle.tsx      # Formularz opinii Google
setup_app_settings_table.sql         # SQL migracja
apply_app_settings_migration.ps1     # Skrypt PowerShell
```

## Bezpieczeństwo
- Odczyt statusu: dostępny publicznie
- Zmiana statusu: tylko dla zalogowanych adminów
- RLS (Row Level Security) włączone na tabeli
