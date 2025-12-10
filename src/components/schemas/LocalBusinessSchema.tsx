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
  name = "Wizaro - Ochrona Wizerunku Online",
  description = "Profesjonalne usługi ochrony wizerunku online. Skuteczne metody zgodne.",
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
      "name": "Usługi ochrony wizerunku online",
      "itemListElement": services.map((service) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service
        },
        "price": "500",
        "priceCurrency": "PLN",
        "priceValidUntil": "2025-12-31"
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
