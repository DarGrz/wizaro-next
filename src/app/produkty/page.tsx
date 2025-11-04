import Link from 'next/link';
import { headers } from 'next/headers';
import { Metadata } from 'next';
import { PRODUCTS, toOfferCatalogJsonLd } from '@/app/constants/products';

export const metadata: Metadata = {
  title: 'Produkty i usługi – Wizaro',
  description:
    'Kompletny katalog usług Wizaro: usuwanie negatywnych i fałszywych opinii, reinstatement wizytówki Google, ochrona marki i wnioski RODO.',
  openGraph: {
    title: 'Produkty i usługi – Wizaro',
    description:
      'Przegląd usług: Google Maps, GoWork, RODO i ochrona firmy. Integracja z automatycznymi agentami dzięki wbudowanemu API.',
    type: 'website',
  },
  alternates: {
    canonical: '/produkty',
  },
};

// Prosty neutralny kafelek SVG zamiast obrazów/znaków towarowych
function SvgTile({ title, subtitle, colors }: { title: string; subtitle?: string; colors: [string, string] }) {
  const [c1, c2] = colors;
  const gid = `g-${Math.abs((title + (subtitle || '') + c1 + c2).split('').reduce((a, c) => a + c.charCodeAt(0), 0))}`;

  return (
    <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      <rect width="640" height="360" rx="16" fill={`url(#${gid})`} />
      <g>
        <text x="32" y="210" fill="#ffffff" fontSize="28" fontWeight="600">
          {title}
        </text>
        {subtitle ? (
          <text x="32" y="244" fill="#E5E7EB" fontSize="18" fontWeight="500">
            {subtitle}
          </text>
        ) : null}
      </g>
      <g opacity="0.12">
        <circle cx="560" cy="80" r="56" fill="#ffffff" />
        <circle cx="600" cy="300" r="28" fill="#ffffff" />
        <circle cx="80" cy="60" r="24" fill="#ffffff" />
      </g>
    </svg>
  );
}

function getPaletteForProduct(p: { id: string; tags?: string[]; categories?: string[] }) : [string, string] {
  const id = p.id.toLowerCase();
  const tags = (p.tags || []).map(t => t.toLowerCase());
  const cats = (p.categories || []).map(c => c.toLowerCase());

  const has = (...needles: string[]) => {
    return needles.some(n => id.includes(n) || tags.some(t => t.includes(n)) || cats.some(c => c.includes(n)));
  };

  // Palety inspirowane neutralnymi kolorami (bez użycia logo)
  if (has('google', 'gmb', 'google maps')) return ['#1D4ED8', '#10B981'];      // blue -> green
  if (has('gowork')) return ['#D97706', '#B45309'];                             // amber shades
  if (has('aleo')) return ['#0EA5A4', '#0369A1'];                               // teal -> sky
  if (has('panorama')) return ['#6D28D9', '#3B82F6'];                           // violet -> blue
  if (has('biznes finder', 'finder')) return ['#06B6D4', '#2563EB'];            // cyan -> blue
  if (has('pkt')) return ['#111827', '#374151'];                                // gray 900 -> 700
  if (has('podobne')) return ['#059669', '#0E7490'];                            // emerald -> cyan
  if (has('puls', 'biznesu')) return ['#DC2626', '#EA580C'];                    // red -> orange

  // Domyślne neutralne
  const defaults: [string, string][] = [
    ['#0D2959', '#163B78'],
    ['#0F766E', '#0EA5A4'],
    ['#1F2937', '#374151'],
    ['#3F2E8C', '#6D28D9'],
  ];
  const i = Math.abs(Array.from(p.id).reduce((a, c) => a + c.charCodeAt(0), 0)) % defaults.length;
  return defaults[i];
}

function getPortalChip(p: { id: string; name: string; tags?: string[] }) : string | null {
  // Pokaż chip tylko dla wariantów per-portal (pojedynczy tag rozpoznawczy)
  if (p.id === 'usuniecie-profilu-z-bazy') return null;
  const tag = (p.tags || []).length === 1 ? (p.tags as string[])[0] : null;
  if (!tag) return null;
  // Zabezpieczenie formatowania
  return tag.length > 24 ? tag.slice(0, 24) + '…' : tag;
}

