# 📋 System Wniosków RODO - Dokumentacja Techniczna

## 📑 Spis Treści
1. [Przegląd Systemu](#przegląd-systemu)
2. [Struktura Bazy Danych](#struktura-bazy-danych)
3. [Weryfikacja NIP w GUS](#weryfikacja-nip-w-gus)
4. [Proces Tworzenia Wniosku RODO](#proces-tworzenia-wniosku-rodo)
5. [API Endpoints](#api-endpoints)
6. [Integracja z Stripe](#integracja-z-stripe)
7. [Generowanie i Wysyłka Dokumentów](#generowanie-i-wysyłka-dokumentów)
8. [Implementacja w Nowej Aplikacji](#implementacja-w-nowej-aplikacji)

---

## 🎯 Przegląd Systemu

System automatyzuje proces tworzenia i wysyłki wniosków RODO o usunięcie danych osobowych zgodnie z art. 17 RODO. Główne funkcjonalności:

- ✅ **Weryfikacja NIP w bazie GUS** - automatyczne pobieranie danych firmy
- ✅ **Generowanie dokumentu RODO** w formacie PDF
- ✅ **Płatności przez Stripe** (299 zł brutto z VAT 23%)
- ✅ **Automatyczna wysyłka emaili** z gotowym wnioskiem
- ✅ **Śledzenie statusu** dokumentów i płatności
- ✅ **Panel administracyjny** do zarządzania wnioskami

---

## 🗄️ Struktura Bazy Danych

### Tabela: `companies`

Przechowuje dane firm/klientów składających wnioski RODO.

```sql
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,                    -- Nazwa firmy
  first_name TEXT NOT NULL,              -- Imię osoby kontaktowej
  last_name TEXT NOT NULL,               -- Nazwisko osoby kontaktowej
  email TEXT NOT NULL,                   -- Email kontaktowy
  nip TEXT NOT NULL,                     -- NIP firmy (10 cyfr)
  regon TEXT,                            -- REGON (opcjonalnie)
  phone TEXT,                            -- Telefon kontaktowy
  street TEXT NOT NULL,                  -- Ulica i numer
  city TEXT NOT NULL,                    -- Miasto
  zip TEXT NOT NULL,                     -- Kod pocztowy
  url TEXT,                              -- Link do profilu/wpisu do usunięcia
  industry TEXT,                         -- Branża (opcjonalnie)
  opinie TEXT,                           -- Dodatkowe notatki
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indeksy dla wydajności
CREATE INDEX idx_companies_email ON companies(email);
CREATE INDEX idx_companies_nip ON companies(nip);
CREATE INDEX idx_companies_created_at ON companies(created_at);
```

**Pola wymagane:**
- `name` - nazwa firmy (pobierana z GUS)
- `first_name`, `last_name` - dane osoby kontaktowej
- `email` - do wysyłki dokumentu RODO
- `nip` - weryfikowany w GUS
- `street`, `city`, `zip` - adres firmy (z GUS)

---

### Tabela: `documents`

Przechowuje informacje o dokumentach RODO i innych dokumentach w systemie.

```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  type TEXT NOT NULL,                    -- Typ dokumentu: 'wniosek rodo'
  status TEXT DEFAULT 'draft',           -- Status: draft, pending, paid, sent
  processing_status TEXT DEFAULT 'nowe', -- Status przetwarzania: nowe, w trakcie, zakończone
  content TEXT,                          -- Treść dokumentu (opcjonalnie)
  email_sent_at TIMESTAMPTZ,            -- Data wysłania emaila
  payment_url TEXT,                      -- URL płatności Stripe
  invoice_url TEXT,                      -- URL faktury
  stripe_session_id TEXT,               -- ID sesji Stripe
  payment_date TIMESTAMPTZ,             -- Data płatności
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indeksy
CREATE INDEX idx_documents_company_id ON documents(company_id);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_processing_status ON documents(processing_status);
CREATE INDEX idx_documents_stripe_session_id ON documents(stripe_session_id);
CREATE INDEX idx_documents_created_at ON documents(created_at);
```

**Stany dokumentu (`status`):**
- `draft` - dokument utworzony, nie opłacony
- `pending` - oczekuje na płatność
- `paid` - opłacony, gotowy do wysłania
- `sent` - email z dokumentem wysłany

**Stany przetwarzania (`processing_status`):**
- `nowe` - nowy wniosek
- `w trakcie` - w trakcie realizacji
- `zakończone` - zakończony pomyślnie

---

### Tabela: `searched_nip`

Loguje wszystkie wyszukiwania NIP w systemie GUS (analytics).

```sql
CREATE TABLE searched_nip (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nip TEXT NOT NULL,                     -- Wyszukiwany NIP
  company_name TEXT,                     -- Nazwa firmy z GUS
  street TEXT,                           -- Adres z GUS
  city TEXT,                             -- Miasto z GUS
  zip TEXT,                              -- Kod pocztowy z GUS
  regon TEXT,                            -- REGON z GUS
  krs TEXT,                              -- KRS (jeśli dotyczy)
  ip_address TEXT,                       -- IP użytkownika
  user_agent TEXT,                       -- User agent przeglądarki
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indeksy
CREATE INDEX idx_searched_nip_nip ON searched_nip(nip);
CREATE INDEX idx_searched_nip_created_at ON searched_nip(created_at);
CREATE INDEX idx_searched_nip_ip_address ON searched_nip(ip_address);
```

---

### Tabela: `payments` (opcjonalnie - jeśli przechowujesz kopie z Stripe)

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  amount INTEGER NOT NULL,               -- Kwota w groszach (29900 = 299 zł)
  currency TEXT DEFAULT 'pln',
  status TEXT NOT NULL,                  -- paid, pending, failed
  payment_method TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

-- Indeksy
CREATE INDEX idx_payments_document_id ON payments(document_id);
CREATE INDEX idx_payments_stripe_session_id ON payments(stripe_session_id);
CREATE INDEX idx_payments_status ON payments(status);
```

---

## 🔍 Weryfikacja NIP w GUS

System integruje się z **API GUS BIR1** (Baza Internetowa REGON) do weryfikacji NIP i pobierania danych firmy.

### Konfiguracja

**Zmienne środowiskowe:**
```env
BIR_API_URL=https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc
BIR_API_KEY=twoj_klucz_testowy_lub_produkcyjny
```

**Klucz testowy GUS:**
```
abcde12345abcde12345
```

### Interfejs Danych GUS

```typescript
interface GUSCompanyData {
  name: string;      // Nazwa firmy
  street: string;    // Ulica i numer
  city: string;      // Miasto
  zip: string;       // Kod pocztowy
  nip: string;       // NIP
  regon: string;     // REGON
  krs?: string;      // KRS (opcjonalnie)
}
```

### API Endpoint: `/api/gus`

**Request:**
```typescript
POST /api/gus
Content-Type: application/json

{
  "nip": "1234567890"  // 10 cyfr
}
```

**Response (sukces):**
```json
{
  "success": true,
  "data": {
    "name": "PRZYKŁADOWA FIRMA SP. Z O.O.",
    "street": "ul. Główna 15",
    "city": "Warszawa",
    "zip": "00-001",
    "nip": "1234567890",
    "regon": "123456789",
    "krs": "0000123456"
  }
}
```

**Response (błąd):**
```json
{
  "error": "Nie znaleziono firmy o podanym NIP"
}
```

### Implementacja - Krok po Kroku

#### 1. **Login do GUS API**

```typescript
async function loginToGUS(): Promise<string | null> {
  const soapEnvelope = `
    <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" 
                   xmlns:ns="http://CIS/BIR/PUBL/2014/07">
      <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
        <wsa:To>${GUS_API_URL}</wsa:To>
        <wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Zaloguj</wsa:Action>
      </soap:Header>
      <soap:Body>
        <ns:Zaloguj>
          <ns:pKluczUzytkownika>${GUS_API_KEY}</ns:pKluczUzytkownika>
        </ns:Zaloguj>
      </soap:Body>
    </soap:Envelope>
  `;

  const response = await fetch(GUS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/soap+xml; charset=utf-8',
      'SOAPAction': 'http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Zaloguj',
    },
    body: soapEnvelope,
    signal: AbortSignal.timeout(30000)
  });

  const responseText = await response.text();
  
  // Ekstrakcja Session ID z odpowiedzi XML
  const sessionIdMatch = responseText.match(/<ZalogujResult>(.*?)<\/ZalogujResult>/);
  return sessionIdMatch ? sessionIdMatch[1] : null;
}
```

#### 2. **Wyszukiwanie Firmy po NIP**

```typescript
async function searchCompanyByNIP(
  sessionId: string, 
  nip: string
): Promise<GUSCompanyData | null> {
  const cleanNip = nip.replace(/[^0-9]/g, '');
  
  const soapEnvelope = `
    <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" 
                   xmlns:ns="http://CIS/BIR/PUBL/2014/07" 
                   xmlns:dat="http://CIS/BIR/PUBL/2014/07/DataContract">
      <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
        <wsa:To>${GUS_API_URL}</wsa:To>
        <wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DaneSzukajPodmioty</wsa:Action>
        <ns:sid>${sessionId}</ns:sid>
      </soap:Header>
      <soap:Body>
        <ns:DaneSzukajPodmioty>
          <ns:pParametryWyszukiwania>
            <dat:Nip>${cleanNip}</dat:Nip>
          </ns:pParametryWyszukiwania>
        </ns:DaneSzukajPodmioty>
      </soap:Body>
    </soap:Envelope>
  `;

  const response = await fetch(GUS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/soap+xml; charset=utf-8',
      'SOAPAction': 'http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DaneSzukajPodmioty',
      'sid': sessionId
    },
    body: soapEnvelope,
  });

  const responseText = await response.text();
  return parseCompanyDataFromXML(responseText);
}
```

#### 3. **Parsowanie XML z Danymi Firmy**

```typescript
function parseCompanyDataFromXML(xmlResponse: string): GUSCompanyData | null {
  // Wyciągnij dane z XML (uproszczona wersja - użyj xml2js w produkcji)
  const nameMatch = xmlResponse.match(/<Nazwa>(.*?)<\/Nazwa>/);
  const streetMatch = xmlResponse.match(/<Ulica>(.*?)<\/Ulica>/);
  const cityMatch = xmlResponse.match(/<Miejscowosc>(.*?)<\/Miejscowosc>/);
  const zipMatch = xmlResponse.match(/<KodPocztowy>(.*?)<\/KodPocztowy>/);
  const nipMatch = xmlResponse.match(/<Nip>(.*?)<\/Nip>/);
  const regonMatch = xmlResponse.match(/<Regon>(.*?)<\/Regon>/);
  const krsMatch = xmlResponse.match(/<NumerwRejestrzeEwidencji>(.*?)<\/NumerwRejestrzeEwidencji>/);

  if (!nameMatch || !nipMatch) return null;

  return {
    name: nameMatch[1],
    street: streetMatch?.[1] || '',
    city: cityMatch?.[1] || '',
    zip: zipMatch?.[1] || '',
    nip: nipMatch[1],
    regon: regonMatch?.[1] || '',
    krs: krsMatch?.[1] || undefined
  };
}
```

#### 4. **Zapisywanie Wyszukiwania do Bazy**

```typescript
async function saveSearchedNIP(data: GUSCompanyData, request: NextRequest) {
  const supabase = createServerSupabaseClient();
  
  let ip = request.headers.get('x-forwarded-for') || 
           request.headers.get('x-real-ip') || 
           'unknown';
  
  if (ip.includes(',')) {
    ip = ip.split(',')[0].trim();
  }
  
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  await supabase.from('searched_nip').insert({
    nip: data.nip,
    company_name: data.name,
    street: data.street,
    city: data.city,
    zip: data.zip,
    regon: data.regon,
    krs: data.krs || null,
    ip_address: ip,
    user_agent: userAgent,
  });
}
```

### Hook React do Weryfikacji NIP

```typescript
// hooks/useGUS.ts
import { useState } from 'react';

interface GUSCompanyData {
  name: string;
  street: string;
  city: string;
  zip: string;
  nip: string;
  regon: string;
  krs?: string;
}

interface UseGUSResult {
  data: GUSCompanyData | null;
  loading: boolean;
  error: string | null;
  searchByNIP: (nip: string) => Promise<void>;
  reset: () => void;
}

export function useGUS(): UseGUSResult {
  const [data, setData] = useState<GUSCompanyData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchByNIP = async (nip: string) => {
    if (!nip || nip.length < 10) {
      setError('NIP musi mieć co najmniej 10 cyfr');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch('/api/gus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nip }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Błąd podczas pobierania danych');
      }

      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError('Nie znaleziono firmy o podanym NIP');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return { data, loading, error, searchByNIP, reset };
}
```

---

## 🔄 Proces Tworzenia Wniosku RODO

### Diagram Przepływu

```
1. Użytkownik → Wprowadza NIP
           ↓
2. Frontend → API GUS (weryfikacja NIP)
           ↓
3. GUS API → Zwraca dane firmy
           ↓
4. Frontend → Automatyczne wypełnienie formularza
           ↓
5. Użytkownik → Uzupełnia dane kontaktowe + link do profilu
           ↓
6. Użytkownik → Potwierdza i przechodzi do płatności
           ↓
7. Frontend → POST /api/companies (zapis firmy)
           ↓
8. Backend → Zwraca company_id
           ↓
9. Frontend → POST /api/documents (tworzenie dokumentu RODO)
           ↓
10. Backend → Zwraca document_id
           ↓
11. Frontend → POST /api/payments/create-payment
           ↓
12. Backend → Tworzy sesję Stripe + klienta (z NIP jako VAT ID)
           ↓
13. Stripe → Redirect do checkout
           ↓
14. Użytkownik → Płaci
           ↓
15. Stripe → Webhook: checkout.session.completed
           ↓
16. Backend → Aktualizuje status dokumentu na 'paid'
           ↓
17. Frontend (success page) → POST /api/send-rodo-email
           ↓
18. Backend → Generuje PDF + wysyła email
           ↓
19. Backend → Ustawia email_sent_at + status: 'sent'
           ↓
20. Użytkownik → Otrzymuje email z gotowym wnioskiem RODO
```

### Kroki Szczegółowe

#### Krok 1: Weryfikacja NIP

**Frontend Component (useState + useEffect):**

```typescript
const [nipInput, setNipInput] = useState("");
const [validatedNIP, setValidatedNIP] = useState(false);
const { data: gusData, loading: gusLoading, error: gusError, searchByNIP } = useGUS();

const handleNIPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.replace(/[^0-9]/g, '');
  setNipInput(value);
  
  if (value.length === 10) {
    // Automatyczne wyszukiwanie po wpisaniu 10 cyfr
    searchByNIP(value);
  }
};

useEffect(() => {
  if (gusData) {
    // Automatyczne wypełnienie formularza danymi z GUS
    setCompany(prev => ({
      ...prev,
      name: gusData.name,
      nip: gusData.nip,
      street: gusData.street,
      city: gusData.city,
      zip: gusData.zip,
    }));
    setValidatedNIP(true);
  }
}, [gusData]);
```

#### Krok 2: Uzupełnienie Danych

```typescript
interface CompanyData {
  name: string;         // Z GUS
  first_name: string;   // Od użytkownika
  last_name: string;    // Od użytkownika
  email: string;        // Od użytkownika
  nip: string;          // Z GUS
  phone: string;        // Od użytkownika
  street: string;       // Z GUS
  city: string;         // Z GUS
  zip: string;          // Z GUS
  link: string;         // Od użytkownika - link do profilu/wpisu do usunięcia
}
```

#### Krok 3: Zapis Firmy

**API: `/api/companies`**

```typescript
POST /api/companies
Content-Type: application/json

{
  "name": "PRZYKŁADOWA FIRMA SP. Z O.O.",
  "first_name": "Jan",
  "last_name": "Kowalski",
  "email": "jan.kowalski@firma.pl",
  "nip": "1234567890",
  "regon": "123456789",
  "phone": "+48 123 456 789",
  "street": "ul. Główna 15",
  "city": "Warszawa",
  "zip": "00-001",
  "url": "https://portal.pl/firma/12345"
}
```

**Response:**
```json
{
  "id": "uuid-firmy"
}
```

**Implementacja Backend:**

```typescript
// api/companies/route.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  const { 
    name, first_name, last_name, email, nip, regon, 
    phone, street, city, zip, url 
  } = body;

  const { data, error } = await supabase
    .from('companies')
    .insert([{ 
      name, first_name, last_name, email, nip, regon, 
      phone, street, city, zip, url 
    }])
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: 'Błąd przy dodawaniu firmy' }, 
      { status: 500 }
    );
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}
```

#### Krok 4: Utworzenie Dokumentu

**API: `/api/documents`**

```typescript
POST /api/documents
Content-Type: application/json

