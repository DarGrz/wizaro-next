//UsuniecieNegatywnychOpiniiPage.tsx

"use client";

import BusinessTypeSelector from "./BusinessTypeSelector";
import MobileActionButton from "./MobileActionButton";
import BusinessTypeSelectorMobile from "./BusinessTypeSelectorMobile";
import Link from "next/link";

export default function UsuniecieNegatywnychOpiniiPage() {
  return (
    <div className="min-h-screen mx-auto flex items-center justify-center px-4 flex-col max-w-4xl pt-10">
      {/* Przycisk mobilny */}
      <MobileActionButton />
      
      {/* Główna sekcja z nagłówkiem i selektorem */}
      <div className="gap-6 mb-4 lg:flex hidden md:block">
        <div className="md:p-10 p-4 w-full max-w-lg mt-4 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Usuwanie Fałszywych Opinii - Płatność tylko za rezultat
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Używamy rozwiązań technicznych oraz sporządzamy pisma i wnioski do platform, dbając o pełną poufność i zgodność działań z prawem.
          </p>
        </div>

        <BusinessTypeSelector />
      </div>

      {/* Mobilna wersja selektora */}
      <div className="md:gap-8 pt-5 w-full md:hidden block">
        <BusinessTypeSelectorMobile />
      </div>

      {/* Separator */}
      <div className="w-full max-w-4xl px-4">
        <hr className="border-t border-gray-300 my-8" />
      </div>

      {/* CTA telefoniczne */}
      {/* <div className="flex flex-col items-center gap-2 mt-6 mb-10 shadow-lg rounded-lg p-6">
        <p className="text-center text-gray-700 font-bold">
          Zadzwoń jeśli potrzebujesz pomocy prawnej w sprawach opinii
        </p>
        <Link href="tel:+48792861513" className="mx-auto mt-2">
          <button className="bg-[#5BA155] text-white px-6 py-2 rounded font-semibold hover:bg-[#5BA155] transition">
            +48 792 861 513
          </button>
        </Link>
      </div> */}

      {/* Główny artykuł */}
      <article className="w-full max-w-4xl px-4 py-8">
        <div className="prose prose-lg max-w-none">
          
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Jak działamy?
          </h2>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-[#5BA155] text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Analizujemy treści i identyfikujemy naruszenia</h3>
                  <p className="text-gray-700">Sprawdzamy, które treści naruszają regulaminy platform lub przepisy prawa, oceniając podstawy do działania.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-[#5BA155] text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Przygotowujemy formalne zgłoszenia i dokumenty</h3>
                  <p className="text-gray-700">Sporządzamy profesjonalne wnioski wymagane przez platformy, uwzględniając wszystkie proceduralne wymagania.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-[#5BA155] text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Monitorujemy przebieg postępowania</h3>
                  <p className="text-gray-700">Prowadzimy korespondencję w imieniu klienta i informujemy o rezultatach na każdym etapie procesu.</p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Wpływ niskich ocen na Twój biznes
          </h2>

          <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-gray-100">
            
            {/* Główne statystyki w kartach */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-red-50 rounded-xl p-6 text-center border border-red-100">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="text-3xl font-bold text-red-600 mb-2">87%</div>
                <div className="text-gray-700 text-sm font-medium">sprawdza opinie przed wizytą w firmie</div>
              </div>
              
              <div className="bg-orange-50 rounded-xl p-6 text-center border border-orange-100">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="text-3xl font-bold text-orange-600 mb-2">68%</div>
                <div className="text-gray-700 text-sm font-medium">spadek przychodów przy ocenie 3+ gwiazdki</div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-100">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">10 000 zł</div>
                <div className="text-gray-700 text-sm font-medium">średnie straty miesięczne z oceną &lt; 4.0</div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">12x</div>
                <div className="text-gray-700 text-sm font-medium">większe szanse wyboru z oceną 4.5+ vs 3.5</div>
              </div>
            </div>

            {/* Wykres poziomy z paskami */}
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Poziom zaufania klientów według oceny</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700 flex items-center gap-1 flex-shrink-0">
                    4.5+ <span className="text-yellow-500">⭐</span>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-10 relative">
                    <div className="bg-green-500 h-full rounded-full relative" style={{width: '100%'}}>
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white font-semibold text-sm">100%</span>
                    </div>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm font-medium">Doskonała</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700 flex items-center gap-1 flex-shrink-0">
                    4.1-4.4 <span className="text-yellow-500">⭐</span>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-10 relative">
                    <div className="bg-yellow-500 h-full rounded-full relative" style={{width: '75%'}}>
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white font-semibold text-sm">75%</span>
                    </div>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm font-medium">Dobra</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700 flex items-center gap-1 flex-shrink-0">
                    3.5-4.0 <span className="text-yellow-500">⭐</span>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-10 relative">
                    <div className="bg-orange-500 h-full rounded-full relative" style={{width: '50%'}}>
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white font-semibold text-sm">50%</span>
                    </div>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm font-medium">Średnia</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700 flex items-center gap-1 flex-shrink-0">
                    3.0-3.4 <span className="text-yellow-500">⭐</span>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-10 relative">
                    <div className="bg-red-500 h-full rounded-full relative" style={{width: '30%'}}>
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white font-semibold text-sm hidden sm:block">30%</span>
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white font-semibold text-xs sm:hidden">30%</span>
                    </div>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm font-medium">Słaba</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700 flex items-center gap-1 flex-shrink-0">
                    &lt;3.0 <span className="text-yellow-500">⭐</span>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-10 relative">
                    <div className="bg-red-700 h-full rounded-full relative" style={{width: '15%'}}>
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white font-semibold text-xs">15%</span>
                    </div>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm font-medium">Krytyczna</span>
                  </div>
                </div>
              </div>

              {/* Kluczowa informacja */}
              <div className="mt-8 p-4 bg-white rounded-lg border border-red-200">
                <div className="flex items-start gap-3">
                  <div className="text-red-600 text-lg">💡</div>
                  <div>
                    <p className="font-semibold text-red-800">Kluczowa informacja:</p>
                    <p className="text-gray-700 text-sm">Firmy z oceną poniżej 4.1 gwiazdek tracą ponad 50% potencjalnych klientów jeszcze przed pierwszym kontaktem.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Czas to pieniądz - działaj dziś!</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Im dłużej zwlekasz z reakcją na negatywne opinie, tym większe straty ponosi Twoja firma. 
                Każdy dzień to utraceni klienci, którzy wybierają konkurencję.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-red-50 rounded-xl border border-red-100">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-red-600 mb-2">24h</div>
                <div className="text-gray-700 font-medium">Średni czas reakcji na negatywną opinię</div>
              </div>

              <div className="text-center p-6 bg-orange-50 rounded-xl border border-orange-100">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-orange-600 mb-2">-22</div>
                <div className="text-gray-700 font-medium">Utraconych klientów miesięcznie przez jedną opinię</div>
              </div>

              <div className="text-center p-6 bg-green-50 rounded-xl border border-green-100">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-green-600 mb-2">+40%</div>
                <div className="text-gray-700 font-medium">Wzrost konwersji po poprawie reputacji</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center">
              <h4 className="font-bold text-lg mb-2">� Kluczowa informacja</h4>
              <p className="text-blue-100">
                Firmy, które reagują w ciągu 24h na negatywne opinie, mają 3x większe szanse na zatrzymanie klienta 
                niż te, które czekają tydzień lub dłużej.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Wsparcie w rozwiązaniu problemów z profilem w mapach internetowych
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Oferujemy pomoc prawną i doradztwo w zakresie zgłaszania treści lub danych w serwisach mapowych 
            i katalogach firmowych. Działamy zgodnie z przepisami prawa oraz regulaminami platform, 
            reprezentując klienta w procesie wnioskowania o usunięcie lub korektę informacji.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">Obszary naszego wsparcia:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#5BA155]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Mapy internetowe i katalogi firm
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#5BA155]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Serwisy opinii i recenzji
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#5BA155]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Profile firmowe w platformach społecznościowych
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Przywracanie reputacji profilu firmowego
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Analizujemy treści i oceniamy, które naruszają przepisy lub regulaminy. Przygotowujemy formalne 
            zgłoszenia o ich usunięcie oraz doradzamy w strategii odbudowy reputacji w serwisach opinii, 
            zgodnie z zasadami platform.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Analiza prawna</h3>
              <p className="text-gray-700">Oceniamy, które treści naruszają regulaminy platform lub przepisy prawa, tworząc solidne podstawy do działania.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Strategia odbudowy</h3>
              <p className="text-gray-700">Doradzamy w zakresie długoterminowej strategii budowania pozytywnej reputacji online zgodnie z etyką biznesu.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Dlaczego my?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Łączymy doświadczenie prawne i techniczne, co pozwala skutecznie rozwiązywać sprawy wizerunkowe. 
            Mamy ponad 2000 przeprowadzonych postępowań. Zapewniamy pełną poufność i zgodność z obowiązującymi regulacjami.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Nasze zalety:</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-[#5BA155]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Doświadczenie prawne i techniczne</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-[#5BA155]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Ponad 2000 przeprowadzonych postępowań</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-[#5BA155]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Pełna poufność działań</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-[#5BA155]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Zgodność z obowiązującymi regulacjami</span>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Wybierz platformę, z którą potrzebujesz pomocy
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Link href="/formularz-opinie-google">
              <button className="w-full bg-[#002a5c] text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-800 transition flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google Maps / Google Moja Firma
              </button>
            </Link>
            <Link href="/formularz-opinie">
              <button className="w-full bg-[#002a5c] text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-800 transition flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
                </svg>
                GoWork, ALEO, Panorama Firm
              </button>
            </Link>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Często zadawane pytania
          </h2>

          <div className="space-y-4 mb-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Czy można usunąć każdą negatywną opinię?</h3>
              <p className="text-gray-700">Nie każdą opinię można usunąć. Usuwamy treści, które naruszają regulaminy platform lub przepisy prawa. Uczciwa krytyka jest częścią normalnego funkcjonowania rynku.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Ile czasu zajmuje cały proces?</h3>
              <p className="text-gray-700">Czas zależy od platformy i typu sprawy. Proste przypadki mogą być rozwiązane w kilka dni, bardziej skomplikowane wymagają kilku tygodni. Zawsze informujemy o postępach.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Czy działania są zgodne z prawem?</h3>
              <p className="text-gray-700">Tak, wszystkie nasze działania są w pełni zgodne z polskim prawem, przepisami RODO oraz regulaminami platform. Działamy transparentnie i etycznie.</p>
            </div>
          </div>

          {/* Sekcja z przykładami branżowymi */}
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Przykłady naszych sukcesów
          </h2>

          <div className="space-y-12 mb-8">
            {/* Przypadek Dentysty */}
            <div className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-2xl overflow-hidden shadow-lg border border-blue-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-bl-full opacity-10"></div>
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Gabinet Dentystyczny</h3>
                      <p className="text-blue-600 font-medium">Przychodnia w Warszawie</p>
                    </div>
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Ochrona zdrowia
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="relative">
                    <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-red-400 to-red-600 rounded-full"></div>
                    <div className="pl-6">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-red-600 font-bold text-sm">⚠️</span>
                        </div>
                        <h4 className="font-bold text-red-800">Wyzwanie</h4>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Nieusatysfakcjonowany pacjent pozostawił opinię z nieprawdziwymi zarzutami 
                        o nieprofesjonalnym zachowaniu i nieudanym leczeniu wykonanym w innej placówce.
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                    <div className="pl-6">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-yellow-600 font-bold text-sm">⚡</span>
                        </div>
                        <h4 className="font-bold text-yellow-800">Akcja</h4>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Wykazaliśmy fałszywość zarzutów poprzez dokumentację medyczną i udowodniliśmy 
                        naruszenie regulaminu platformy dotyczące nieprawdziwych informacji.
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-green-400 to-emerald-600 rounded-full"></div>
                    <div className="pl-6">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-green-600 font-bold text-sm">🎯</span>
                        </div>
                        <h4 className="font-bold text-green-800">Rezultat</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <span className="text-2xl mr-2">⭐</span>
                          <span className="font-semibold text-gray-900">3.2 → 4.6 gwiazdek</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="text-2xl mr-2">📈</span>
                          <span className="font-semibold text-gray-900">+40% nowych pacjentów</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="text-2xl mr-2">💼</span>
                          <span className="font-semibold text-gray-900">Pełna odbudowa zaufania</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Przypadek Restauracji */}
            <div className="relative bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-2xl overflow-hidden shadow-lg border border-amber-100">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-br-full opacity-10"></div>
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Restauracja Włoska</h3>
                      <p className="text-amber-600 font-medium">Lokalna gastronomia w Krakowie</p>
                    </div>
                  </div>
                  <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Gastronomia
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="relative">
                    <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-red-400 to-red-600 rounded-full"></div>
                    <div className="pl-6">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-red-600 font-bold text-sm">⚠️</span>
                        </div>
                        <h4 className="font-bold text-red-800">Wyzwanie</h4>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Konkurencyjna restauracja systematycznie publikowała fałszywe opinie 
                        o problemach sanitarnych, używając wulgaryzmów i obraźliwych komentarzy.
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                    <div className="pl-6">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-yellow-600 font-bold text-sm">⚡</span>
                        </div>
                        <h4 className="font-bold text-yellow-800">Akcja</h4>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Przeprowadziliśmy analizę cyfrową wzorców publikacji, wykryliśmy fałszywe konta 
                        i udowodniliśmy manipulację systemami ocen przez konkurencję.
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-green-400 to-emerald-600 rounded-full"></div>
                    <div className="pl-6">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-green-600 font-bold text-sm">🎯</span>
                        </div>
                        <h4 className="font-bold text-green-800">Rezultat</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <span className="text-2xl mr-2">⭐</span>
                          <span className="font-semibold text-gray-900">Przywrócenie oceny 4.3</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="text-2xl mr-2">📈</span>
                          <span className="font-semibold text-gray-900">+60% rezerwacji online</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="text-2xl mr-2">🛡️</span>
                          <span className="font-semibold text-gray-900">Ochrona przed atakami</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Specjalizujemy się w branżach:</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-gray-700">Ochrona zdrowia (dentyści, lekarze)</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-gray-700">Gastronomia (restauracje, kawiarnie)</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-gray-700">Usługi kosmetyczne</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-gray-700">Hotele i noclegi</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-gray-700">Warsztaty samochodowe</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-gray-700">Sklepy i handel</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-gray-700">Usługi budowlane</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-gray-700">Usługi prawne</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-gray-700">I wiele innych...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sekcja z linkami do powiązanych usług */}
          <div className="w-full max-w-4xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Sprawdź nasze inne usługi prawne
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/jak-usunac-firme-z-google-maps" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Wsparcie w rozwiązaniu problemów z profilem firmowym w Google Maps
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-opinie-z-aleo" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Pomoc prawna w sprawach opinii w serwisie Aleo
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-opinie-z-gowork" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Doradztwo w zakresie treści na platformie GoWork
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-opinie-z-panoramy-firm" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Reprezentacja w sprawach z katalogiem Panorama Firm
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </article>

      {/* Dodatkowy CTA na końcu */}
      <div className="w-full max-w-4xl px-4 py-8">
        <div className="bg-[#5BA155] text-white p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">
            Potrzebujesz pomocy prawnej w sprawach opinii online?
          </h3>
          <p className="mb-6">
            Skontaktuj się z nami już dziś i otrzymaj bezpłatną konsultację prawną 
            oraz profesjonalne doradztwo w zakresie ochrony wizerunku w internecie.
          </p>
          <Link href="tel:+48792861513">
            <button className="bg-white text-[#5BA155] px-8 py-3 rounded font-bold text-lg hover:bg-gray-100 transition">
              Zadzwoń: +48 792 861 513
            </button>
          </Link>
        </div>
      </div>

      {/* Końcowy Business Type Selector */}
      <div className="md:flex py-10 md:gap-8 w-full">
        <BusinessTypeSelector />
      </div>

    </div>
  );
}
