// ProductWithRatingSchema.tsx - dla stron usług jako "produktów"
import React from 'react';

interface ProductWithRatingSchemaProps {
  name: string;
  description: string;
  image?: string;
  ratingValue?: number;
  reviewCount?: number;
  bestRating?: number;
  price?: string;
  priceCurrency?: string;
  availability?: string;
  url: string;
}

export default function ProductWithRatingSchema({
  name,
  description,
  image = 'https://wizaro.pl/images/wizaro-logo.png',
  ratingValue = 4.9,
  reviewCount = 312,
  bestRating = 5,
  price = 'Na żądanie',
  priceCurrency = 'PLN',
  availability = 'https://schema.org/InStock',
  url
}: ProductWithRatingSchemaProps) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": image,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "reviewCount": reviewCount,
      "bestRating": bestRating
    },
    "offers": {
      "@type": "Offer",
      "url": url,
      "priceCurrency": priceCurrency,
      "price": price,
      "availability": availability,
      "itemCondition": "https://schema.org/NewCondition"
    },
    "brand": {
      "@type": "Organization",
      "name": "Wizaro"
    },
    "category": "Professional Services"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
