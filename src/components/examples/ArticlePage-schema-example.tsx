// Przykład implementacji schematów dla artykułu o usługach
// Można użyć w komponentach typu AleoRemovalPage.tsx

import { ArticleSchema, ServiceSchema, BreadcrumbSchema, FAQSchema } from "../schemas";

export function ExampleSchemaImplementation() {
  const breadcrumbs = [
    { name: "Strona główna", url: "https://wizaro.pl" },
    { name: "Usuwanie opinii", url: "https://wizaro.pl/usuwanie-opinii" },
    { name: "Aleo", url: "https://wizaro.pl/falsze-opinie-aleo-usuwanie" }
  ];

  const faqs = [
    {
      question: "Jak długo trwa usuwanie opinii z Aleo?",
      answer: "Proces może trwać od kilku dni do kilku tygodni, w zależności od złożoności sprawy."
    },
    {
      question: "Czy mogę usunąć każdą negatywną opinię?",
      answer: "Można usuwać opinie fałszywe, naruszające regulamin lub zawierające nieprawdziwe informacje. Uczciwa krytyka jest chroniona."
    }
  ];

  return (
    <>
      {/* Schematy strukturalne */}
      <ArticleSchema
        headline="Usuwanie fałszywych opinii z Aleo - Profesjonalne usługi"
        description="Skuteczne usuwanie negatywnych i fałszywych opinii z serwisu Aleo. Gwarancja rezultatu, zgodność z RODO."
        url="https://wizaro.pl/falsze-opinie-aleo-usuwanie" 
        keywords={["usuwanie opinii aleo", "fałszywe opinie", "negatywne recenzje", "reputacja online"]}
      />
      
      <ServiceSchema
        serviceName="Usuwanie opinii z Aleo"
        description="Profesjonalne usuwanie problematycznych opinii z platformy Aleo"
        url="https://wizaro.pl/falsze-opinie-aleo-usuwanie"
      />
      
      <BreadcrumbSchema items={breadcrumbs} />
      
      <FAQSchema faqs={faqs} />
      
      {/* Reszta komponentu */}
    </>
  );
}
