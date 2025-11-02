// Centralny katalog produktów/usług dostępnych w aplikacji.
// Ten plik może być wykorzystywany zarówno przez stronę produktową, jak i API.

export type Pricing =
  | { type: 'fixed'; price: number; currency: 'PLN' | 'EUR'; unit?: string }
  | { type: 'subscription'; price: number; currency: 'PLN' | 'EUR'; interval: 'month' | 'year' }
  | { type: 'quote' };

export type Product = {
  id: string; // stabilny identyfikator (slug)
  name: string;
  shortDescription: string;
  description?: string;
  categories: string[];
  pricing: Pricing;
  availability: 'inStock' | 'preorder' | 'backorder' | 'discontinued';
  sku?: string;
  tags?: string[];
  deliveryEstimate?: string; // np. "2-7 dni roboczych"
  image?: string; // ścieżka do obrazka z public/
  urls: {
    details: string; // wewnętrzny adres strony opisowej/usługi
    buy?: string; // jeżeli istnieje dedykowany flow zakupu/checkout
  };
};

export const PRODUCTS: Product[] = [
  {
    id: 'usuwanie-opinii-google',
    name: 'Usunięcie opinii Google',
    shortDescription:
      'Usuwanie pojedynczych opinii naruszających wytyczne – analiza, zgłoszenie i eskalacja.',
    categories: ['Opinie', 'Google Maps'],
    pricing: { type: 'fixed', price: 299, currency: 'PLN', unit: 'opinia' },
    availability: 'inStock',
    tags: ['google-maps', 'opinie', 'moderacja'],
    deliveryEstimate: 'Zwykle 3–14 dni (zależnie od sprawy)',
    image: '/images/products/google-reviews-removal.jpg',
    urls: { details: '/formularz-opinie-google' },
  },
  {
    id: 'usuwanie-falszywych-opinii-google',
    name: 'Usuwanie fałszywych opinii Google',
    shortDescription:
      'Identyfikacja i usuwanie fałszywych opinii naruszających wytyczne platformy.',
    categories: ['Opinie', 'Google Maps'],
    pricing: { type: 'quote' },
    availability: 'inStock',
    tags: ['fałszywe-opinie', 'zgłoszenia'],
    deliveryEstimate: 'Zwykle 3–14 dni',
    image: '/images/products/fake-reviews-removal.jpg',
    urls: { details: '/usuwanie-falszywych-opinii' },
  },
  {
    id: 'usuwanie-falszywych-opinii-gowork',
    name: 'Usuwanie fałszywych opinii GoWork',
    shortDescription: 'Wsparcie w usuwaniu naruszeń regulaminu i ochronie marki na GoWork.',
    categories: ['Opinie', 'GoWork'],
    pricing: { type: 'quote' },
    availability: 'inStock',
    tags: ['gowork', 'moderacja'],
    image: '/images/products/gowork-reviews-removal.jpg',
    urls: { details: '/usuwanie-falszywych-opinii-gowork' },
  },
  {
    id: 'usuwanie-wizytowki-google',
    name: 'Usunięcie wizytówki Google',
    shortDescription: 'Wsparcie w zamknięciu/ukryciu wizytówki lub usunięciu profilu naruszającego prawo.',
    categories: ['Google Maps', 'Wizytówka'],
    pricing: { type: 'fixed', price: 1299, currency: 'PLN' },
    availability: 'inStock',
    tags: ['wizytówka', 'gmb'],
    image: '/images/products/remove-business-gmb.jpg',
    urls: { details: '/formularz-profil-google' },
  },
  {
    id: 'resetowanie-wizytowki-google',
    name: 'Resetowanie/Reinstatement wizytówki Google',
    shortDescription: 'Przywracanie zawieszonej wizytówki (reinstatement), kompletacja dowodów i odwołań.',
    categories: ['Google Maps', 'Wizytówka'],
    pricing: { type: 'fixed', price: 2199, currency: 'PLN' },
    availability: 'inStock',
    tags: ['reinstatement', 'odwołania'],
    image: '/images/products/gmb-reinstatement.jpg',
    urls: { details: '/formularz-profil-google?reset=true' },
  },
  {
    id: 'ochrona-firmy',
    name: 'Ochrona firmy (monitoring i reakcja)',
    shortDescription:
      'Stały monitoring opinii i profili + szybkie zgłoszenia naruszeń (pakiet miesięczny).',
    categories: ['Ochrona', 'Monitoring'],
    pricing: { type: 'quote' },
    availability: 'inStock',
    tags: ['monitoring', 'alerty', 'moderacja'],
    image: '/images/products/brand-protection.jpg',
    urls: { details: '/ochrona-v3' },
  },
  {
    id: 'usuwanie-profilu-gowork-bez-zgody',
    name: 'Usunięcie profilu GoWork bez zgody',
    shortDescription: 'Pomoc w usunięciu profilu firmy opublikowanego bez zgody.',
    categories: ['GoWork', 'Profil'],
    pricing: { type: 'quote' },
    availability: 'inStock',
    image: '/images/products/remove-gowork-profile.jpg',
    urls: { details: '/profil-bez-zgody-gowork' },
  },
  {
    id: 'usuniecie-profilu-z-bazy',
    name: 'Usunięcie profilu firmy z bazy',
    shortDescription: 'Usunięcie profilu z katalogów (Aleo, GoWork, Panorama Firm, Biznes Finder, PKT.pl, Podobne Firmy, Puls Biznesu).',
    categories: ['Katalogi', 'RODO'],
    pricing: { type: 'fixed', price: 699, currency: 'PLN', unit: 'profil' },
    availability: 'inStock',
    tags: ['Aleo', 'GoWork', 'Panorama Firm', 'Biznes Finder', 'PKT.pl', 'Podobne Firmy', 'Puls Biznesu'],
    image: '/images/products/remove-directories-profile.jpg',
    urls: { details: '/formularz-profil-bazy' },
  },
  // Warianty per-portal (wszędzie ta sama cena 699 PLN / profil)
  {
    id: 'usuniecie-profilu-aleo',
    name: 'Usunięcie profilu Aleo',
    shortDescription: 'Usunięcie profilu firmy z katalogu Aleo.',
    categories: ['Katalogi', 'Profil'],
    pricing: { type: 'fixed', price: 699, currency: 'PLN', unit: 'profil' },
    availability: 'inStock',
    tags: ['Aleo'],
    urls: { details: '/formularz-profil-bazy' },
  },
  {
    id: 'usuniecie-profilu-gowork',
    name: 'Usunięcie profilu GoWork',
    shortDescription: 'Usunięcie profilu firmy z serwisu GoWork.',
    categories: ['Katalogi', 'Profil'],
    pricing: { type: 'fixed', price: 699, currency: 'PLN', unit: 'profil' },
    availability: 'inStock',
    tags: ['GoWork'],
    urls: { details: '/formularz-profil-bazy' },
  },
  {
    id: 'usuniecie-profilu-panorama-firm',
    name: 'Usunięcie profilu Panorama Firm',
    shortDescription: 'Usunięcie profilu firmy z katalogu Panorama Firm.',
    categories: ['Katalogi', 'Profil'],
    pricing: { type: 'fixed', price: 699, currency: 'PLN', unit: 'profil' },
    availability: 'inStock',
    tags: ['Panorama Firm'],
    urls: { details: '/formularz-profil-bazy' },
  },
  {
    id: 'usuniecie-profilu-biznes-finder',
    name: 'Usunięcie profilu Biznes Finder',
    shortDescription: 'Usunięcie profilu firmy z katalogu Biznes Finder.',
    categories: ['Katalogi', 'Profil'],
    pricing: { type: 'fixed', price: 699, currency: 'PLN', unit: 'profil' },
    availability: 'inStock',
    tags: ['Biznes Finder'],
    urls: { details: '/formularz-profil-bazy' },
  },
  {
    id: 'usuniecie-profilu-pkt-pl',
    name: 'Usunięcie profilu PKT.pl',
    shortDescription: 'Usunięcie profilu firmy z katalogu PKT.pl.',
    categories: ['Katalogi', 'Profil'],
    pricing: { type: 'fixed', price: 699, currency: 'PLN', unit: 'profil' },
    availability: 'inStock',
    tags: ['PKT.pl'],
    urls: { details: '/formularz-profil-bazy' },
  },
  {
    id: 'usuniecie-profilu-podobne-firmy',
    name: 'Usunięcie profilu Podobne Firmy',
    shortDescription: 'Usunięcie profilu firmy z serwisu Podobne Firmy.',
    categories: ['Katalogi', 'Profil'],
    pricing: { type: 'fixed', price: 699, currency: 'PLN', unit: 'profil' },
    availability: 'inStock',
    tags: ['Podobne Firmy'],
    urls: { details: '/formularz-profil-bazy' },
  },
  {
    id: 'usuniecie-profilu-puls-biznesu',
    name: 'Usunięcie profilu Puls Biznesu',
    shortDescription: 'Usunięcie profilu firmy z serwisu Puls Biznesu.',
    categories: ['Katalogi', 'Profil'],
    pricing: { type: 'fixed', price: 699, currency: 'PLN', unit: 'profil' },
    availability: 'inStock',
    tags: ['Puls Biznesu'],
    urls: { details: '/formularz-profil-bazy' },
  },
  {
    id: 'usuwanie-danych-panorama-firm',
    name: 'Usuwanie danych z Panoramy Firm',
    shortDescription: 'Wniosek i egzekucja usunięcia danych z katalogu Panoramy Firm.',
    categories: ['RODO', 'Katalogi'],
    pricing: { type: 'quote' },
    availability: 'inStock',
    image: '/images/products/remove-panorama-firm.jpg',
    urls: { details: '/usuwanie-panorama-firm-dane' },
  },
  {
    id: 'usuwanie-powielonych-profili-gmb',
    name: 'Usuwanie powielonych profili Google My Business',
    shortDescription: 'Scalanie/usuwanie duplikatów wizytówek i porządkowanie profilu.',
    categories: ['Google Maps', 'Wizytówka'],
    pricing: { type: 'quote' },
    availability: 'inStock',
    image: '/images/products/merge-duplicate-gmb.jpg',
    urls: { details: '/usuwanie-powtarzajacych-sie-profili-google-my-business' },
  },
  {
    id: 'wniosek-rodo',
    name: 'Wniosek RODO – usunięcie/kopia danych',
    shortDescription: 'Przygotowanie formalnego wniosku RODO i wsparcie w egzekwowaniu.',
    categories: ['RODO'],
    pricing: { type: 'quote' },
    availability: 'inStock',
    image: '/images/products/rodo-request.jpg',
    urls: { details: '/wniosek-rodo' },
  },
  {
    id: 'ocena-firmy-google-maps',
    name: 'Raport oceny firmy (Google Maps)',
    shortDescription: 'Audyt profilu i rekomendacje poprawy widoczności oraz wizerunku.',
    categories: ['Raport', 'Google Maps'],
    pricing: { type: 'quote' },
    availability: 'inStock',
    image: '/images/products/gmb-audit.jpg',
    urls: { details: '/ocena-firmy-google-maps' },
  },
];

