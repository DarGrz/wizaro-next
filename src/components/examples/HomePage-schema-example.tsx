// Przykład implementacji schematów na stronie głównej
// src/app/page.tsx

import { LocalBusinessSchema, BreadcrumbSchema } from "@/components/schemas";

export default function HomePage() {
  const breadcrumbs = [
    { name: "Strona główna", url: "https://wizaro.pl" }
  ];

  return (
    <>
      {/* JSON-LD Structured Data dla strony głównej */}
      <LocalBusinessSchema 
        services={[
          "Usuwanie opinii z Google Maps",
          "Usuwanie opinii z Aleo",
          "Usuwanie opinii z GoWork", 
          "Usuwanie opinii z MannequinPL",
          "Usuwanie profili biznesowych",
          "Zarządzanie reputacją online",
          "Usuwanie duplikatów Google My Business"
        ]}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      
      {/* Reszta zawartości strony */}
      <main>
        {/* Twoja istniejąca zawartość */}
      </main>
    </>
  );
}
