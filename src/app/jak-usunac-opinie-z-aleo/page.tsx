import AleoRemovalPage from '@/components/AleoRemovalPage';
import { ArticleSchema, FAQSchema, AggregateRatingSchema, ProductWithRatingSchema, BreadcrumbSchema, LocalBusinessSchema, ReviewSchema } from '@/components/schemas';

export const metadata = {
  title: 'Jak usunąć opinie z Aleo? Skuteczne usuwanie profili i opinii z Aleo - Wizaro.pl',
  description: 'Profesjonalne usuwanie opinii i profili firm z serwisu Aleo. Skutecznie likwidujemy niechciane treści i dane firmowe. Płatność po wykonaniu usługi.',
  keywords: 'usunąć opinie z aleo, jak usunąć firmę z aleo, usunąć dane z aleo, usuwanie profili aleo, usuwanie opinii aleo',
  openGraph: {
    title: 'Jak usunąć opinie z Aleo? Skuteczne usuwanie profili i opinii',
    description: 'Profesjonalne usuwanie opinii i profili firm z serwisu Aleo. Skutecznie likwidujemy niechciane treści i dane firmowe.',
  },
};

export default function JakUsunacOpinieZAleo() {
  const faqs = [
    {
      question: "Jak długo trwa usuwanie opinii z Aleo?",
      answer: "Proces usuwania opinii z Aleo może trwać od kilku dni do kilku tygodni, w zależności od typu opinii i argumentów prawnych."
    },
    {
      question: "Czy można usunąć wszystkie dane firmy z Aleo?",
      answer: "Tak, możemy usunąć kompletny profil firmy z Aleo, włączając w to wszystkie dane firmowe, opinie i oceny."
    },
    {
      question: "Ile kosztuje usuwanie opinii z Aleo?",
      answer: "Koszt zależy od liczby opinii i złożoności sprawy. Oferujemy bezpłatną konsultację i płatność tylko za rezultat."
    },
    {
      question: "Czy usuwanie opinii z Aleo jest legalne?",
      answer: "Tak, usuwanie fałszywych lub krzywdzących opinii jest legalne i zgodne z polskim prawem oraz RODO."
    },
    {
      question: "Jak chronić firmę przed negatywnymi opiniami w Aleo?",
      answer: "Najlepszą ochroną jest aktywne zarządzanie profilem, budowanie pozytywnej reputacji i szybka reakcja na problemy."
    }
  ];

  const breadcrumbs = [
    { name: "Strona główna", url: "https://wizaro.pl" },
    { name: "Usuwanie opinii", url: "https://wizaro.pl/usuwanie-opinii" },
    { name: "Aleo", url: "https://wizaro.pl/jak-usunac-opinie-z-aleo" }
  ];

  const reviews = [
    {
      author: "Anna K.",
      rating: 5,
      date: "2025-08-05",
      content: "Wizaro skutecznie usunęło wszystkie negatywne opinie z Aleo. Profesjonalna obsługa i szybki rezultat. Polecam!"
    },
    {
      author: "Marek P.", 
      rating: 5,
      date: "2025-08-03",
      content: "Dzięki Wizaro udało się usunąć fałszywy profil firmy z Aleo. Bardzo szybko i skutecznie. Warto skorzystać z ich usług."
    },
    {
      author: "Katarzyna S.",
      rating: 5,
      date: "2025-08-01", 
      content: "Usunięcie negatywnych opinii z Aleo przebiegło bez problemów. Wizaro dotrzymało wszystkich obietnic. Bardzo profesjonalne podejście."
    },
    {
      author: "Tomasz W.",
      rating: 4,
      date: "2025-07-29",
      content: "Kompleksowe usuwanie profilu firmy z Aleo. Wizaro załatwiło wszystko zgodnie z RODO. Polecam każdemu przedsiębiorcy."
    }
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <ArticleSchema
        headline="Jak usunąć opinie z Aleo - Skuteczne metody usuwania 2025"
        description="Profesjonalne usuwanie opinii i profili firm z serwisu Aleo. Skutecznie likwidujemy niechciane treści i dane firmowe. Płatność po wykonaniu usługi."
        url="https://wizaro.pl/jak-usunac-opinie-z-aleo"
        keywords={["usunąć opinie z aleo", "jak usunąć firmę z aleo", "usunąć dane z aleo", "usuwanie profili aleo"]}
        category="Legal Services"
      />
      
      <ProductWithRatingSchema
        name="Usuwanie opinii z Aleo"
        description="Profesjonalne usługi usuwania negatywnych opinii i profili firm z platformy Aleo."
        url="https://wizaro.pl/jak-usunac-opinie-z-aleo"
        ratingValue={4.9}
        reviewCount={156}
      />
      
      <AggregateRatingSchema
        ratingValue={4.9}
        reviewCount={156}
        itemType="Service"
        itemName="Usuwanie opinii z Aleo"
        itemUrl="https://wizaro.pl/jak-usunac-opinie-z-aleo"
      />
      
      <BreadcrumbSchema items={breadcrumbs} />
      
      <FAQSchema faqs={faqs} />

      <LocalBusinessSchema
        name="Wizaro - Usuwanie Opinii z Aleo"
        description="Profesjonalne usuwanie negatywnych opinii i profili firm z platformy Aleo. Skuteczne metody, zgodność z prawem."
        url="https://wizaro.pl"
        telephone="+48792861513"
        address={{
          streetAddress: "",
          addressLocality: "Polska",
          addressRegion: "Polska",
          postalCode: "",
          addressCountry: "PL"
        }}
        services={["Usuwanie opinii z Aleo", "Usuwanie profili firm", "Zgodność z RODO"]}
      />

      {reviews.map((review, index) => (
        <ReviewSchema
          key={index}
          author={review.author}
          ratingValue={review.rating}
          reviewBody={review.content}
          datePublished={review.date}
          itemName="Usuwanie opinii z Aleo - Wizaro"
          itemUrl="https://wizaro.pl/jak-usunac-opinie-z-aleo"
        />
      ))}
      
      <AleoRemovalPage />
    </>
  );
}
