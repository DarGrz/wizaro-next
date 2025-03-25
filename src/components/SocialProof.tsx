'use client';

export default function SocialProof() {
  const reviews = [
    {
      name: "Iwona Malec",
      text: "Szybko, sprawnie i bardzo profesjonalnie. Rozwiązanie pomogło mi skutecznie usunąć nieprawdziwe dane z portalu."
    },
    {
      name: "Radosław Kołodziej",
      text: "Bardzo przejrzysty formularz i błyskawiczna realizacja. Polecam każdemu przedsiębiorcy."
    },
    {
      name: "Lidia Bartosik",
      text: "Nie spodziewałam się, że to będzie aż tak proste. Cały proces zajął mi dosłownie kilka minut."
    },
    {
      name: "Dominik Rzepecki",
      text: "Zdecydowanie warto. Kontakt szybki, wszystko działa jak należy, dokument dobrze przygotowany."
    },
    {
      name: "Izabela Cichoń",
      text: "Zaskakująco skuteczne. Otrzymałam potwierdzenie usunięcia danych po kilku dniach."
    }
  ];

  return (
    <section className=" mx-auto px-4 py-10">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-8">Opinie użytkowników</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {reviews.map((review, idx) => (
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