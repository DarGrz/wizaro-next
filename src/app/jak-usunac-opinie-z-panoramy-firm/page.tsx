import { Metadata } from 'next';
import PanoramaFirmRemovalPage from '../../components/PanoramaFirmRemovalPage';
import { ArticleSchema, FAQSchema, AggregateRatingSchema, ProductWithRatingSchema, BreadcrumbSchema, LocalBusinessSchema, ReviewSchema } from '@/components/schemas';

export const metadata: Metadata = {
  title: 'Jak usunąć opinie z Panoramy Firm? | Usuwanie opinii z Panoramy Firm',
  description: 'Profesjonalne usuwanie opinii i profili z serwisu Panorama Firm. Gwarancja rezultatu, płatność po wykonaniu. Skutecznie usuwamy niechciane treści z Panoramy Firm.',
  keywords: 'usuwanie opinii panorama firm, jak usunąć opinie panorama firm, panorama firm usuwanie, profil panorama firm, opinie panorama firm',
  openGraph: {
    title: 'Jak usunąć opinie z Panoramy Firm? | Usuwanie opinii',
    description: 'Profesjonalne usuwanie opinii z Panoramy Firm. Gwarancja rezultatu.',
    type: 'website',
  },
};

export default function JakUsunacOpinieZPanoramyFirmPage() {
  const faqs = [
    {
      question: "Jak długo trwa usuwanie opinii z Panoramy Firm?",
      answer: "Proces usuwania opinii z Panoramy Firm może trwać od kilku dni do kilku tygodni, w zależności od typu opinii i argumentów prawnych."
    },
    {
      question: "Czy można usunąć wszystkie dane firmy z Panoramy Firm?",
      answer: "Tak, możemy usunąć kompletny profil firmy z Panoramy Firm, włączając w to wszystkie dane firmowe, opinie i oceny."
    },
    {
      question: "Ile kosztuje usuwanie opinii z Panoramy Firm?",
      answer: "Koszt zależy od liczby opinii i złożoności sprawy. Oferujemy bezpłatną konsultację i płatność tylko za rezultat."
    },
    {
      question: "Czy usuwanie opinii z Panoramy Firm jest legalne?",
      answer: "Tak, usuwanie fałszywych lub krzywdzących opinii jest legalne i zgodne z polskim prawem oraz RODO."
    },
    {
      question: "Jak chronić firmę przed negatywnymi opiniami w Panoramie Firm?",
      answer: "Najlepszą ochroną jest aktywne zarządzanie profilem, budowanie pozytywnej reputacji i szybka reakcja na problemy."
    }
  ];

  const breadcrumbs = [
    { name: "Strona główna", url: "https://wizaro.pl" },
    { name: "Usuwanie opinii", url: "https://wizaro.pl/usuwanie-opinii" },
    { name: "Panorama Firm", url: "https://wizaro.pl/jak-usunac-opinie-z-panoramy-firm" }
  ];

  const reviews = [
    {
      author: "Piotr M.",
      rating: 5,
      date: "2025-09-15",
      content: "Wizaro skutecznie usunęło wszystkie negatywne opinie z Panoramy Firm. Profesjonalna obsługa i szybki rezultat. Polecam!"
    },
    {
      author: "Agnieszka W.", 
      rating: 5,
      date: "2025-09-12",
      content: "Dzięki Wizaro udało się usunąć fałszywy profil firmy z Panoramy Firm. Bardzo szybko i skutecznie. Warto skorzystać z ich usług."
    },
    {
      author: "Robert K.",
      rating: 5,
      date: "2025-09-10", 
      content: "Usunięcie negatywnych opinii z Panoramy Firm przebiegło bez problemów. Wizaro dotrzymało wszystkich obietnic. Bardzo profesjonalne podejście."
    },
    {
      author: "Monika S.",
      rating: 4,
      date: "2025-09-08",
      content: "Kompleksowe usuwanie profilu firmy z Panoramy Firm. Wizaro załatwiło wszystko zgodnie z RODO. Polecam każdemu przedsiębiorcy."
    }
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <ArticleSchema
        headline="Jak usunąć opinie z Panoramy Firm - Skuteczne metody usuwania 2025"
        description="Profesjonalne usuwanie opinii i profili z serwisu Panorama Firm. Gwarancja rezultatu, płatność po wykonaniu. Skutecznie usuwamy niechciane treści z Panoramy Firm."
        url="https://wizaro.pl/jak-usunac-opinie-z-panoramy-firm"
        keywords={["usunąć opinie z panoramy firm", "jak usunąć firmę z panoramy firm", "usunąć dane z panoramy firm", "usuwanie profili panorama firm"]}
        category="Legal Services"
      />
      
      <ProductWithRatingSchema
        name="Usuwanie opinii z Panoramy Firm"
        description="Profesjonalne usługi usuwania negatywnych opinii i profili firm z platformy Panorama Firm."
        url="https://wizaro.pl/jak-usunac-opinie-z-panoramy-firm"
        ratingValue={4.9}
        reviewCount={143}
      />
      
      <AggregateRatingSchema
        ratingValue={4.9}
        reviewCount={143}
        itemType="Service"
        itemName="Usuwanie opinii z Panoramy Firm"
        itemUrl="https://wizaro.pl/jak-usunac-opinie-z-panoramy-firm"
      />
      
      <BreadcrumbSchema items={breadcrumbs} />
      
      <FAQSchema faqs={faqs} />

      <LocalBusinessSchema
        name="Wizaro - Usuwanie Opinii z Panoramy Firm"
        description="Profesjonalne usuwanie negatywnych opinii i profili firm z platformy Panorama Firm. Skuteczne metody, zgodność z prawem."
        url="https://wizaro.pl"
        telephone="+48792861513"
        address={{
          streetAddress: "",
          addressLocality: "Polska",
          addressRegion: "Polska",
          postalCode: "",
          addressCountry: "PL"
        }}
        services={["Usuwanie opinii z Panoramy Firm", "Usuwanie profili firm", "Zgodność z RODO"]}
      />

      {reviews.map((review, index) => (
        <ReviewSchema
          key={index}
          author={review.author}
          ratingValue={review.rating}
          reviewBody={review.content}
          datePublished={review.date}
          itemName="Usuwanie opinii z Panoramy Firm - Wizaro"
          itemUrl="https://wizaro.pl/jak-usunac-opinie-z-panoramy-firm"
        />
      ))}
      
      <PanoramaFirmRemovalPage />
    </>
  );
}
