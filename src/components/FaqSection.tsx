'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | (null)>(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const faqs = [
    {
      question: "Czy usuwanie informacji z internetu jest legalne?",
      answer:
        "Tak. Działamy na podstawie przepisów oraz innych regulacji dotyczących ochrony danych osobowych i wizerunku firmy.",
    },
    {
      question: "Jak długo trwa usunięcie informacji?",
      answer:
        "Większość zgłoszeń realizujemy w ciągu 7–14 dni roboczych. Jeśli nie uda się w ciągu 21 dni – zwracamy pieniądze.",
    },
    {
      question: "Co, jeśli usunięcie informacji się nie powiedzie?",
      answer:
        "W takim przypadku nie ponosisz żadnych kosztów. Rozliczamy się tylko za skutecznie wykonane usługi.",
    },
    {
      question: "Jakie treści można usunąć?",
      answer:
        "Usuwamy dane kontaktowe, profile firm, opinie, artykuły, ogłoszenia i inne treści, które naruszają Twoje prawo do prywatności lub godzą w wizerunek firmy.",
    },
    {
      question: "Czy otrzymam fakturę za usługę?",
      answer: "Tak. Po dokonaniu płatności wystawiamy fakturę VAT.",
    },
    {
      question: "Czy moje dane są bezpieczne?",
      answer:
        "Zdecydowanie tak. Przesyłane dane są szyfrowane, nie udostępniamy ich osobom trzecim, a Twoje zgłoszenie traktujemy poufnie.",
    },
    {
      question: "Jakie metody płatności akceptujecie?",
      answer:
        "Obsługujemy bezpieczne płatności online – przelewy, BLIK, karty płatnicze oraz faktury dla firm.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20  " ref={ref}>
      {/* Rozdzielacz */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-6 rounded-b-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#002a5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </span>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Często zadawane pytania
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-2">
            Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące naszych usług
          </p>
          
          <div className="space-y-4 bg-white rounded-xl md:shadow-sm p-2 divide-y divide-gray-100 ">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className={`pt-4 ${index !== 0 ? 'pt-5' : ''} cursor-pointer transition-all duration-200 ${openIndex === index ? 'pb-4' : ''}`}
                onClick={() => toggleFAQ(index)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className={`flex justify-between items-center ${openIndex === index ? 'text-[#002a5c] font-semibold' : 'text-gray-800'}`}>
                  <h3 className="text-lg pr-6">
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center border ${openIndex === index ? 'border-[#002a5c] bg-[#002a5c] text-white' : 'border-gray-300 text-gray-500'}`}>
                    <span className="text-sm font-medium">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </div>
                </div>
                
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-3"
                  >
                    <p className="text-gray-600">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