{
  "company_id": "uuid-firmy",
  "type": "wniosek rodo"
}
```

**Response:**
```json
{
  "id": "uuid-dokumentu",
  "message": "Dokument utworzony"
}
```

**Implementacja Backend:**

```typescript
// api/documents/route.ts
import { supabase } from '@/app/lib/supabase';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  const { company_id, type } = await req.json();

  if (!company_id || !type) {
    return NextResponse.json(
      { error: 'Brak wymaganych pól' }, 
      { status: 400 }
    );
  }

  const document_id = randomUUID();

  const { error } = await supabase.from('documents').insert({
    id: document_id,
    company_id,
    type,
    status: 'draft'
  });

  if (error) {
    return NextResponse.json(
      { error: 'Błąd zapisu dokumentu' }, 
      { status: 500 }
    );
  }

  return NextResponse.json({ 
    id: document_id,
    message: 'Dokument utworzony' 
  });
}
```

---

## 💳 Integracja z Stripe

### Konfiguracja Stripe

**Zmienne środowiskowe:**
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_BASE_URL=https://twoja-domena.pl
```

### Tworzenie Płatności

**API: `/api/payments/create-payment`**

```typescript
POST /api/payments/create-payment
Content-Type: application/json

{
  "document_id": "uuid-dokumentu",
  "email": "jan.kowalski@firma.pl",
  "company_name": "PRZYKŁADOWA FIRMA SP. Z O.O.",
  "nip": "1234567890",
  "address": "ul. Główna 15",
  "city": "Warszawa",
  "zipCode": "00-001"
}
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/pay/cs_test_..."
}
```

