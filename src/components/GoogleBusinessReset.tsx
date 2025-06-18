"use client";

import Link from "next/link";

export default function GoogleBusinessReset() {
  return (
    <div className="w-full px-4 py-8 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-4 text-[#002a5c]">
        Resetowanie wizytówki Google Business Profile
      </h2>
      
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-2/3">
          <p className="text-gray-700 mb-4">
            Wizytówka Google z negatywnymi opiniami szkodzi wizerunkowi Twojej firmy.
            Oferujemy kompleksowe <strong className="text-[#002a5c]">resetowanie wizytówki Google</strong>, 
            które pozwala usunąć wszystkie negatywne opinie i rozpocząć budowanie reputacji od nowa.
          </p>
          
          <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
            <li><strong>Całkowite usunięcie wszystkich opinii</strong> - zarówno pozytywnych, jak i negatywnych</li>
            <li><strong>Zachowanie pozycji w Google Maps</strong> - Twoja firma nadal będzie widoczna</li>
            <li><strong>Możliwość budowania reputacji od nowa</strong> - czysta karta dla Twojego biznesu</li>
            <li><strong>Profesjonalna realizacja</strong> - szybko i bezpiecznie</li>
          </ul>
          
          <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
            {/* <div className="bg-green-50 px-4 py-2 rounded-md border border-green-100 text-center">
              <p className="text-gray-700">Stała cena:</p>
              <p className="text-2xl font-bold text-[#3EA34B]">2199 zł</p>
              <p className="text-sm text-gray-600">brutto (z VAT 23%)</p>
            </div> */}
            
            <Link href="/formularz-profil-google?reset=true" className="w-full md:w-auto">
              <button className="w-full bg-[#002a5c] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#001e43] transition">
                Zamów resetowanie wizytówki
              </button>
            </Link>
          </div>
        </div>
        
        <div className="w-full md:w-1/3 bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold text-[#002a5c] mb-2">Korzyści</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3EA34B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
              <span>Usunięcie wszystkich negatywnych opinii</span>
            </li>
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3EA34B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
              <span>Zachowanie pozycji w Google Maps</span>
            </li>
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3EA34B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
              <span>Nowy start dla Twojej firmy</span>
            </li>
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3EA34B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
              <span>Skuteczność potwierdzona przez klientów</span>
            </li>
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3EA34B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
              <span>Płatność po wykonaniu usługi</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
