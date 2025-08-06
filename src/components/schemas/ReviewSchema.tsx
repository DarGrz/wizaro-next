// ReviewSchema.tsx - dla pojedynczych opinii (opcjonalne)
import React from 'react';

interface ReviewSchemaProps {
  author: string;
  ratingValue: number;
  reviewBody: string;
  datePublished?: string;
  itemName?: string;
  itemUrl?: string;
}

export default function ReviewSchema({
  author,
  ratingValue,
  reviewBody,
  datePublished = new Date().toISOString(),
  itemName = 'Wizaro - Usuwanie Opinii',
  itemUrl = 'https://wizaro.pl'
}: ReviewSchemaProps) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": author
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": ratingValue,
      "bestRating": 5
    },
    "reviewBody": reviewBody,
    "datePublished": datePublished,
    "itemReviewed": {
      "@type": "Organization",
      "name": itemName,
      "url": itemUrl
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