### Implementacja Stripe Checkout

```typescript
// api/payments/create-payment/route.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(request: NextRequest) {
  const {
    document_id,
    email,
    company_name,
    nip,
    address,
    city,
    zipCode,
  } = await request.json();

  // Walidacja
  if (!document_id || !email || !company_name) {
    return NextResponse.json(
      { error: 'Brak wymaganych danych' },
      { status: 400 }
    );
  }

  // Tworzenie klienta Stripe
  const customer = await stripe.customers.create({
    email: email,
    name: company_name,
    ...(address && city && {
      address: {
        line1: address,
        postal_code: zipCode,
        city: city,
        country: 'PL',
      }
    }),
    metadata: {
      company_name: company_name,
      nip: nip,
      vat_number: `PL${nip}`,
      type: 'wizaro_client',
    },
  });

  // Dodanie VAT ID do klienta (dla faktur VAT)
  if (nip && customer) {
    try {
      await stripe.customers.createTaxId(customer.id, {
        type: 'eu_vat',
        value: `PL${nip}`,
      });
    } catch (taxError) {
      console.error('⚠️ Błąd dodawania VAT ID:', taxError);
    }
  }

  // Tworzenie sesji płatności
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'pln',
          product_data: {
            name: 'Wniosek RODO - Żądanie usunięcia danych osobowych',
            description: 'Gotowy wniosek RODO o usunięcie danych osobowych zgodny z art. 17 RODO',
          },
          unit_amount: 29900, // 299 zł brutto (w groszach)
        },
        quantity: 1,
        // Tax rate dla VAT 23% (należy utworzyć w Stripe Dashboard)
        tax_rates: ['txr_1R7D3ILEJlt9ALSCyamMiFnX'],
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success-rodo?session_id={CHECKOUT_SESSION_ID}&document_id=${document_id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/wniosek-rodo`,
    customer: customer.id,
    metadata: {
      document_id: document_id,
      type: 'rodo_request',
      company_name: company_name,
      nip: nip,
      vat_number: `PL${nip}`,
      address: address,
      city: city,
      zip_code: zipCode,
    },
    invoice_creation: {
      enabled: false, // Włącz jeśli chcesz automatyczne faktury
      invoice_data: {
        description: 'Wniosek RODO - Usunięcie danych osobowych',
        metadata: {
          document_id: document_id,
          type: 'rodo_request',
        },
      },
    },
  });

  return NextResponse.json({ url: session.url });
}
```

### Stripe Webhook Handler

**Endpoint: `/api/payments/webhook`**

```typescript
// api/payments/webhook/route.ts
import Stripe from 'stripe';
import { createServerSupabaseClient } from '@/app/lib/supabase-client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  const supabase = createServerSupabaseClient();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      if (session.metadata?.document_id) {
        // Aktualizuj status dokumentu na 'paid'
        await supabase
          .from('documents')
          .update({ 
            status: 'paid',
            payment_date: new Date().toISOString(),
            stripe_session_id: session.id,
          })
          .eq('id', session.metadata.document_id);

        // Opcjonalnie: zapisz płatność w tabeli payments
        await supabase.from('payments').insert({
          document_id: session.metadata.document_id,
          stripe_session_id: session.id,
          stripe_customer_id: session.customer as string,
          amount: session.amount_total!,
          currency: session.currency!,
          status: 'paid',
          paid_at: new Date().toISOString(),
        });
      }
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      if (session.metadata?.document_id) {
        await supabase
          .from('documents')
          .update({ status: 'cancelled' })
          .eq('id', session.metadata.document_id);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
```

---

## 📧 Generowanie i Wysyłka Dokumentów

### Generowanie PDF z Puppeteer

**Zależności:**
```bash
npm install puppeteer nodemailer
npm install --save-dev @types/nodemailer
```

**API: `/api/send-rodo-email`**

```typescript
POST /api/send-rodo-email
Content-Type: application/json

{
  "document_id": "uuid-dokumentu"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email z wnioskiem RODO został wysłany pomyślnie!",
  "sent_at": "2024-01-15T10:30:00Z"
}
```

### Implementacja

```typescript
// api/send-rodo-email/route.ts
import nodemailer from 'nodemailer';
import puppeteer from 'puppeteer';
import { supabase } from '@/app/lib/supabase';

interface CompanyData {
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  nip: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
  link: string;
}

export async function POST(req: NextRequest) {
  const { document_id } = await req.json();

  if (!document_id) {
    return NextResponse.json(
      { error: 'Brak ID dokumentu' }, 
      { status: 400 }
    );
  }

  // Pobierz dane dokumentu z firmą
  const { data: documentData, error: docError } = await supabase
    .from('documents')
    .select(`*, company:companies(*)`)
    .eq('id', document_id)
    .single();

  if (docError || !documentData) {
    return NextResponse.json(
      { error: 'Nie znaleziono dokumentu' }, 
      { status: 404 }
    );
  }

  // Sprawdź czy email już został wysłany
  if (documentData.email_sent_at) {
    return NextResponse.json({ 
      success: true, 
      message: 'Email już został wysłany!',
      sent_at: documentData.email_sent_at
    });
  }

  const company = documentData.company as CompanyData;
  
  // Generuj PDF
  const rodoPdfBuffer = await generateRODOPDF(company);
  
  // Wyślij email
  await sendRODOEmail(company, rodoPdfBuffer);

  // Zaktualizuj status
  await supabase
    .from('documents')
    .update({ 
      email_sent_at: new Date().toISOString(),
      status: 'sent' 
    })
    .eq('id', document_id);

  return NextResponse.json({ 
    success: true, 
    message: 'Email wysłany pomyślnie!',
    sent_at: new Date().toISOString()
  });
}

// Generowanie PDF
async function generateRODOPDF(company: CompanyData): Promise<Buffer> {
  const htmlContent = generateRODOHTML(company);
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'load' });
  
  const pdfBuffer = await page.pdf({
    format: 'A4',
    margin: {
      top: '2.3cm',
      right: '2.3cm',
      bottom: '2.3cm',
      left: '2.3cm'
    },
    printBackground: true
  });
  
  await browser.close();
  return Buffer.from(pdfBuffer);
}