async function getBaseUrl() {
  try {
    const h = await headers();
    const proto = h.get('x-forwarded-proto') || 'https';
    const host = h.get('x-forwarded-host') || h.get('host') || 'wizaro.pl';
    return `${proto}://${host}`;
  } catch {
    // Fallback do domeny produkcyjnej jeśli nagłówki są niedostępne w RSC
    return 'https://wizaro.pl';
  }
}

export default async function ProduktyPage() {
  const baseUrl = await getBaseUrl();
  const jsonLd = toOfferCatalogJsonLd(baseUrl);

  // FAQ (obszerne, edukacyjne i sprzedażowe)
  const faqItems = [
    {
      q: 'Dla kogo jest Wizaro i z jakimi problemami pomagamy?',
      a:
        'Wspieramy właścicieli firm, marketerów i kancelarie w trzech obszarach: usuwanie fałszywych i naruszających regulaminy opinii, przywracanie (reinstatement) wizytówki Google oraz ochrona marki i danych (RODO). Jeśli Twoja reputacja online ucierpiała lub potrzebujesz poukładanego procesu z gwarancją rozliczenia za efekt — jesteś w dobrym miejscu.'
    },
    {
      q: 'Czy usuwanie opinii jest legalne?',
      a:
        'Tak — usuwamy wyłącznie treści, które łamią regulaminy serwisów lub przepisy prawa (np. zniesławienie, bezprawne przetwarzanie danych, brak związku z transakcją). Działamy w oparciu o ścieżki odwoławcze, regulaminy platform i RODO. Nie „znikamy” uczciwej krytyki — pomagamy, gdy opinia jest nieuczciwa lub bezprawna.'
    },
    {
      q: 'Na jakich portalach działacie?',
      a:
        'Najczęściej pracujemy z Google (Opinie Google/Google Maps), GoWork, Aleo, Panorama Firm i podobnymi katalogami. Jeśli nie widzisz swojego serwisu na liście — opisz sprawę w formularzu kontaktowym; doradzimy i zaproponujemy właściwą ścieżkę.'
    },
    {
      q: 'Jak wygląda proces krok po kroku?',
      a:
        '1) Krótki audyt i kwalifikacja sprawy, 2) Wybór właściwego produktu/usługi, 3) Zgromadzenie materiału dowodowego i pełnomocnictw (jeśli są wymagane), 4) Złożenie skutecznego wniosku/odwołania, 5) Monitoring i eskalacja, 6) Raport i rozliczenie. Całość prowadzimy przejrzyście i asynchronicznie — większość spraw da się obsłużyć zdalnie.'
    },
    {
      q: 'Ile to trwa i od czego zależy termin?',
      a:
        'Proste przypadki zamykamy nawet w 3–7 dni roboczych. Sprawy wymagające dodatkowych wniosków lub eskalacji potrafią trwać 2–6 tygodni. Czas zależy od reakcji platformy, kompletności dokumentów i złożoności naruszenia.'
    },
    {
      q: 'Jak rozliczacie skuteczność i co jeśli się nie uda?',
      a:
        'Przy usługach „za efekt” płacisz tylko za skuteczne usunięcia lub przywrócenie. Jeśli dana pozycja nie kwalifikuje się lub platforma odmawia mimo wyczerpania ścieżek — nie ponosisz kosztu tej pozycji. Warunki są jasno opisane w ofercie i podsumowaniu zamówienia.'
    },
    {
      q: 'Czy oferujecie stałą ochronę i monitoring opinii?',
      a:
        'Tak — abonamenty ochronne obejmują monitoring nowych opinii, szybkie reagowanie, przygotowane szablony odpowiedzi i regularne raporty. Dzięki temu reputacja nie „płonie”, tylko jest proaktywnie zarządzana.'
    },
    {
      q: 'Czy możecie przywrócić zawieszoną wizytówkę Google?',
      a:
        'Tak, wspieramy w reinstatement — analizujemy przyczynę zawieszenia, kompletujemy dokumenty i prowadzimy odwołanie do skutku w ramach przyjętej ścieżki. W wielu przypadkach udaje się przywrócić profil i odzyskać widoczność lokalną.'
    },
    {
      q: 'Jakie dane i dostępy są potrzebne?',
      a:
        'Najczęściej wystarczą linki do profili/opinii i podstawowe informacje o zdarzeniu. W przypadku reinstatement lub żądań RODO możemy poprosić o skany dokumentów firmy, pełnomocnictwo lub dostęp operatora (np. użytkownik zaproszony z ograniczonymi uprawnieniami). Zawsze te potrzeby minimalizujemy.'
    },
    {
      q: 'Czy działacie zgodnie z RODO i czy podpisujecie NDA?',
      a:
        'Tak. Przetwarzamy tylko niezbędny zakres danych i usuwamy je po zakończeniu procesu zgodnie z polityką retencji. Na życzenie podpisujemy NDA. Szczegóły znajdziesz w naszej Polityce Prywatności i Regulaminie.'
    },
    {
      q: 'Jakie są formy płatności i fakturowanie?',
      a:
        'Obsługujemy płatności online i tradycyjne przelewy. Wystawiamy faktury VAT. Przy stałej współpracy możliwe są rozliczenia cykliczne i faktury zbiorcze. W wyjątkowych sytuacjach dopuszczamy płatność etapami.'
    },
    {
      q: 'Czy pomagacie także „pozytywnie” — w pozyskiwaniu opinii?',
      a:
        'Tak — doradzamy jak legalnie i etycznie zwiększyć liczbę pozytywnych opinii (np. automatyzacja zaproszeń po zakończonej usłudze, edukacja zespołu, ujednolicony proces feedbacku). Nie tworzymy sztucznych recenzji.'
    },
    {
      q: 'Czy obsługujecie firmy spoza Polski?',
      a:
        'Tak — pracujemy dla klientów z UE i UK. Zgłoszenia w języku angielskim i polskim, w razie potrzeby angażujemy tłumacza przysięgłego.'
    },
    {
      q: 'Jakie są ograniczenia — kiedy nie podejmiecie zlecenia?',
      a:
        'Nie podejmujemy się działań sprzecznych z prawem, regulaminami i etyką. Nie usuwamy uczciwych, rzeczowych opinii będących wynikiem realnej transakcji. Nie „pompowujemy” fałszywych pozytywnych recenzji.'
    },
    {
      q: 'Czy macie case studies i referencje?',
      a:
        'Tak — na prezentacji usług znajdziesz anonimowe studia przypadków z metrykami skuteczności. Na życzenie, po NDA, możemy pokazać szersze portfolio prac.'
    },
    {
      q: 'Jak szybko możemy zacząć?',
      a:
        'Zwykle tego samego lub następnego dnia roboczego po akceptacji zakresu. Zaczynamy od krótkiej kwalifikacji, żebyś nie tracił czasu i pieniędzy na działania bez szans na efekt.'
    },
    {
      q: 'Czy macie wsparcie prawne?',
      a:
        'Tak — w sprawach wymagających opinii prawnej lub reprezentacji współpracujemy z kancelariami partnerskimi. Dzięki temu łączymy szybkość działań operacyjnych z bezpieczeństwem prawnym.'
    },
    {
      q: 'Czy udostępniacie API lub integracje dla partnerów?',
      a:
        'Tak — katalog produktów jest dostępny w formacie JSON, a wybrane procesy można integrować (np. zgłoszenia, statusy). To ułatwia tworzenie automatyzacji i pracy asynchronicznej.'
    },
    {
      q: 'Jak zacząć — pierwszy krok?',
      a:
        'Wyślij krótkie zgłoszenie z linkami do problematycznych treści lub opisz zawieszenie wizytówki. Odpowiemy z rekomendacją i wyceną. Chcesz przyspieszyć? Zarezerwuj od razu termin konsultacji.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  } as const;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Produkty i usługi</h1>
        <p className="mt-3 text-base text-gray-600">
          Katalog usług Wizaro związanych z Google Maps, GoWork, ochroną wizerunku.
        </p>
        <div className="mt-4 text-sm hiddden">
          <Link href="/api/products" className="text-blue-600 hover:text-blue-700 underline">
            Zobacz API katalogu produktów (JSON)
          </Link>
        </div>
      </section>

      

      <section>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <li key={p.id} className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-50">
                {/* Price badge overlay */}
                <div className="pointer-events-none absolute left-2 top-2 z-10 inline-flex items-center gap-1 rounded-full bg-black/80 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                  {p.pricing.type === 'fixed' ? (
                    <>
                      <span>{p.pricing.price.toLocaleString('pl-PL')}</span>
                      <span>{p.pricing.currency}</span>
                      {p.pricing.unit ? <span className="text-white/80">/{p.pricing.unit}</span> : null}
                    </>
                  ) : p.pricing.type === 'subscription' ? (
                    <>
                      <span>{p.pricing.price.toLocaleString('pl-PL')}</span>
                      <span>{p.pricing.currency}/{p.pricing.interval === 'month' ? 'mies.' : 'rok'}</span>
                    </>
                  ) : (
                    <span>Wycena</span>
                  )}
                </div>
                {/* Portal chip overlay (right) */}
                {getPortalChip(p) && (
                  <div className="pointer-events-none absolute right-2 top-2 z-10 inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-900 shadow-sm">
                    {getPortalChip(p)}
                  </div>
                )}
                <SvgTile title={p.name} subtitle={p.categories.join(' • ')} colors={getPaletteForProduct(p)} />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-gray-900">
                <Link href={p.urls.details} className="hover:underline">
                  {p.name}
                </Link>
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-gray-600">{p.shortDescription}</p>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {p.categories.join(' • ')}
                </div>
                <div className="text-sm font-medium text-gray-800">
                  {p.pricing.type === 'fixed' && (
                    <span>
                      {p.pricing.price.toLocaleString('pl-PL')} {p.pricing.currency}
                      {p.pricing.unit ? `/${p.pricing.unit}` : ''}
                    </span>
                  )}
                  {p.pricing.type === 'subscription' && (
                    <span>
                      {p.pricing.price.toLocaleString('pl-PL')} {p.pricing.currency}/
                      {p.pricing.interval === 'month' ? 'mies.' : 'rok'}
                    </span>
                  )}
                  {p.pricing.type === 'quote' && <span>Wycena indywidualna</span>}
                </div>
              </div>

              <div className="mt-4">
                <Link
                  href={p.urls.details}
                  className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
                >
                  Szczegóły
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ sekcja */}
      <section aria-labelledby="faq-heading" className="mt-16">
        <div className="max-w-3xl">
          <h2 id="faq-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">FAQ — pytania i odpowiedzi</h2>
          <p className="mt-3 text-gray-600">
            Poniżej znajdziesz najczęstsze pytania klientów. Zebraliśmy konkretne odpowiedzi, aby ułatwić Ci podjęcie decyzji i szybko ruszyć z działaniami.
          </p>
        </div>

        <div className="mt-8 divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          {faqItems.map((item, idx) => (
            <details key={idx} className="group p-6 open:bg-gray-50">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <span className="text-base font-semibold text-gray-900">{item.q}</span>
                <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition group-open:rotate-45">+</span>
              </summary>
              <div className="mt-3 text-gray-700">
                <p className="leading-relaxed">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p>
            Masz inne pytanie? Skontaktuj się z nami — odpowiemy w ciągu 24h i zaproponujemy najkrótszą ścieżkę działania.
          </p>
          <div className="mt-3">
            <Link href="/kontakt" className="inline-flex items-center rounded-lg bg-black px-4 py-2 font-medium text-white hover:bg-gray-900">
              Porozmawiajmy
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD dla wyszukiwarek i automatycznych integracji */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}
