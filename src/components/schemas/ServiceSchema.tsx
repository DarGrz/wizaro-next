// ServiceSchema.tsx
import React from 'react';

interface ServiceSchemaProps {
  serviceName: string;
  description: string;
  provider?: string;
  areaServed?: string;
  serviceType?: string;
  url: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
    availability?: string;
  };
}

export default function ServiceSchema({
  serviceName,
  description,
  provider = "Wizaro",
  areaServed = "Poland",
  serviceType = "Professional Service",
  url,
  offers = {
    price: "Na żądanie",
    priceCurrency: "PLN",
    availability: "https://schema.org/InStock"
  }
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "url": "https://wizaro.pl",
      "telephone": "+48792861513",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+48792861513",
        "contactType": "customer service",
        "availableLanguage": "Polish"
      }
    },
    "areaServed": {
      "@type": "Country", 
      "name": areaServed
    },
    "serviceType": serviceType,
    "url": url,
    "offers": {
      "@type": "Offer",
      "price": offers.price,
      "priceCurrency": offers.priceCurrency,
      "availability": offers.availability,
      "validFrom": new Date().toISOString()
    },
    "category": "Business Services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Usługi zarządzania reputacją online",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Usuwanie negatywnych opinii"
          },
          "price": "500",
          "priceCurrency": "PLN",
          "priceValidUntil": "2025-12-31"
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Zarządzanie profilem biznesowym"
          },
          "price": "800",
          "priceCurrency": "PLN",
          "priceValidUntil": "2025-12-31"
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
