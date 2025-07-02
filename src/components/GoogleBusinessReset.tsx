"use client";

import Link from "next/link";

export default function GoogleBusinessReset() {
  return (
    <div className="w-full px-4 py-8 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Ikona Resetowania */}
        <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#5BA155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
            <path d="M3 21v-5h5"/>
          </svg>
        </div>

        {/* Treść */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Resetowanie Wizytówki Google
          </h2>
          <p className="text-gray-600 mb-4">
            Wizytówka Google z negatywnymi opiniami szkodzi wizerunkowi Twojej firmy.
            Oferujemy kompleksowe <strong className="text-[#002a5c]">resetowanie wizytówki Google</strong>, 
            które pozwala usunąć wszystkie negatywne opinie i rozpocząć budowanie reputacji od nowa.
          </p>
          
          <ul className="mb-4 space-y-2">
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#5BA155]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">Całkowite usunięcie wszystkich opinii</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#5BA155]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">Zachowanie pozycji w Google Maps</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#5BA155]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">Możliwość budowania reputacji od nowa</span>
            </li>
          </ul>
          
          <Link href="/formularz-profil-google?reset=true" className="w-full md:w-auto block">
            <button className="px-6 py-3 bg-[#002a5c] text-white rounded-md font-semibold hover:bg-[#001e47] transition w-full md:w-auto">
              Resetowanie Wizytówki Google
            </button>
          </Link>
        </div>
      </div>
      
      
    </div>
  );
}
