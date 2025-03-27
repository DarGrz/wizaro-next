'use client';

import { useEffect, useState } from 'react';

export default function SocialProof() {
  const reviews = [
    { name: "Iwona Malec", text: "Szybko, sprawnie i bardzo profesjonalnie. Rozwiązanie pomogło mi skutecznie usunąć nieprawdziwe dane z portalu." },
    { name: "Radosław Kołodziej", text: "Bardzo przejrzysty formularz i błyskawiczna realizacja. Polecam każdemu przedsiębiorcy." },
    { name: "Lidia Bartosik", text: "Nie spodziewałam się, że to będzie aż tak proste. Cały proces zajął mi dosłownie kilka minut." },
    { name: "Dominik Rzepecki", text: "Zdecydowanie warto. Kontakt szybki, wszystko działa jak należy, dokument dobrze przygotowany." },
    { name: "Izabela Cichoń", text: "Zaskakująco skuteczne. Otrzymałam potwierdzenie usunięcia danych po kilku dniach." },
    { name: "Kamil Nowak", text: "Profesjonalna obsługa i szybki efekt. Dziękuję!" },
    { name: "Ewelina Duda", text: "Formularz jest bardzo intuicyjny, a cały proces przebiegł bezproblemowo." },
    { name: "Tomasz Brzoza", text: "Polecam! Dokument gotowy w kilka sekund, sprawa załatwiona." },
    { name: "Magdalena Urban", text: "Nie musiałam niczego tłumaczyć – wszystko działa automatycznie." },
    { name: "Marcin Krawczyk", text: "Byłem sceptyczny, ale naprawdę działa. Usunięcie danych przebiegło pomyślnie." },
    { name: "Agnieszka Lis", text: "Polecam każdemu, kto chce szybko i skutecznie usunąć dane." },
    { name: "Sebastian Zając", text: "Bez stresu, bez formalności. Wszystko załatwione online." },
    { name: "Paulina Mazur", text: "Skuteczność na najwyższym poziomie. Super narzędzie!" },
    { name: "Artur Rogalski", text: "Dokument przygotowany od razu po wypełnieniu formularza. Mega!" },
    { name: "Joanna Kalinowska", text: "Pozytywnie zaskoczona efektem. Dziękuję!" },
    { name: "Grzegorz Wilk", text: "Bardzo szybki kontakt i pomocna obsługa." },
    { name: "Karolina Czech", text: "Całość zajęła mi mniej niż 5 minut. Rewelacja." },
    { name: "Piotr Sadowski", text: "Pomogło mi to w trudnej sytuacji. Naprawdę działa!" },
    { name: "Marta Michalska", text: "Dziękuję za szybką reakcję. Polecam każdemu." },
    { name: "Adrian Nowiński", text: "Łatwe, szybkie i skuteczne. Tak powinno to wyglądać." },
    { name: "Beata Tomczak", text: "Prosty sposób na usunięcie niechcianych danych." },
    { name: "Łukasz Dziedzic", text: "Nie sądziłem, że to takie proste. Świetna robota!" },
    { name: "Natalia Janowska", text: "Jestem bardzo zadowolona z efektów." },
    { name: "Kacper Maj", text: "Zdecydowanie polecam! Wszystko zrobione szybko i sprawnie." },
    { name: "Klaudia Pawlik", text: "Super podejście do użytkownika, pełen profesjonalizm." },
    { name: "Bartosz Leśniak", text: "Po kilku dniach miałem potwierdzenie usunięcia danych. Działa!" },
    { name: "Weronika Sroka", text: "Bardzo przejrzysty i skuteczny proces." },
    { name: "Marek Ratajczak", text: "Bez zbędnych formalności, wszystko online. Polecam." },
    { name: "Emilia Olszewska", text: "Nie spodziewałam się, że to będzie takie szybkie!" },
    { name: "Daniel Zawadzki", text: "Świetna pomoc i błyskawiczny rezultat." },
    { name: "Sylwia Górska", text: "Wypełniłam formularz, dostałam dokument – prościej się nie da." },
    { name: "Krzysztof Walczak", text: "Na początku nie wierzyłem, ale rzeczywiście działa!" },
    { name: "Aneta Ławniczak", text: "Dzięki temu odzyskałam spokój." },
    { name: "Maciej Kulesza", text: "Proces całkowicie zautomatyzowany i intuicyjny." },
    { name: "Patrycja Kubik", text: "Dobrze przygotowany dokument, wszystko jasno opisane." },
  ];

  const [randomReviews, setRandomReviews] = useState<typeof reviews>([]);

  useEffect(() => {
    const shuffled = [...reviews].sort(() => 0.5 - Math.random());
    setRandomReviews(shuffled.slice(0,6));
  }, []);

  if (randomReviews.length === 0) return null;

  return (
    <section className="mx-auto px-md-4 py-10">
      <h2 className="text-lg font-semibold text-center text-gray-800 mb-8">Opinie użytkowników</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {randomReviews.map((review, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-[#002a5c]">
                {review.name[0]}
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                <div className="flex text-yellow-500 text-xs">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-700">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
