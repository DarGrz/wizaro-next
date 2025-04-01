"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function ForWhom() {
  const cards = [
    {
      title: "Prowadzisz jednoosobową działalność?",
      description:
        "Pomagamy właścicielom JDG usuwać nieprawdziwe informacje z portali – szybko i legalnie.",
    },
    {
      title: "Masz spółkę z niechcianymi opiniami?",
      description:
        "Negatywne opinie mogą szkodzić spółce. Skutecznie usuwamy je, dbając o Twoją reputację.",
    },
    {
      title: "Twoja firma pojawiła się na na portalu z opiniami bez zgody?",
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
    <section className="py-2" ref={ref}>
      <div className="max-w-6xl mx-auto  text-center">
        <motion.h2
          className="text-lg font-semibold text-gray-900 mb-12"
          initial="hidden"
          animate={controls}
          variants={cardVariants}
          custom={0}
        >
          Dla kogo jest ta usługa?
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className=" rounded- p-6 shadow text-left hover:shadow-lg transition"
              initial="hidden"
              animate={controls}
              variants={cardVariants}
              custom={i + 1}
            >
              <h3 className="text-md font-semibold text-gray-900 mb-2">
                {card.title}
              </h3>
              <p className="text-[#0D2959] text-sm">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