// Wysyłka emaila
async function sendRODOEmail(
  company: CompanyData, 
  rodoPdfBuffer: Buffer
) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const emailSubject = `Wniosek RODO dla ${company.name} - gotowy do wysłania`;
  const emailHtml = createEmailTemplate(company);

  await transporter.sendMail({
    from: `"Wizaro.pl - Ochrona Danych" <${process.env.SMTP_USER}>`,
    to: company.email,
    subject: emailSubject,
    html: emailHtml,
    attachments: [
      {
        filename: `wniosek_rodo_${company.name.replace(/[^a-z0-9]/gi, '_')}.pdf`,
        content: rodoPdfBuffer,
        contentType: 'application/pdf'
      }
    ]
  });
}
```

### Szablon HTML Wniosku RODO

```typescript
function generateRODOHTML(company: CompanyData): string {
  const currentDate = new Date().toLocaleDateString('pl-PL');
  
  return `
    <!DOCTYPE html>
    <html lang="pl">
    <head>
        <meta charset="UTF-8">
        <title>Wniosek RODO - ${company.name}</title>
        <style>
            @page { size: A4; margin: 35px; }
            body {
                font-family: 'Times New Roman', serif;
                font-size: 14px;
                line-height: 1.6;
                color: #000;
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 2px solid #000;
                padding-bottom: 15px;
            }
            .title {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .content {
                margin-bottom: 20px;
                line-height: 1.8;
            }
            .signature {
                margin-top: 40px;
                text-align: right;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="title">WNIOSEK O USUNIĘCIE DANYCH OSOBOWYCH</div>
            <div>zgodnie z art. 17 RODO</div>
        </div>

        <div class="date">Data: ${currentDate}</div>

        <div class="content">
            <p><strong>Temat: Wniosek o usunięcie danych firmy ${company.name}</strong></p>
            
            <p>Szanowni Państwo,</p>
            
            <p>Zwracam się z uprzejmą prośbą o trwałe usunięcie danych dotyczących mojej działalności gospodarczej, umieszczonych na Państwa portalu:</p>
            
            <p><strong>Nazwa firmy:</strong> ${company.name}</p>
            <p><strong>NIP:</strong> ${company.nip}</p>
            <p><strong>Link do wpisu:</strong> ${company.link}</p>
            
            <p>Wniosek składam na podstawie art. 17 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych (RODO).</p>
            
            <p>Nie wyrażam zgody na przetwarzanie moich danych osobowych przez Państwa serwis. Proszę o niezwłoczne usunięcie wszystkich danych dotyczących mojej osoby i działalności gospodarczej.</p>
            
            <p>Zgodnie z art. 17 ust. 1 lit. b RODO, mam prawo do żądania usunięcia moich danych osobowych, jeżeli nie istnieją nadrzędne prawnie uzasadnione podstawy ich przetwarzania.</p>
            
            <p>Oczekuję realizacji niniejszego wniosku w terminie 30 dni od daty jego otrzymania, zgodnie z art. 12 ust. 3 RODO.</p>
            
            <p>Z poważaniem,</p>
        </div>

        <div class="signature">
            <p>[imię i nazwisko]</p>
            <div class="signature-line"></div>
            <p>podpis</p>
        </div>

        <div style="margin-top: 40px; font-size: 12px;">
            <p><strong>Dane kontaktowe:</strong></p>
            <p>${company.first_name} ${company.last_name}</p>
            <p>Email: ${company.email}</p>
            <p>Telefon: ${company.phone}</p>
            <p>Adres: ${company.street}, ${company.zip} ${company.city}</p>
        </div>
    </body>
    </html>
  `;
}
```

### Szablon Emaila do Klienta

```typescript
function createEmailTemplate(company: CompanyData): string {
  return `
  <!DOCTYPE html>
  <html lang="pl">
  <head>
    <meta charset="UTF-8">
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; }
      .container { max-width: 600px; margin: 0 auto; }
      .header { background: #3498db; color: white; padding: 20px; }
      .content { padding: 30px; }
      .instructions { background: #e8f5e8; padding: 20px; margin: 20px 0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Wniosek RODO - ${company.name}</h1>
      </div>
      
      <div class="content">
        <p>Dzień dobry ${company.first_name} ${company.last_name},</p>
        
        <p>Zgodnie z Pani/Pana prośbą, przygotowaliśmy gotowy wniosek RODO dla firmy <strong>${company.name}</strong>.</p>
        
        <div class="instructions">
          <h3>📋 Instrukcja krok po kroku:</h3>
          <ol>
            <li>Pobierz załączony plik PDF z wnioskiem</li>
            <li>Otwórz PDF i skopiuj treść wniosku</li>
            <li>Wklej treść do nowego e-maila</li>
            <li>Uzupełnij miejsce "[imię i nazwisko]" swoimi danymi</li>
            <li>Wyślij na adres kontaktowy portalu</li>
          </ol>
        </div>
        
        <p>Wniosek jest w pełni zgodny z przepisami RODO. Portal ma obowiązek odpowiedzieć w terminie 30 dni.</p>
        
        <p>Pozdrawiamy,<br><strong>Zespół Wizaro.pl</strong></p>
      </div>
    </div>
  </body>
  </html>
  `;
}
```

---

## 🚀 Implementacja w Nowej Aplikacji

### Checklist Implementacji

#### 1. **Konfiguracja Środowiska**

```env
# Supabase
SUPABASE_URL=https://twoj-projekt.supabase.co
SUPABASE_SERVICE_ROLE_KEY=twoj_klucz_serwisowy

