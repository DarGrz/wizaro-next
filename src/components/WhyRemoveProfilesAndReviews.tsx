'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function WhyRemoveProfilesAndReviews() {
  // JSON-LD Schema for Wizaro Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Wizaro - Usuwanie Opinii i Profili",
    "url": "https://wizaro.pl",
    "logo": "https://wizaro.pl/images/wizaro-logo.png",
    "image": "https://wizaro.pl/images/wizaro-logo.png",
    "telephone": "+48792861513",
    "email": "kontakt@wizaro.pl",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PL",
      "addressRegion": "Polska"
    },
    "description": "Profesjonalne usuwanie negatywnych opinii i profili firm z platform internetowych. Skuteczne metody, zgodność z prawem, gwarancja rezultatu.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "bestRating": 5,
      "worstRating": 1,
      "ratingCount": 247,
      "ratingValue": 5.0
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Anna K."
        },
        "datePublished": "2025-08-05T10:30:00+02:00",
        "reviewBody": "Wizaro skutecznie usunęło wszystkie negatywne opinie z Google Maps. Profesjonalna obsługa i szybki rezultat. Polecam!",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 5
        }
      },
      {
        "@type": "Review", 
        "author": {
          "@type": "Person",
          "name": "Marek P."
        },
        "datePublished": "2025-08-03T14:15:00+02:00",
        "reviewBody": "Dzięki Wizaro udało się usunąć profil firmy z Gowork i Aleo. Bardzo szybko i skutecznie. Warto skorzystać z ich usług.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 5
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person", 
          "name": "Katarzyna S."
        },
        "datePublished": "2025-08-01T09:45:00+02:00",
        "reviewBody": "Usunięcie negatywnych opinii z GoWork przebiegło bez problemów. Wizaro dotrzymało wszystkich obietnic. Bardzo profesjonalne podejście.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 5
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Tomasz W."
        },
        "datePublished": "2025-07-29T16:20:00+02:00", 
        "reviewBody": "Kompleksowe usuwanie profilu firmy z kilku platform jednocześnie. Wizaro załatwiło wszystko zgodnie z RODO. Polecam każdemu przedsiębiorcy.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 5
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Joanna M."
        },
        "datePublished": "2025-07-27T11:10:00+02:00",
        "reviewBody": "Wizytówka Google restauracji została usunięta szybko i zgodnie z ustaleniami!",
        "reviewRating": {
          "@type": "Rating", 
          "ratingValue": 5
        }
      }
    ],
    "serviceArea": {
      "@type": "Country",
      "name": "Polska"
    },
    "areaServed": "PL"
  };
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const reasonItems = [
    {
      title: "Ochrona reputacji firmy",
      description: "Negatywne opinie, nawet nieprawdziwe, mogą na długo zaszkodzić wizerunkowi Twojej firmy i zniechęcić potencjalnych klientów.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#002a5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      )
    },
    {
      title: "Kontrola nad danymi",
      description: "Usunięcie profilu firmy daje Ci kontrolę nad tym, jakie informacje są publicznie dostępne na Twój temat w sieci.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#002a5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          <circle cx="12" cy="16" r="1"></circle>
        </svg>
      )
    },
    {
      title: "Ochrona przed konkurencją",
      description: "Nieprawdziwe profile mogą być wykorzystywane przez konkurencję do wprowadzania klientów w błąd lub pozyskiwania poufnych informacji.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#002a5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      )
    },
    {
      title: "Zgodność z RODO",
      description: "Usunięcie nieaktualnych danych firmowych pomaga w zachowaniu zgodności z przepisami o ochronie danych osobowych.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#002a5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    },
    {
      title: "Poprawa wyników wyszukiwania",
      description: "Usunięcie negatywnych opinii i nieprawidłowych profili poprawia widoczność Twojej firmy w wynikach wyszukiwania.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#002a5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      )
    },
    {
      title: "Nowy początek",
      description: "Usunięcie starych danych daje możliwość zbudowania nowego, lepszego wizerunku firmy, szczególnie po rebrandingu.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#002a5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      )
    }
  ];

  return (
    <>
      {/* JSON-LD Structured Data for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      
      <div className="w-full">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeIn}
        className="w-full"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Dlaczego warto usuwać profile i opinie?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Dbanie o wizerunek firmy online jest kluczowym elementem sukcesu w dzisiejszym cyfrowym świecie. 
            Oto powody, dla których warto rozważyć usunięcie negatywnych opinii i nieaktualnych profili.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasonItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <div className="mb-4 text-[#002a5c]">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-25 text-center md:shadow-md rounded-lg bg-white md:p-10 text-lg">
          <p className="text-[#5BA155] font-medium">
            Nie pozwól, aby niepożądane treści w sieci szkodziły Twojej firmie.
             Skontaktuj się z nami i rozpocznij proces usuwania nieaktualnych informacji już dziś.
          </p>
        
        </div>
      </motion.div>
    </div>
    </>
  );
}
