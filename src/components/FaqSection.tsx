'use client';

import { useState } from "react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | (null)>(0);

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
        "W takim przypadku oferujemy 100% zwrot pieniędzy. Działamy według zasady: skuteczność albo zwrot.",
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
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-900 mb-10 text-center">
          Często zadawane pytania
        </h2>
        <div className="space-y-4 md:min-w-4xl min-w-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b pb-3 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-md font-medium text-gray-800 flex justify-between items-center">
                {faq.question}
                <span className="ml-4 text-gray-500 text-md">
                  {openIndex === index ? "−" : "+"}
                </span>
              </h3>
              {openIndex === index && (
                <p className="text-gray-600 mt-2 transition-opacity duration-300">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
