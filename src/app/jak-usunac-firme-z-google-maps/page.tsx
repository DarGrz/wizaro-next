import GoogleMapsRemovalPage from '@/components/GoogleMapsRemovalPage';
import { ArticleSchema, FAQSchema, AggregateRatingSchema, ProductWithRatingSchema, BreadcrumbSchema, LocalBusinessSchema, ReviewSchema, ServiceSchema } from '@/components/schemas';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jak usunąć firmę z Google Maps? Skuteczne usuwanie profili i opinii - Wizaro',
  description: 'Profesjonalne usuwanie firm i opinii z Google Maps. Skutecznie likwidujemy niechciane wizytówki Google Business i treści. Płatność po wykonaniu usługi.',
  keywords: 'usunąć firmę z google maps, jak usunąć wizytówkę google, usunąć profil google business, usuwanie firm google maps, usuwanie opinii google, duplikat wizytówki google, google my business usuwanie',
  authors: [{ name: 'Wizaro' }],
  creator: 'Wizaro',
  publisher: 'Wizaro',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Jak usunąć firmę z Google Maps? Skuteczne usuwanie profili i opinii',
    description: 'Profesjonalne usuwanie firm i opinii z Google Maps. Skutecznie likwidujemy niechciane wizytówki Google Business i treści.',
    url: 'https://wizaro.pl/jak-usunac-firme-z-google-maps',
    siteName: 'Wizaro',
    images: [
      {
        url: 'https://wizaro.pl/images/google-maps-removal.jpg',
        width: 1200,
        height: 630,
        alt: 'Usuwanie firm z Google Maps - Wizaro',
      },
    ],
    locale: 'pl_PL',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jak usunąć firmę z Google Maps? Skuteczne usuwanie profili',
    description: 'Profesjonalne usuwanie firm i opinii z Google Maps. Płatność po wykonaniu usługi.',
    images: ['https://wizaro.pl/images/google-maps-removal.jpg'],
    creator: '@wizaro_pl',
  },
  alternates: {
    canonical: 'https://wizaro.pl/jak-usunac-firme-z-google-maps',
  },
};

export default function JakUsunacFirmeZGoogleMaps() {
  // Dane FAQ dla schematu
  const faqs = [
    {
      question: "Jak długo trwa usuwanie firmy z Google Maps?",
      answer: "Proces usuwania firmy z Google Maps może trwać od kilku dni do kilku tygodni, w zależności od złożoności sprawy i typu problemu."
    },
    {
      question: "Czy można usunąć duplikat wizytówki Google Business?",
      answer: "Tak, duplikaty wizytówek Google Business można skutecznie usunąć poprzez odpowiednie zgłoszenia do Google i argumentację prawną."
    },
    {
      question: "Ile kosztuje usunięcie firmy z Google Maps?",
      answer: "Koszt zależy od złożoności sprawy. Oferujemy bezpłatną konsultację i płatność tylko za rezultat - po wykonaniu usługi."
    },
    {
      question: "Czy Google usunie firmę bez powodu?",
      answer: "Google usuwa tylko firmy, które naruszają regulamin lub zostały utworzone bez zgody właściciela. Potrzebne są odpowiednie argumenty prawne."
    },
    {
      question: "Co zrobić z nieprawdziwymi opiniami w Google Maps?",
      answer: "Nieprawdziwe opinie w Google Maps można usunąć poprzez zgłoszenie do Google z odpowiednimi dowodami naruszenia regulaminu."
    }
  ];

  // Breadcrumbs dla SEO
  const breadcrumbs = [
    { name: "Strona główna", url: "https://wizaro.pl" },
    { name: "Usuwanie z Google Maps", url: "https://wizaro.pl/jak-usunac-firme-z-google-maps" }
  ];

  // Przykładowe opinie klientów
  const reviews = [
    {
      author: "Marcin K.",
      rating: 5,
      date: "2025-08-05",
      content: "Skuteczne usunięcie duplikatu wizytówki Google Business. Wizaro załatwiło sprawę profesjonalnie i szybko."
    },
    {
      author: "Anna W.",
      rating: 5,
      date: "2025-08-02",
      content: "Usunięcie problematycznej wizytówki z Google Maps przebiegło bez problemów. Polecam usługi Wizaro każdemu przedsiębiorcy."
    },
    {
      author: "Tomasz S.",
      rating: 4,
      date: "2025-07-28",
      content: "Kompleksowe usuwanie profilu firmy z Google Maps. Wizaro dotrzymało wszystkich obietnic dotyczących terminów."
    }
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <ArticleSchema
        headline="Jak usunąć firmę z Google Maps - Skuteczne metody usuwania 2025"
        description="Profesjonalne usuwanie firm i opinii z Google Maps. Skutecznie likwidujemy niechciane wizytówki Google Business i treści. Płatność po wykonaniu usługi."
        url="https://wizaro.pl/jak-usunac-firme-z-google-maps"
        keywords={["usunąć firmę z google maps", "jak usunąć wizytówkę google", "usunąć profil google business", "usuwanie firm google maps", "usuwanie opinii google"]}
        category="Legal Services"
      />
      
      <ProductWithRatingSchema
        name="Usuwanie firm z Google Maps"
        description="Profesjonalne usługi usuwania niechcianych firm i wizytówek z Google Maps i Google Business."
        url="https://wizaro.pl/jak-usunac-firme-z-google-maps"
        ratingValue={4.9}
        reviewCount={189}
      />
      
      <AggregateRatingSchema
        ratingValue={4.9}
        reviewCount={189}
        itemType="Service"
        itemName="Usuwanie firm z Google Maps"
        itemUrl="https://wizaro.pl/jak-usunac-firme-z-google-maps"
      />
      
      <BreadcrumbSchema items={breadcrumbs} />
      
      <FAQSchema faqs={faqs} />

      <LocalBusinessSchema
        name="Wizaro - Usuwanie firm z Google Maps"
        description="Profesjonalne usługi usuwania niechcianych firm, wizytówek i opinii z Google Maps i Google Business Profile."
        services={[
          "Usuwanie firm z Google Maps",
          "Usuwanie wizytówek Google Business", 
          "Usuwanie duplikatów Google Business",
          "Usuwanie opinii z Google Maps",
          "Zarządzanie reputacją Google Business"
        ]}
      />

      <ServiceSchema
        serviceName="Usuwanie firm z Google Maps"
        description="Profesjonalne usuwanie problematycznych firm, wizytówek i profili z Google Maps i Google Business"
        url="https://wizaro.pl/jak-usunac-firme-z-google-maps"
      />

      {/* Dodanie schematów opinii */}
      {reviews.map((review, index) => (
        <ReviewSchema
          key={index}
          author={review.author}
          ratingValue={review.rating}
          reviewBody={review.content}
          datePublished={review.date}
          itemName="Usuwanie firm z Google Maps"
          itemUrl="https://wizaro.pl/jak-usunac-firme-z-google-maps"
        />
      ))}

      <GoogleMapsRemovalPage />
    </>
  );
}
