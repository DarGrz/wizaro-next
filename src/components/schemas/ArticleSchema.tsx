// ArticleSchema.tsx
import React from 'react';

interface ArticleSchemaProps {
  headline: string;
  description: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  url: string;
  imageUrl?: string;
  category?: string;
  keywords?: string[];
}

export default function ArticleSchema({
  headline,
  description,
  author = "Wizaro",
  datePublished = new Date().toISOString(),
  dateModified = new Date().toISOString(),
  url,
  imageUrl = "https://wizaro.pl/images/wizaro-logo.png",
  category = "Business Services",
  keywords = []
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": author,
      "url": "https://wizaro.pl"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Wizaro",
      "logo": {
        "@type": "ImageObject",
        "url": "https://wizaro.pl/images/wizaro-logo.png"
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified,
    "url": url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "image": {
      "@type": "ImageObject",
      "url": imageUrl
    },
    "articleSection": category,
    "keywords": keywords.join(", "),
    "inLanguage": "pl-PL",
    "about": {
      "@type": "Thing",
      "name": "Usuwanie opinii online",
      "description": "Profesjonalne usługi usuwania negatywnych opinii z platform internetowych"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