# GUS API
BIR_API_URL=https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc
BIR_API_KEY=abcde12345abcde12345

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# SMTP (np. SendGrid, Mailgun, Gmail)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=twoj_klucz_api

# App
NEXT_PUBLIC_BASE_URL=https://twoja-domena.pl
```

#### 2. **Instalacja Zależności**

```bash
npm install @supabase/supabase-js stripe nodemailer puppeteer
npm install --save-dev @types/nodemailer
```

#### 3. **Utworzenie Tabel w Supabase**

Uruchom poniższe zapytania SQL w Supabase SQL Editor:

```sql
-- Tabela companies
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  nip TEXT NOT NULL,
  regon TEXT,
  phone TEXT,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  zip TEXT NOT NULL,
  url TEXT,
  industry TEXT,
  opinie TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_companies_email ON companies(email);
CREATE INDEX idx_companies_nip ON companies(nip);
CREATE INDEX idx_companies_created_at ON companies(created_at);

-- Tabela documents
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  processing_status TEXT DEFAULT 'nowe',
  content TEXT,
  email_sent_at TIMESTAMPTZ,
  payment_url TEXT,
  invoice_url TEXT,
  stripe_session_id TEXT,
  payment_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_documents_company_id ON documents(company_id);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_processing_status ON documents(processing_status);
