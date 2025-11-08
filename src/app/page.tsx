import StartPage from "@/components/StartPage";
import { ArticleSchema, FAQSchema, AggregateRatingSchema, ProductWithRatingSchema, BreadcrumbSchema, LocalBusinessSchema, ReviewSchema } from '@/components/schemas';

export const metadata = {
  title: 'Wizaro.pl - Ochrona Wizerunku Online | Usuwanie Opinii z Internetu',
  description: 'Wizaro.pl to usługi ochrony wizerunku w sieci - usuwania opinii i profili z katalogów firmowych. Zgłoś się do nas, aby usunąć swoje dane z Map Google, Gowork, Aleo, Panorama firm i PKT.pl.',
  keywords: 'ochrona wizerunku, usuwanie opinii, usuwanie danych z internetu, usuwanie firmy z Google, usuwanie wizytówek Google, usuwanie danych z katalogów, GoWork, Aleo, Panorama Firm, PKT.pl',
  openGraph: {
    title: 'Wizaro.pl - Ochrona Wizerunku Online',
    description: 'Usuwamy szkodliwe opinie z internetu. Szybko i dyskretnie usuniemy informacje o Twojej firmie – legalnie i bez zbędnych komplikacji.',
    type: 'website',
  },
};

export default function Home() {
  const faqs = [
    {
      question: "Jak długo trwa usuwanie opinii z internetu?",
      answer: "Proces usuwania opinii może trwać od kilku dni do kilku tygodni, w zależności od platformy i typu opinii. Działamy szybko i skutecznie."
    },
    {
      question: "Czy usuwanie opinii jest legalne?",
      answer: "Tak, usuwanie fałszywych, krzywdzących lub naruszających RODO opinii jest w pełni legalne i zgodne z polskim prawem."
    },
    {
      question: "Z jakich platform usuwacie opinie?",
      answer: "Usuwamy opinie z Google Maps, Aleo, GoWork, Panoramy Firm, PKT.pl i wielu innych platform internetowych."
    },
    {
      question: "Ile kosztuje usuwanie opinii?",
      answer: "Koszt zależy od liczby opinii i złożoności sprawy. Oferujemy bezpłatną konsultację i płatność tylko za efekt."
    },
    {
      question: "Czy mogę usunąć kompletny profil firmy z internetu?",
      answer: "Tak, możemy usunąć kompletne profile firmowe z różnych platform, włączając wszystkie dane i opinie."
    }
  ];

  const breadcrumbs = [
    { name: "Strona główna", url: "https://wizaro.pl" }
  ];

  const reviews = [
    {
      author: "Marcin D.",
      rating: 5,
      date: "2025-11-05",
      content: "Wizaro skutecznie usunęło wszystkie negatywne opinie z Google Maps. Profesjonalna obsługa, szybki rezultat. Polecam każdemu przedsiębiorcy!"
    },
    {
      author: "Joanna K.", 
      rating: 5,
      date: "2025-11-03",
      content: "Kompleksowa pomoc w usunięciu fałszywych opinii z kilku platform. Wizaro załatwiło wszystko zgodnie z RODO. Bardzo profesjonalne podejście."
    },
    {
      author: "Adam P.",
      rating: 5,
      date: "2025-11-01", 
      content: "Dzięki Wizaro udało się usunąć profil firmy z Aleo i GoWork. Bardzo szybko i skutecznie. Warto skorzystać z ich usług."
    },
    {
      author: "Katarzyna M.",
      rating: 5,
      date: "2025-10-28",
      content: "Usunięcie negatywnych opinii przebiegło bez problemów. Wizaro dotrzymało wszystkich obietnic. Polecam!"
    },
    {
      author: "Tomasz S.",
      rating: 5,
      date: "2025-10-25",
      content: "Skuteczna ochrona wizerunku online. Wizaro pomogło mi oczyścić reputację firmy w internecie. Bardzo dobra obsługa klienta."
    }
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <ArticleSchema
        headline="Ochrona wizerunku online - Usuwanie opinii z internetu 2025"
        description="Wizaro.pl - Profesjonalne usuwanie opinii i profili z katalogów firmowych. Usuwamy dane z Google Maps, Aleo, GoWork, Panoramy Firm i innych platform."
        url="https://wizaro.pl"
        keywords={["ochrona wizerunku", "usuwanie opinii", "usuwanie danych z internetu", "usuwanie firmy z Google", "usuwanie opinii Google"]}
        category="Legal Services"
      />
      
      <ProductWithRatingSchema
        name="Ochrona wizerunku online - Wizaro.pl"
        description="Profesjonalne usługi ochrony wizerunku w sieci - usuwanie opinii i profili firm z platform internetowych."
        url="https://wizaro.pl"
        ratingValue={4.9}
        reviewCount={2183}
      />
      
      <AggregateRatingSchema
        ratingValue={4.9}
        reviewCount={2183}
        itemType="Service"
        itemName="Ochrona wizerunku online - Wizaro.pl"
        itemUrl="https://wizaro.pl"
      />
      
      <BreadcrumbSchema items={breadcrumbs} />
      
      <FAQSchema faqs={faqs} />

      <LocalBusinessSchema
        name="Wizaro.pl - Ochrona Wizerunku Online"
        description="Profesjonalne usuwanie negatywnych opinii i profili firm z platform internetowych. Skuteczne metody, zgodność z prawem."
        url="https://wizaro.pl"
        telephone="+48792861513"
        address={{
          streetAddress: "",
          addressLocality: "Kraków",
          addressRegion: "Małopolska",
          postalCode: "31-636",
          addressCountry: "PL"
        }}
        services={["Usuwanie opinii z Google", "Usuwanie profili firm", "Ochrona wizerunku online", "Usuwanie danych z Aleo", "Usuwanie danych z GoWork", "Zgodność z RODO"]}
      />

      {reviews.map((review, index) => (
        <ReviewSchema
          key={index}
          author={review.author}
          ratingValue={review.rating}
          reviewBody={review.content}
          datePublished={review.date}
          itemName="Ochrona wizerunku online - Wizaro.pl"
          itemUrl="https://wizaro.pl"
        />
      ))}
      
      <div>
        <StartPage />
      </div>
    </>
  );
}
 