# Synchronizacja gmb_link w Reviews z URL w Companies

## Opis problemu
Gdy tworzone są companies wraz z reviews przez API, reviews powinny otrzymać ten sam link w kolumnie `gmb_link` co companies w kolumnie `url`.

## Rozwiązanie

### 1. Zmiany w bazie danych
Uruchom skrypt SQL: `src/app/sql/sync_gmb_link_2025_10_02.sql`

Ten skrypt:
- Dodaje kolumnę `gmb_link` do tabeli `reviews` (jeśli nie istnieje)
- Synchronizuje istniejące dane
- Tworzy triggery dla automatycznej synchronizacji:
  - `trigger_sync_review_gmb_link` - ustawia gmb_link przy dodawaniu nowej opinii
  - `trigger_update_reviews_gmb_link` - aktualizuje gmb_link gdy zmieni się URL firmy

### 2. Zmiany w kodzie API

#### a) `/api/company-with-reviews` (ZMIENIONE ✅)
- Dodano `gmb_link: companyData.url` do `reviewsWithDocumentId`
- Opinie otrzymują gmb_link automatycznie przy zapisie

#### b) `/api/reviews` (ZMIENIONE ✅)
- Dodano pobieranie URL firmy przez `company_id`
- Dodano `gmb_link: companyUrl` do formatowanych opinii

#### c) `/api/test-insert-review` (ZMIENIONE ✅)
- Dodano pobieranie URL firmy
- Dodano `gmb_link` do obiektu review

### 3. Weryfikacja
Uruchom skrypt: `src/app/sql/verify_gmb_link_sync.sql`

Ten skrypt sprawdzi:
- Statystyki synchronizacji
- Błędy synchronizacji
- Najnowsze opinie
- Status triggerów
- Strukturę tabeli

## Testowanie

### 1. Test API company-with-reviews
```bash
POST /api/company-with-reviews
{
  "company": {
    "name": "Test Firma",
    "url": "https://g.page/test-firma",
    // ... inne dane
  },
  "reviews": [
    {
      "author": "Jan Kowalski",
      "content": "Świetna firma",
      "url": "https://maps.google.com/review1"
    }
  ]
}
```

Sprawdź czy w tabeli `reviews` kolumna `gmb_link` ma wartość `https://g.page/test-firma`.

### 2. Test API reviews
```bash
POST /api/reviews
{
  "company_id": "existing-company-id",
  "reviews": [
    {
      "author": "Anna Nowak",
      "content": "Polecam",
      "url": "https://maps.google.com/review2"
    }
  ]
}
```

Sprawdź czy `gmb_link` w nowej opinii odpowiada URL z tabeli companies.

## Bezpieczeństwo
- Triggery działają na poziomie bazy danych - zapewniają konsystencję nawet przy bezpośrednich operacjach SQL
- Kod API dodatkowo zabezpiecza synchronizację przy zapisie
- Existing data zostało zsynchronizowane przez skrypt migracyjny

## Monitoring
Użyj `verify_gmb_link_sync.sql` do regularnego sprawdzania stanu synchronizacji.