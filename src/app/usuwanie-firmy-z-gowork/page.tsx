import { Metadata } from 'next';
import UsuwanieFirmyZGoworkPage from '../../components/UsuwanieFirmyZGoworkPage';
import { ArticleSchema, FAQSchema, AggregateRatingSchema, ProductWithRatingSchema, BreadcrumbSchema, LocalBusinessSchema, ReviewSchema } from '@/components/schemas';

export const metadata: Metadata = {
  title: 'Usuwanie firmy z GoWork | Jak usunąć profil firmy z GoWork',
  description: 'Profesjonalne usuwanie firmy z GoWork.pl. Jak usunąć konto z GoWork, usuwanie profilu firmy z GoWork. Skuteczne metody usuwania danych firmowych z portalu GoWork.',
  keywords: 'usuwanie firmy z gowork, jak usunąć konto z gowork, jak usunąć profil firmy z gowork, usuwanie profilu firmy z gowork, usunąć firmę z gowork, gowork usuwanie firmy, gowork jak usunąć profil, usunąć dane z gowork',
  openGraph: {
    title: 'Usuwanie firmy z GoWork | Profesjonalne usuwanie profilu firmowego',
    description: 'Skuteczne usuwanie firmy z GoWork.pl. Gwarancja rezultatu.',
    type: 'website',
  },
};

export default function Page() {
  const faqs = [
    {
      question: "Jak długo trwa usuwanie firmy z GoWork?",
      answer: "Proces usuwania profilu firmy z GoWork może trwać od kilku dni do kilku tygodni, w zależności od statusu konta i rodzaju danych."
    },
    {
      question: "Czy można usunąć wszystkie dane firmy z GoWork?",
      answer: "Tak, możemy usunąć kompletny profil firmy z GoWork, włączając w to wszystkie dane firmowe, zdjęcia i informacje kontaktowe."
    },
    {
      question: "Ile kosztuje usuwanie firmy z GoWork?",
      answer: "Koszt zależy od złożoności sprawy i ilości danych do usunięcia. Oferujemy bezpłatną konsultację i płatność tylko za rezultat."
    },
    {
      question: "Czy usuwanie profilu firmy z GoWork jest legalne?",
      answer: "Tak, usuwanie własnego profilu firmy lub nieprawdziwych danych jest legalne i zgodne z polskim prawem oraz RODO."
    },
    {
      question: "Co zrobić, jeśli profil firmy w GoWork został utworzony bez zgody?",
      answer: "Możemy pomóc w usunięciu profilu utworzonego bez zgody właściciela firmy, korzystając z procedur RODO i prawa do zapomnienia."
    }
  ];

  const breadcrumbs = [
    { name: "Strona główna", url: "https://wizaro.pl" },
    { name: "Usuwanie profili", url: "https://wizaro.pl/usuwanie-profili" },
    { name: "GoWork", url: "https://wizaro.pl/usuwanie-firmy-z-gowork" }
  ];

  const reviews = [
    {
      author: "Paweł K.",
      rating: 5,
      date: "2025-08-07",
      content: "Wizaro skutecznie usunęło nasz profil z GoWork, który został utworzony bez naszej zgody. Bardzo profesjonalne podejście!"
    },
    {
      author: "Alicja M.", 
      rating: 5,
      date: "2025-08-05",
      content: "Dzięki Wizaro udało się usunąć kompletnie nasz profil firmy z GoWork. Szybko i skutecznie. Polecam!"
    },
    {
      author: "Robert S.",
      rating: 5,
      date: "2025-08-02", 
      content: "Usunięcie profilu firmy z GoWork przebiegło bez problemów. Wizaro załatwiło wszystko zgodnie z RODO."
    },
    {
      author: "Magdalena W.",
      rating: 4,
      date: "2025-07-30",
      content: "Kompleksowe usuwanie danych z GoWork. Wizaro dotrzymało wszystkich obietnic. Bardzo profesjonalne podejście."
    }
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <ArticleSchema
        headline="Jak usunąć firmę z GoWork - Skuteczne metody usuwania profilu 2025"
        description="Profesjonalne usuwanie profilu firmy z serwisu GoWork. Skutecznie likwidujemy niechciane dane firmowe i profile utworzone bez zgody."
        url="https://wizaro.pl/usuwanie-firmy-z-gowork"
        keywords={["usuwanie firmy z gowork", "jak usunąć konto z gowork", "jak usunąć profil firmy z gowork", "usuwanie profilu firmy z gowork"]}
        category="Legal Services"
      />
      
      <ProductWithRatingSchema
        name="Usuwanie firmy z GoWork"
        description="Profesjonalne usługi usuwania profili firm z platformy GoWork, włączając profile utworzone bez zgody właściciela."
        url="https://wizaro.pl/usuwanie-firmy-z-gowork"
        ratingValue={4.8}
        reviewCount={134}
      />
      
      <AggregateRatingSchema
        ratingValue={4.8}
        reviewCount={134}
        itemType="Service"
        itemName="Usuwanie firmy z GoWork"
        itemUrl="https://wizaro.pl/usuwanie-firmy-z-gowork"
      />
      
      <BreadcrumbSchema items={breadcrumbs} />
      
      <FAQSchema faqs={faqs} />

      <LocalBusinessSchema
        name="Wizaro - Usuwanie Firmy z GoWork"
        description="Profesjonalne usuwanie profili firm z platformy GoWork. Skuteczne metody, zgodność z prawem, usuwanie profili bez zgody."
        url="https://wizaro.pl"
        telephone="+48792861513"
        address={{
          streetAddress: "",
          addressLocality: "Polska",
          addressRegion: "Polska",
          postalCode: "",
          addressCountry: "PL"
        }}
        services={["Usuwanie firmy z GoWork", "Usuwanie profili bez zgody", "Zgodność z RODO"]}
      />

      {reviews.map((review, index) => (
        <ReviewSchema
          key={index}
          author={review.author}
          ratingValue={review.rating}
          reviewBody={review.content}
          datePublished={review.date}
          itemName="Usuwanie firmy z GoWork - Wizaro"
          itemUrl="https://wizaro.pl/usuwanie-firmy-z-gowork"
        />
      ))}
      
      <UsuwanieFirmyZGoworkPage />
    </>
  );
}
