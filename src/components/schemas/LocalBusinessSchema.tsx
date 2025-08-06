// LocalBusinessSchema.tsx
import React from 'react';

interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
  url?: string;
  telephone?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  services?: string[];
}

export default function LocalBusinessSchema({
  name = "Wizaro - Usuwanie Opinii",
  description = "Profesjonalne usługi usuwania negatywnych opinii z Google Maps, Aleo, GoWork i innych platform. Skuteczne metody zgodne z RODO.",
  url = "https://wizaro.pl",
  telephone = "+48792861513",
  address = {
    streetAddress: "",
    addressLocality: "Warszawa", 
    addressRegion: "Mazowieckie",
    postalCode: "",
    addressCountry: "PL"
  },
  services = [
    "Usuwanie opinii z Google Maps",
    "Usuwanie opinii z Aleo", 
    "Usuwanie opinii z GoWork",
    "Usuwanie profili biznesowych",
    "Zarządzanie reputacją online"
  ]
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": name,
    "description": description,
    "url": url,
    "telephone": telephone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      "postalCode": address.postalCode,
      "addressCountry": address.addressCountry
    },
    "serviceArea": {
      "@type": "Country",
      "name": "Poland"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Usługi usuwania opinii",
      "itemListElement": services.map((service) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service
        }
      }))
    },
    "areaServed": {
      "@type": "Country",
      "name": "Poland"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": telephone,
      "contactType": "customer service",
      "availableLanguage": "Polish"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