CREATE INDEX idx_documents_stripe_session_id ON documents(stripe_session_id);
CREATE INDEX idx_documents_created_at ON documents(created_at);

-- Tabela searched_nip
CREATE TABLE searched_nip (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nip TEXT NOT NULL,
  company_name TEXT,
  street TEXT,
  city TEXT,
  zip TEXT,
  regon TEXT,
  krs TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_searched_nip_nip ON searched_nip(nip);
CREATE INDEX idx_searched_nip_created_at ON searched_nip(created_at);
CREATE INDEX idx_searched_nip_ip_address ON searched_nip(ip_address);

-- Tabela payments (opcjonalnie)
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'pln',
  status TEXT NOT NULL,
  payment_method TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

CREATE INDEX idx_payments_document_id ON payments(document_id);
CREATE INDEX idx_payments_stripe_session_id ON payments(stripe_session_id);
CREATE INDEX idx_payments_status ON payments(status);
```

#### 4. **Struktura Katalogów**

```
src/
├── app/
│   ├── api/
│   │   ├── companies/
│   │   │   └── route.ts
│   │   ├── documents/
│   │   │   └── route.ts
│   │   ├── gus/
│   │   │   └── route.ts
│   │   ├── payments/
│   │   │   ├── create-payment/
│   │   │   │   └── route.ts
│   │   │   ├── webhook/
│   │   │   │   └── route.ts
│   │   │   └── session-details/
│   │   │       └── route.ts
│   │   └── send-rodo-email/
│   │       └── route.ts
│   ├── wniosek-rodo/
│   │   └── page.tsx
│   └── success-rodo/
│       └── page.tsx
├── components/
│   └── CompanyRODOForm.tsx
├── hooks/
│   └── useGUS.ts
└── lib/
    └── supabase-client.ts
```

#### 5. **Konfiguracja Stripe Webhook**

1. Zaloguj się do Stripe Dashboard
2. Przejdź do **Developers → Webhooks**
3. Dodaj endpoint: `https://twoja-domena.pl/api/payments/webhook`
4. Wybierz eventy:
   - `checkout.session.completed`
   - `checkout.session.expired`
5. Skopiuj **Signing secret** do `.env` jako `STRIPE_WEBHOOK_SECRET`

#### 6. **Test Lokalny z Stripe CLI**

```bash
# Zainstaluj Stripe CLI
# https://stripe.com/docs/stripe-cli

# Zaloguj się
stripe login

# Przekieruj webhooki lokalnie
stripe listen --forward-to localhost:3000/api/payments/webhook

# W innym terminalu - uruchom aplikację
npm run dev
```

#### 7. **Utworzenie Tax Rate w Stripe**

W Stripe Dashboard:
1. **Products → Tax rates**
2. **Create tax rate**
   - Display name: `VAT 23%`
   - Percentage: `23`
   - Inclusive: `Yes` (cena już zawiera VAT)
   - Jurisdiction: `Poland`
3. Skopiuj ID (np. `txr_1R7D3ILEJlt9ALSCyamMiFnX`)
4. Użyj w `create-payment/route.ts`

#### 8. **Konfiguracja SMTP**

Przykład z **SendGrid**:
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=SG.twoj_klucz_api
```

Przykład z **Gmail**:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=twoj.email@gmail.com
SMTP_PASS=haslo_aplikacji_gmail
```

#### 9. **Konfiguracja Puppeteer**

Dla środowiska produkcyjnego (np. Vercel):

```bash
npm install @sparticuz/chromium
```

Zaktualizuj `generateRODOPDF`:

```typescript
import chromium from '@sparticuz/chromium';

async function generateRODOPDF(company: CompanyData): Promise<Buffer> {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });
  
  // ... reszta kodu
}
```

#### 10. **Testowanie End-to-End**

**Test Flow:**
1. Otwórz `/wniosek-rodo`
2. Wprowadź testowy NIP: `5213017881` (Testowa firma GUS)
3. Sprawdź czy dane automatycznie się wypełniły
4. Uzupełnij dane kontaktowe
5. Potwierdź i przejdź do płatności
6. Użyj testowej karty Stripe: `4242 4242 4242 4242`, CVV: `123`, data: dowolna przyszła
7. Zapłać
8. Sprawdź czy email dotarł z PDF-em
9. W Stripe Dashboard sprawdź czy płatność się pojawiła
10. W Supabase sprawdź czy dane się zapisały

---

## 📊 Panel Administracyjny

### Lista Wniosków

**Endpoint do pobrania wniosków:**

```typescript
// app/api/admin/rodo-requests/route.ts
import { createServerSupabaseClient } from '@/app/lib/supabase-client';

export async function GET() {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('documents')
    .select(`
      *,
      companies (
        id,
        name,
        first_name,
        last_name,
        email,
        phone,
        nip,
        street,
        city,
        zip,
        url
      )
    `)
    .eq('type', 'wniosek rodo')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
```

### Aktualizacja Statusu

```typescript
// app/api/admin/rodo-requests/[id]/route.ts
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createServerSupabaseClient();
  const { processing_status } = await request.json();
  
  const { error } = await supabase
    .from('documents')
    .update({ 
      processing_status,
      updated_at: new Date().toISOString()
    })
    .eq('id', params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
```

---

## 🔐 Bezpieczeństwo

### Row Level Security (RLS) w Supabase

```sql
-- Wyłącz RLS dla publicznego dostępu (tylko dla API routes z service_role_key)
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;
ALTER TABLE documents DISABLE ROW LEVEL SECURITY;
ALTER TABLE searched_nip DISABLE ROW LEVEL SECURITY;
ALTER TABLE payments DISABLE ROW LEVEL SECURITY;
```

**LUB** włącz RLS z odpowiednimi politykami:

```sql
-- Włącz RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Polityki dla companies
CREATE POLICY "Allow insert for everyone" ON companies
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all for authenticated" ON companies
  FOR ALL USING (auth.role() = 'authenticated');

-- Polityki dla documents
CREATE POLICY "Allow insert for everyone" ON documents
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all for authenticated" ON documents
  FOR ALL USING (auth.role() = 'authenticated');
```

### Walidacja Danych

```typescript
// Walidacja NIP
function isValidNIP(nip: string): boolean {
  const cleanNip = nip.replace(/[^0-9]/g, '');
  
  if (cleanNip.length !== 10) return false;
  
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const digits = cleanNip.split('').map(Number);
  
  const sum = weights.reduce((acc, weight, i) => 
    acc + weight * digits[i], 0
  );
  
  const checksum = sum % 11;
  return checksum === digits[9];
}

// Walidacja email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

---

## 📈 Monitoring i Analytics

### Śledzenie Konwersji

```typescript
// app/api/analytics/conversion/route.ts
export async function POST(request: NextRequest) {
  const { event, data } = await request.json();
  
  // Zapisz event do tabeli analytics
  await supabase.from('analytics_events').insert({
    event_type: event,
    event_data: data,
    user_agent: request.headers.get('user-agent'),
    ip_address: request.headers.get('x-forwarded-for'),
  });
  
  return NextResponse.json({ success: true });
}
```

**Eventy do śledzenia:**
- `nip_searched` - wyszukanie NIP
- `nip_verified` - pomyślna weryfikacja
- `form_submitted` - wysłanie formularza
- `payment_initiated` - start płatności
- `payment_completed` - zakończenie płatności
- `email_sent` - wysłanie emaila

---

## 🛠️ Rozwiązywanie Problemów

### Częste Błędy

**1. GUS API zwraca błąd:**
```
Rozwiązanie: Sprawdź czy używasz poprawnego klucza API (testowy vs produkcyjny)
```

**2. Puppeteer nie działa na produkcji:**
```bash
npm install @sparticuz/chromium
# Użyj chromium.executablePath() zamiast lokalnego Chrome
```

**3. Stripe webhook nie działa:**
```
Rozwiązanie: Sprawdź czy STRIPE_WEBHOOK_SECRET jest poprawny
Użyj stripe CLI do testów lokalnych
```

**4. Email nie dociera:**
```
Rozwiązanie: 
- Sprawdź konfigurację SMTP
- Dodaj nadawcę do zaufanych w SendGrid/Mailgun
- Sprawdź logi serwera SMTP
```

**5. RLS blokuje zapisy:**
```sql
-- Wyłącz RLS tymczasowo
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;
ALTER TABLE documents DISABLE ROW LEVEL SECURITY;
```

---

## 📚 Przydatne Linki

- **GUS API Dokumentacja:** https://api.stat.gov.pl/Home/BirApi
- **Stripe Dokumentacja:** https://stripe.com/docs
- **Supabase Dokumentacja:** https://supabase.com/docs
- **Puppeteer Dokumentacja:** https://pptr.dev/
- **Nodemailer Dokumentacja:** https://nodemailer.com/

---

## 📝 Podsumowanie

System zapewnia kompleksową obsługę wniosków RODO:

✅ **Automatyczna weryfikacja NIP** w bazie GUS  
✅ **Płatności Stripe** z automatyczną obsługą VAT  
✅ **Generowanie PDF** z wnioskiem RODO  
✅ **Automatyczna wysyłka emaili**  
✅ **Śledzenie statusów** dokumentów  
✅ **Panel administracyjny**  

**Kluczowe elementy do implementacji:**
1. Tabele w Supabase (companies, documents, searched_nip, payments)
2. API GUS (weryfikacja NIP)
3. Stripe (płatności + webhooks)
4. Puppeteer (generowanie PDF)
5. Nodemailer (wysyłka emaili)
6. Frontend z formularzem wieloetapowym

**Czas implementacji:** ~3-5 dni roboczych  
**Koszty miesięczne:** ~50-100 zł (w zależności od ruchu)

---

*Dokument utworzony: 2024*  
*Ostatnia aktualizacja: 2024*
