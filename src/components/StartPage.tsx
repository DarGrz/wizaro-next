//StartPage.tsx

'use client';

import BusinessTypeSelector from './BusinessTypeSelector';
import ExplenationStartPage from './ExplenationStartPage';
import SocialProof from './SocialProof';

export default function StartPage() {
  



  return (
    <div className="min-h-screen mx-auto flex items-center justify-center px-4 flex-col max-w-4xl pt-20">
      <div className="gap-6 mb-6 lg:flex">
        <div className="p-10 w-full max-w-lg md:border-e border-gray-200 md:border-b brder">
          <h1 className="text-3xl font-semibold text-center text-gray-900 mb-4">
            Pomagamy chronić wizerunek Twojej firmy
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Szybko pozbędziesz się informacji o swojej firmie. Bez zbędnych
            komplikacji, w pełni legalnie i dyskretnie. Wystarczy wypełnić
            prosty formularz, resztą zajmie się system.
          </p>
        </div>
        {/* <div className="bg-white rounded-xl shadow-md p-10 w-full max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
            Jaki masz rodzaj działalności?
          </h2>
          <p className="text-gray-600 text-center mb-8">Wybierz aby przejsć dalej</p>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleChoice('jdg')}
              className="w-full bg-[#002a5c] text-white py-2 rounded hover:bg-[#001e47] transition"
            >
              Jednoosobowa działalność
            </button>
            <button
              onClick={() => handleChoice('spolka')}
              className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition"
            >
              Spółka
            </button>
          </div>
        </div> */}
            <BusinessTypeSelector />
      </div>

     
        <div className="md:flex py-10 md:gap-8 ">
           <ExplenationStartPage />
        </div>
        <div className="md:flex py-10 md:gap-8 ">
           <SocialProof />
        </div>
    </div>
  );
}
