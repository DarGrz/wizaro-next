import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NegativeReviewRemoval = () => {
  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Usuwanie Negatywnych Opinii
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Negatywne opinie mogą znacząco wpłynąć na reputację Twojej firmy i zniechęcić potencjalnych klientów.
                Oferujemy profesjonalną usługę usuwania szkodliwych recenzji z internetu, działając zgodnie z przepisami prawa.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Usuwamy negatywne opinie z Google Maps</li>
                <li>Zajmujemy się recenzjami naruszającymi regulamin</li>
                <li>Zapewniamy szybkie i dyskretne działanie</li>
                <li>Płatność dopiero po skutecznym usunięciu opinii</li>
              </ul>
              <div className="pt-4">
                <Link href="/formularz-opinie">
                  <button className="bg-[#002a5c] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition">
                    Usuń szkodliwą opinię
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex items-center justify-center">
            <div className="relative w-full h-64 md:h-80">
              <Image
                src="/images/review-removal-process.jpg"
                alt="Proces usuwania negatywnych opinii"
                fill
                style={{ objectFit: 'cover', borderRadius: '8px' }}
                quality={90}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NegativeReviewRemoval;
