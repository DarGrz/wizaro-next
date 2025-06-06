"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function ForWhom() {
  const cards = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#002a5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
      title: "Prowadzisz jednoosobową działalność?",
      description:
        "Pomagamy właścicielom JDG usuwać nieprawdziwe informacje z portali – szybko i legalnie.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#002a5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      title: "Masz spółkę z niechcianymi opiniami?",
      description:
        "Negatywne opinie mogą szkodzić spółce. Skutecznie usuwamy je, dbając o Twoją reputację.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#002a5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <circle cx="12" cy="13" r="3"></circle>
          <line x1="12" y1="8" x2="12" y2="8.01"></line>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
      ),
      title: "Twoja firma pojawiła się na portalu bez zgody?",
      description:
        "Nieautoryzowany profil? Pomożemy Ci go szybko usunąć.",
    },
  ];

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.2 },
    }),
  };

  return (
    <section className="py-8" ref={ref}>
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-2xl font-bold text-gray-900 mb-4"
          initial="hidden"
          animate={controls}
          variants={cardVariants}
          custom={0}
        >
          Dla kogo jest ta usługa?
        </motion.h2>
        <motion.p
          className="text-gray-600 max-w-2xl mx-auto mb-12"
          initial="hidden"
          animate={controls}
          variants={cardVariants}
          custom={0.5}
        >
          Nasze rozwiązania są dostosowane do różnych typów działalności i specyficznych potrzeb każdego klienta.
        </motion.p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
              initial="hidden"
              animate={controls}
              variants={cardVariants}
              custom={i + 1}
            >
              <div className="flex justify-center mb-4 text-[#002a5c]">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
