# Przewodnik Implementacji Schema JSON-LD

## Spis treści
1. [Wprowadzenie](#wprowadzenie)
2. [Podstawowa struktura](#podstawowa-struktura)
3. [Wymagane importy](#wymagane-importy)
4. [Szczegółowy opis każdego schema](#szczegółowy-opis-każdego-schema)
5. [Kompletny przykład implementacji](#kompletny-przykład-implementacji)
6. [Najczęstsze błędy](#najczęstsze-błędy)

---

## Wprowadzenie

Ten dokument opisuje jak prawidłowo zaimplementować schematy JSON-LD (Schema.org) na stronach Next.js, aby poprawić SEO i widoczność w wyszukiwarkach. Przykład bazuje na działającej implementacji ze strony `/jak-usunac-opinie-z-aleo`.

---

## Podstawowa struktura

Każda strona powinna zawierać następujące elementy:
1. **Importy schematów** z komponentu `schemas`
2. **Dane FAQ** - pytania i odpowiedzi
3. **Dane breadcrumbs** - ścieżka nawigacyjna
4. **Dane reviews** - opinie klientów
5. **Komponenty schematów** w JSX

---

## Wymagane importy

```typescript
import { 
  ArticleSchema, 
  FAQSchema, 
  AggregateRatingSchema, 
  ProductWithRatingSchema, 
  BreadcrumbSchema, 
  LocalBusinessSchema, 
  ReviewSchema 
} from '@/components/schemas';
```

---

## Szczegółowy opis każdego schema

### 1. ArticleSchema
**Cel:** Oznacza stronę jako artykuł, pomaga Google zrozumieć treść.

```typescript
<ArticleSchema
  headline="Jak usunąć opinie z [NAZWA_PLATFORMY] - Skuteczne metody usuwania 2025"
  description="Profesjonalne usuwanie opinii i profili firm z serwisu [NAZWA_PLATFORMY]..."
  url="https://wizaro.pl/sciezka-do-strony"
  keywords={["słowo kluczowe 1", "słowo kluczowe 2", "słowo kluczowe 3"]}
  category="Legal Services"
/>
```

**Parametry:**
- `headline` - główny tytuł artykułu (max 110 znaków)
- `description` - opis artykułu (150-160 znaków)
- `url` - pełny URL strony
- `keywords` - tablica słów kluczowych (3-5 słów)
- `category` - kategoria (np. "Legal Services", "Technology", "Business")

---

### 2. ProductWithRatingSchema
**Cel:** Definiuje usługę jako produkt z oceną, może pokazać gwiazdki w wynikach Google.

```typescript
<ProductWithRatingSchema
  name="Usuwanie opinii z [NAZWA_PLATFORMY]"
  description="Profesjonalne usługi usuwania negatywnych opinii i profili firm z platformy [NAZWA]."
  url="https://wizaro.pl/sciezka-do-strony"
  ratingValue={4.9}
  reviewCount={156}
/>
```

**Parametry:**
- `name` - nazwa usługi/produktu
- `description` - opis usługi
- `url` - pełny URL strony
- `ratingValue` - średnia ocena (0-5, np. 4.9)
- `reviewCount` - liczba opinii (liczba całkowita)

---

### 3. AggregateRatingSchema ⭐ **NAJWAŻNIEJSZY**
**Cel:** Pokazuje zbiorcze oceny w wynikach wyszukiwania (gwiazdki w Google).

```typescript
<AggregateRatingSchema
  ratingValue={4.9}
  reviewCount={156}
  itemType="Service"
  itemName="Usuwanie opinii z [NAZWA_PLATFORMY]"
  itemUrl="https://wizaro.pl/sciezka-do-strony"
/>
```

**Parametry:**
- `ratingValue` - średnia ocena (0-5)
- `reviewCount` - liczba opinii (musi zgadzać się z ProductWithRatingSchema)
- `itemType` - typ: "Service", "Product", "LocalBusiness"
- `itemName` - nazwa ocenianego elementu
- `itemUrl` - pełny URL strony

**WAŻNE:** `reviewCount` musi być taka sama jak w `ProductWithRatingSchema`!

---

### 4. BreadcrumbSchema
**Cel:** Pokazuje ścieżkę nawigacyjną w wynikach Google.

```typescript
const breadcrumbs = [
  { name: "Strona główna", url: "https://wizaro.pl" },
  { name: "Usuwanie opinii", url: "https://wizaro.pl/usuwanie-opinii" },
  { name: "Nazwa platformy", url: "https://wizaro.pl/sciezka-koncowa" }
];

<BreadcrumbSchema items={breadcrumbs} />
```

**Struktura pojedynczego elementu:**
- `name` - nazwa widoczna w breadcrumbs
- `url` - pełny URL do strony

**ZASADA:** Minimum 2 elementy, pierwszy zawsze strona główna, ostatni aktualna strona.

---

### 5. FAQSchema
**Cel:** Pokazuje FAQ w wynikach Google jako rozwijane pytania.

```typescript
const faqs = [
  {
    question: "Jak długo trwa usuwanie opinii z [PLATFORMA]?",
    answer: "Proces usuwania opinii z [PLATFORMA] może trwać od kilku dni do kilku tygodni, w zależności od typu opinii i argumentów prawnych."
  },
  {
    question: "Czy można usunąć wszystkie dane firmy z [PLATFORMA]?",
    answer: "Tak, możemy usunąć kompletny profil firmy z [PLATFORMA], włączając w to wszystkie dane firmowe, opinie i oceny."
  },
  {
    question: "Ile kosztuje usuwanie opinii z [PLATFORMA]?",
    answer: "Koszt zależy od liczby opinii i złożoności sprawy. Oferujemy bezpłatną konsultację i płatność tylko za rezultat."
  }
];

<FAQSchema faqs={faqs} />
```

**Zalecenia:**
- Minimum 3-5 pytań
- Pytania powinny być konkretne i naturalne
- Odpowiedzi zwięzłe (1-3 zdania)
- Używaj słów kluczowych w pytaniach

---

### 6. LocalBusinessSchema
**Cel:** Definiuje firmę jako lokalny biznes.

```typescript
<LocalBusinessSchema
  name="Wizaro - Usuwanie Opinii z [PLATFORMA]"
  description="Profesjonalne usuwanie negatywnych opinii i profili firm z platformy [NAZWA]. Skuteczne metody, zgodność z prawem."
  url="https://wizaro.pl"
  telephone="+48792861513"
  address={{
    streetAddress: "",
    addressLocality: "Polska",
    addressRegion: "Polska",
    postalCode: "",
    addressCountry: "PL"
  }}
  services={["Usuwanie opinii z [PLATFORMA]", "Usuwanie profili firm", "Zgodność z RODO"]}
/>
```

**Parametry:**
- `name` - pełna nazwa firmy
- `description` - opis działalności
- `url` - strona główna firmy
- `telephone` - numer telefonu (format międzynarodowy)
- `address` - obiekt z adresem (może być częściowo pusty)
- `services` - tablica oferowanych usług (3-5 elementów)

---

### 7. ReviewSchema
**Cel:** Definiuje poszczególne opinie klientów.

```typescript
const reviews = [
  {
    author: "Anna K.",
    rating: 5,
    date: "2025-08-05",
    content: "Wizaro skutecznie usunęło wszystkie negatywne opinie z [PLATFORMA]. Profesjonalna obsługa i szybki rezultat. Polecam!"
  },
  {
    author: "Marek P.", 
    rating: 5,
    date: "2025-08-03",
    content: "Dzięki Wizaro udało się usunąć fałszywy profil firmy z [PLATFORMA]. Bardzo szybko i skutecznie."
  }
];

{reviews.map((review, index) => (
  <ReviewSchema
    key={index}
    author={review.author}
    ratingValue={review.rating}
    reviewBody={review.content}
    datePublished={review.date}
    itemName="Usuwanie opinii z [PLATFORMA] - Wizaro"
    itemUrl="https://wizaro.pl/sciezka-do-strony"
  />
))}
```

**Parametry pojedynczej opinii:**
- `author` - imię i inicjał nazwiska (np. "Anna K.")
- `ratingValue` - ocena 1-5
- `reviewBody` - treść opinii (2-4 zdania)
- `datePublished` - data w formacie "YYYY-MM-DD"
- `itemName` - nazwa ocenianej usługi
- `itemUrl` - URL strony

**WAŻNE:** Liczba opinii musi odpowiadać `reviewCount` w AggregateRatingSchema!

---

## Kompletny przykład implementacji

```typescript
import { Metadata } from 'next';
import TwojaStrona from '../../components/TwojaStrona';
import { 
  ArticleSchema, 
  FAQSchema, 
  AggregateRatingSchema, 
  ProductWithRatingSchema, 
  BreadcrumbSchema, 
  LocalBusinessSchema, 
  ReviewSchema 
} from '@/components/schemas';

export const metadata: Metadata = {
  title: 'Tytuł strony | Wizaro.pl',
  description: 'Opis strony dla meta tagów',
  keywords: 'słowa, kluczowe, oddzielone, przecinkami',
  openGraph: {
    title: 'Tytuł dla social media',
    description: 'Opis dla social media',
    type: 'website',
  },
};

export default function TwojaStronaPage() {
  // 1. Definicja FAQ
  const faqs = [
    {
      question: "Pytanie 1?",
      answer: "Odpowiedź na pytanie 1."
    },
    {
      question: "Pytanie 2?",
      answer: "Odpowiedź na pytanie 2."
    },
    {
      question: "Pytanie 3?",
      answer: "Odpowiedź na pytanie 3."
    },
    {
      question: "Pytanie 4?",
      answer: "Odpowiedź na pytanie 4."
    },
    {
      question: "Pytanie 5?",
      answer: "Odpowiedź na pytanie 5."
    }
  ];

  // 2. Definicja breadcrumbs
  const breadcrumbs = [
    { name: "Strona główna", url: "https://wizaro.pl" },
    { name: "Kategoria", url: "https://wizaro.pl/kategoria" },
    { name: "Podstrona", url: "https://wizaro.pl/kategoria/podstrona" }
  ];

  // 3. Definicja opinii
  const reviews = [
    {
      author: "Jan K.",
      rating: 5,
      date: "2025-10-15",
      content: "Świetna usługa! Wszystko zgodnie z obietnicami. Polecam każdemu."
    },
    {
      author: "Maria P.", 
      rating: 5,
      date: "2025-10-12",
      content: "Profesjonalne podejście i szybka realizacja. Jestem bardzo zadowolona."
    },
    {
      author: "Piotr W.",
      rating: 5,
      date: "2025-10-10", 
      content: "Skuteczna pomoc w trudnej sprawie. Wizaro dotrzymało słowa."
    },
    {
      author: "Anna S.",
      rating: 4,
      date: "2025-10-08",
      content: "Bardzo dobra obsługa. Proces trochę się przedłużył, ale efekt jest."
    }
  ];

  return (
    <>
      {/* JSON-LD Structured Data - WSZYSTKIE SCHEMATY */}
      
      {/* 1. ArticleSchema */}
      <ArticleSchema
        headline="Twój tytuł artykułu - Skuteczne metody 2025"
        description="Pełny opis artykułu dla wyszukiwarek."
        url="https://wizaro.pl/twoja-sciezka"
        keywords={["słowo1", "słowo2", "słowo3", "słowo4"]}
        category="Legal Services"
      />
      
      {/* 2. ProductWithRatingSchema */}
      <ProductWithRatingSchema
        name="Nazwa Twojej Usługi"
        description="Opis usługi - co oferujesz."
        url="https://wizaro.pl/twoja-sciezka"
        ratingValue={4.9}
        reviewCount={4}
      />
      
      {/* 3. AggregateRatingSchema - KLUCZOWY DLA GWIAZDEK */}
      <AggregateRatingSchema
        ratingValue={4.9}
        reviewCount={4}
        itemType="Service"
        itemName="Nazwa Twojej Usługi"
        itemUrl="https://wizaro.pl/twoja-sciezka"
      />
      
      {/* 4. BreadcrumbSchema */}
      <BreadcrumbSchema items={breadcrumbs} />
      
      {/* 5. FAQSchema */}
      <FAQSchema faqs={faqs} />

      {/* 6. LocalBusinessSchema */}
      <LocalBusinessSchema
        name="Wizaro - Nazwa Usługi"
        description="Opis Twojej firmy i usług."
        url="https://wizaro.pl"
        telephone="+48792861513"
        address={{
          streetAddress: "",
          addressLocality: "Miasto",
          addressRegion: "Województwo",
          postalCode: "",
          addressCountry: "PL"
        }}
        services={["Usługa 1", "Usługa 2", "Usługa 3"]}
      />

      {/* 7. ReviewSchema - dla każdej opinii */}
      {reviews.map((review, index) => (
        <ReviewSchema
          key={index}
          author={review.author}
          ratingValue={review.rating}
          reviewBody={review.content}
          datePublished={review.date}
          itemName="Nazwa Twojej Usługi - Wizaro"
          itemUrl="https://wizaro.pl/twoja-sciezka"
        />
      ))}
      
      {/* Twój główny komponent strony */}
      <TwojaStrona />
    </>
  );
}
```

---

## Najczęstsze błędy

### ❌ Błąd 1: Niezgodność liczby opinii
```typescript
// ŹLE - różne liczby
<AggregateRatingSchema reviewCount={156} />
<ProductWithRatingSchema reviewCount={143} />
const reviews = [/* tylko 4 opinie */];

// DOBRZE - wszystko się zgadza
<AggregateRatingSchema reviewCount={4} />
<ProductWithRatingSchema reviewCount={4} />
const reviews = [/* dokładnie 4 opinie */];
```

### ❌ Błąd 2: Brak wymaganych importów
```typescript
// ŹLE - brak importu
<AggregateRatingSchema ... />

// DOBRZE
import { AggregateRatingSchema } from '@/components/schemas';
<AggregateRatingSchema ... />
```

### ❌ Błąd 3: Niepoprawny format URL
```typescript
// ŹLE - relatywny URL
url="/jak-usunac-opinie"

// DOBRZE - pełny URL
url="https://wizaro.pl/jak-usunac-opinie"
```

### ❌ Błąd 4: Niepoprawny format daty
```typescript
// ŹLE
date: "05.08.2025"
date: "August 5, 2025"

// DOBRZE
date: "2025-08-05"  // Format: YYYY-MM-DD
```

### ❌ Błąd 5: Brak breadcrumbs
```typescript
// ŹLE - tylko jedna pozycja
const breadcrumbs = [
  { name: "Aktualna strona", url: "https://..." }
];

// DOBRZE - minimum 2 pozycje
const breadcrumbs = [
  { name: "Strona główna", url: "https://wizaro.pl" },
  { name: "Aktualna strona", url: "https://..." }
];
```

---

## Checklist przed publikacją

- [ ] Wszystkie importy schematów są dodane
- [ ] `reviewCount` jest taki sam w AggregateRatingSchema i ProductWithRatingSchema
- [ ] Liczba elementów w tablicy `reviews` = `reviewCount`
- [ ] Wszystkie URL są pełne (zaczynają się od https://)
- [ ] Daty są w formacie YYYY-MM-DD
- [ ] FAQ ma minimum 3-5 pytań
- [ ] Breadcrumbs ma minimum 2 elementy
- [ ] RatingValue jest między 0-5
- [ ] Wszystkie wymagane parametry są wypełnione

---

## Testowanie

Po implementacji sprawdź schematy używając:
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema.org Validator**: https://validator.schema.org/
3. **Google Search Console** - sekcja "Ulepszenia"

---

## Wsparcie

W razie pytań lub problemów, sprawdź działającą implementację w pliku:
```
src/app/jak-usunac-opinie-z-aleo/page.tsx
```

---

**Data utworzenia:** 8 listopada 2025  
**Wersja:** 1.0  
**Autor:** Wizaro Development Team
