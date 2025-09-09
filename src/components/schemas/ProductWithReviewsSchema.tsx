// ProductWithReviewsSchema.tsx - dla produktów/usług z opiniami wewnątrz
import React from 'react';

interface Review {
  author: string;
  rating: number;
  text: string;
  datePublished?: string;
  title?: string;
}

interface ProductWithReviewsSchemaProps {
  name: string;
  description: string;
  image?: string;
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
  price: string;
  priceCurrency?: string;
  availability?: string;
  url: string;
  reviews: Review[];
}

export default function ProductWithReviewsSchema({
  name,
  description,
  image = 'https://wizaro.pl/images/wizaro-logo.png',
  ratingValue,
  reviewCount,
  bestRating = 5,
  worstRating = 1,
  price,
  priceCurrency = 'PLN',
  availability = 'https://schema.org/InStock',
  url,
  reviews
}: ProductWithReviewsSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": image,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue.toString(),
      "reviewCount": reviewCount.toString(),
      "bestRating": bestRating.toString(),
      "worstRating": worstRating.toString()
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
    "category": "Professional Services",
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "datePublished": review.datePublished || new Date().toISOString().split('T')[0],
      "reviewBody": review.text,
      "name": review.title || "Opinia o usłudze",
      "reviewRating": {
        "@type": "Rating",
        "bestRating": bestRating.toString(),
        "ratingValue": review.rating.toString(),
        "worstRating": worstRating.toString()
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
