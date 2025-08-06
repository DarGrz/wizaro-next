// AggregateRatingSchema.tsx
import React from 'react';

interface AggregateRatingSchemaProps {
  ratingValue?: number;
  reviewCount?: number;
  bestRating?: number;
  worstRating?: number;
  itemType?: 'Organization' | 'Product' | 'Service';
  itemName?: string;
  itemUrl?: string;
  itemImage?: string;
}

export default function AggregateRatingSchema({
  ratingValue = 4.9,
  reviewCount = 312,
  bestRating = 5,
  worstRating = 1,
  itemType = 'Organization',
  itemName = 'Wizaro - Ochrona Wizerunku Online',
  itemUrl = 'https://wizaro.pl',
  itemImage = 'https://wizaro.pl/images/wizaro-logo.png'
}: AggregateRatingSchemaProps) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "AggregateRating",
    "ratingValue": ratingValue.toString(),
    "reviewCount": reviewCount.toString(),
    "bestRating": bestRating,
    "worstRating": worstRating,
    "itemReviewed": {
      "@type": itemType,
      "name": itemName,
      "url": itemUrl,
      ...(itemImage && itemType !== 'Organization' && { "image": itemImage })
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