// Pomocnicze: mapowanie na JSON-LD (OfferCatalog/Product) dla SEO oraz integracji automatycznych
export function toOfferCatalogJsonLd(baseUrl: string) {
  const itemListElement = PRODUCTS.map((p, index) => {
    const url = new URL(p.urls.details, baseUrl).toString();
    const offers =
      p.pricing.type === 'fixed'
        ? {
            '@type': 'Offer',
            price: p.pricing.price,
            priceCurrency: p.pricing.currency,
            availability: 'https://schema.org/InStock',
            url,
          }
        : p.pricing.type === 'subscription'
        ? {
            '@type': 'Offer',
            price: p.pricing.price,
            priceCurrency: p.pricing.currency,
            eligibleDuration: p.pricing.interval,
            availability: 'https://schema.org/InStock',
            url,
          }
        : undefined; // type: 'quote' -> celowo pomijamy offers

    return {
      '@type': 'ListItem',
      position: index + 1,
      url,
      item: {
        '@type': 'Product',
        name: p.name,
        description: p.shortDescription,
        image: p.image ? new URL(p.image, baseUrl).toString() : undefined,
        sku: p.sku,
        category: p.categories.join(', '),
        offers,
      },
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Wizaro – Katalog usług',
    url: baseUrl.replace(/\/$/, '') + '/produkty',
    itemListElement,
  };
}
