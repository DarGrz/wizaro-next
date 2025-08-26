//PomocZAleoPage.tsx

"use client";

import BusinessTypeSelector from "./BusinessTypeSelector";
import MobileActionButton from "./MobileActionButton";
import BusinessTypeSelectorReviews from "./BusinessTypeSelectorReviews";
import BusinessTypeSelectorCTA from "./BusinessTypeSelectorCTA";
import Link from "next/link";
import GuaranteeSection from "./GuaranteeSection";

export default function PomocZAleoPage() {
  return (
    <div className="min-h-screen mx-auto flex items-center justify-center px-2 flex-col max-w-4xl pt-10">
      {/* Przycisk mobilny */}
      <MobileActionButton />
      
      {/* Główna sekcja z nagłówkiem i selektorem */}
      <div className="gap-6 mb-4 lg:flex hidden md:block">
        <div className="md:p-10 p-4 w-full max-w-lg mt-4 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Pomoc z ALEO.com - Profesjonalne Wsparcie
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Specjalizujemy się w sprawach dotyczących serwisu ALEO.com. Oferujemy pomoc prawną zgodną z przepisami prawa i regulaminami platformy.
          </p>
        </div>

        <BusinessTypeSelector />
      </div>

      {/* Mobilna wersja selektora */}
      <div className="md:gap-8 pt-5 w-full md:hidden block">
        <BusinessTypeSelectorReviews />
      </div>

      {/* Separator */}
      <div className="w-full max-w-4xl px-4">
        <hr className="border-t border-gray-300 my-8" />
      </div>

      <div className="md:flex  md:gap-8 pt-5 ">
              <GuaranteeSection />
            </div>

      {/* Główny artykuł */}
      <article className="w-full max-w-4xl px-4 py-8">
        <div className="prose prose-lg max-w-none">
          
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Jak działamy w sprawach ALEO.com?
          </h2>
          
          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4 border-l-2 border-gray-300 pl-6">
              <div className="text-white rounded w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0 text-sm" style={{backgroundColor: '#6C9F5D'}}>
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Analizujemy treści w ALEO.com</h3>
                <p className="text-gray-600 leading-relaxed">Sprawdzamy, które treści naruszają regulamin ALEO.com lub przepisy prawa, oceniając możliwości prawne działania.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 border-l-2 border-gray-300 pl-6">
              <div className="text-white rounded w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0 text-sm" style={{backgroundColor: '#6C9F5D'}}>
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Przygotowujemy wnioski zgodne z procedurami ALEO</h3>
                <p className="text-gray-600 leading-relaxed">Sporządzamy profesjonalne zgłoszenia uwzględniające specyfikę platformy ALEO.com i jej wymagania proceduralne.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 border-l-2 border-gray-300 pl-6">
              <div className="text-white rounded w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0 text-sm" style={{backgroundColor: '#6C9F5D'}}>
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Monitorujemy postęp sprawy</h3>
                <p className="text-gray-600 leading-relaxed">Prowadzimy korespondencję z ALEO.com w imieniu klienta i informujemy o każdym etapie postępowania.</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Wpływ negatywnych opinii w ALEO.com na Twój biznes
          </h2>

          <div className="bg-white  mb-8">
            
            {/* Główne statystyki w kartach */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{backgroundColor: '#081D44'}}>
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">78%</div>
                <div className="text-gray-600 text-sm font-medium">użytkowników sprawdza ALEO przed wyborem usługi</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{backgroundColor: '#081D44'}}>
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">45%</div>
                <div className="text-gray-600 text-sm font-medium">spadek zapytań przy ocenie poniżej 3.5 gwiazdki</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{backgroundColor: '#081D44'}}>
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">8 000 zł</div>
                <div className="text-gray-600 text-sm font-medium">średnie straty miesięczne przy złej opinii w ALEO</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{backgroundColor: '#081D44'}}>
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">Do 8x</div>
                <div className="text-gray-600 text-sm font-medium">więcej zapytań z oceną 4.5+ vs 3.0 w ALEO</div>
              </div>
            </div>

            {/* Wykres poziomy z paskami */}
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Szacunkowy poziom zaufania klientów według oceny w ALEO.com</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700 flex items-center gap-1 flex-shrink-0">
                    4.5+ ⭐
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-lg h-8 relative">
                    <div className="h-full rounded-lg relative" style={{backgroundColor: '#081D44', width: '100%'}}>
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white font-semibold text-sm">100%</span>
                    </div>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm font-medium">Doskonała</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700 flex items-center gap-1 flex-shrink-0">
                    4.1-4.4 ⭐
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-lg h-8 relative">
                    <div className="h-full rounded-lg relative" style={{backgroundColor: '#081D44', width: '80%'}}>
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white font-semibold text-sm">80%</span>
                    </div>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm font-medium">Dobra</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700 flex items-center gap-1 flex-shrink-0">
                    3.5-4.0 ⭐
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-lg h-8 relative">
                    <div className="h-full rounded-lg relative" style={{backgroundColor: '#081D44', width: '55%'}}>
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white font-semibold text-sm">55%</span>
                    </div>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm font-medium">Średnia</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700 flex items-center gap-1 flex-shrink-0">
                    3.0-3.4 ⭐
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-lg h-8 relative">
                    <div className="h-full rounded-lg relative" style={{backgroundColor: '#081D44', width: '25%'}}>
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white font-semibold text-xs">25%</span>
                    </div>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm font-medium">Słaba</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700 flex items-center gap-1 flex-shrink-0">
                    &lt;3.0 ⭐
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-lg h-8 relative">
                    <div className="h-full rounded-lg relative" style={{backgroundColor: '#081D44', width: '10%'}}>
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white font-semibold text-xs">10%</span>
                    </div>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm font-medium">Krytyczna</span>
                  </div>
                </div>
              </div>

              {/* Kluczowa informacja */}
              <div className="mt-8 ">
                <div className="flex items-start gap-3">
                  <div className="text-gray-600 text-lg">💡</div>
                  <div>
                    <p className="font-semibold text-gray-900">Kluczowa informacja:</p>
                    <p className="text-gray-600 text-sm">Firmy z oceną poniżej 4.0 gwiazdek w ALEO.com mogą tracić znaczną część potencjalnych klientów przed pierwszym kontaktem.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 pt-6">
            Specjalistyczne wsparcie w sprawach ALEO.com
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Oferujemy kompleksową pomoc prawną w sprawach dotyczących serwisu ALEO.com. Działamy zgodnie z przepisami prawa 
            oraz regulaminami platformy, reprezentując klienta w procesie wnioskowania o usunięcie lub korektę treści.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">Obszary naszego wsparcia w ALEO.com:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Usuwanie nieprawdziwych opinii o firmie
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Korekta nieprawdziwych danych firmowych
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Usuwanie profili utworzonych bez zgody
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Ochrona przed manipulacją ocenami
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Strategia odbudowy reputacji w ALEO.com
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Analizujemy treści i oceniamy, które naruszają regulamin ALEO.com lub przepisy prawa. Przygotowujemy strategię 
            odbudowy reputacji firmy w serwisie, zgodnie z zasadami platformy i etyką biznesową.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Analiza sytuacji w ALEO</h3>
              <p className="text-gray-700">Sprawdzamy status profilu, analizujemy treści naruszające regulamin i oceniamy możliwości prawne działania.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Plan działania</h3>
              <p className="text-gray-700">Opracowujemy strategię długoterminowej odbudowy reputacji w ALEO.com zgodnie z najlepszymi praktykami.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Dlaczego wybrać nasze wsparcie?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Specjalizujemy się w sprawach dotyczących platformy ALEO.com. Mamy doświadczenie w ponad 500 przypadkach 
            związanych z tym serwisem. Zapewniamy profesjonalne podejście i pełną dyskrecję.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Nasze zalety w sprawach ALEO.com:</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Specjalistyczna znajomość procedur ALEO.com</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Doświadczenie w ponad 500 sprawach z ALEO</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Skuteczność ponad 85% w sprawach ALEO</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Pełna poufność i profesjonalizm</span>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Często zadawane pytania o ALEO.com
          </h2>

          <div className="space-y-4 mb-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Czy można usunąć profil firmy z ALEO.com?</h3>
              <p className="text-gray-700">Tak, można ubiegać się o usunięcie profilu z ALEO.com, szczególnie jeśli został utworzony bez zgody właściciela firmy lub zawiera nieprawdziwe informacje.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Ile czasu zajmuje rozwiązanie sprawy z ALEO?</h3>
              <p className="text-gray-700">Czas zależy od typu sprawy. Proste korekty danych mogą być rozwiązane w kilka dni, kompleksowe usuwanie profili może wymagać 2-4 tygodni.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Czy działania wobec ALEO.com są zgodne z prawem?</h3>
              <p className="text-gray-700">Tak, wszystkie nasze działania są zgodne z polskim prawem, przepisami RODO oraz regulaminem serwisu ALEO.com. Działamy transparentnie i etycznie.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Jakie opinie można skutecznie zakwestionować w ALEO?</h3>
              <p className="text-gray-700">Można zakwestionować opinie nieprawdziwe, obraźliwe, naruszające regulamin lub napisane przez konkurencję. Każdy przypadek wymaga indywidualnej analizy prawnej.</p>
            </div>
          </div>

          {/* Sekcja z przykładami sukcesów */}
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Przykłady naszych sukcesów w ALEO.com
          </h2>

          <div className="space-y-8 mb-8">
            {/* Przypadek Kancelarii Prawnej */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4" style={{backgroundColor: '#6C9F5D'}}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Kancelaria Prawna</h3>
                    <p className="text-gray-600 font-medium">Warszawa</p>
                  </div>
                </div>
                <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                  Usługi prawne
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="border-l-2 border-gray-300 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Wyzwanie</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Nieusatysfakcjonowany klient pozostawił w ALEO.com opinię z nieprawdziwymi zarzutami 
                    o nieudanej sprawie sądowej, która w rzeczywistości zakończyła się sukcesem.
                  </p>
                </div>
                
                <div className="border-l-2 border-gray-300 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Akcja</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Przedstawiliśmy ALEO.com dokumentację sądową potwierdzającą sukces w sprawie 
                    i wykazaliśmy fałszywość zarzutów zawartych w opinii.
                  </p>
                </div>
                
                <div className="border-l-2 border-gray-300 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Rezultat</h4>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">⭐</span>
                      <span className="font-semibold text-gray-900">Usunięcie opinii w 7 dni</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">📈</span>
                      <span className="font-semibold text-gray-900">+30% zapytań o usługi</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🛡️</span>
                      <span className="font-semibold text-gray-900">Odbudowana reputacja</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Przypadek Agencji Nieruchomości */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4" style={{backgroundColor: '#6C9F5D'}}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 9.3V4h-3v2.6L12 3L2 12h3v8h6v-6h2v6h6v-8h3L19 9.3zm-7 7.7c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Agencja Nieruchomości</h3>
                    <p className="text-gray-600 font-medium">Kraków</p>
                  </div>
                </div>
                <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                  Nieruchomości
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="border-l-2 border-gray-300 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Wyzwanie</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Konkurencyjna agencja publikowała w ALEO fałszywe opinie o wysokich prowizjach 
                    i nieprofesjonalnej obsłudze, używając fikcyjnych kont.
                  </p>
                </div>
                
                <div className="border-l-2 border-gray-300 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Akcja</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Przeprowadziliśmy analizę cyfrową, wykryliśmy wzorce publikacji i udowodniliśmy 
                    manipulację systemem ocen przez konkurencję.
                  </p>
                </div>
                
                <div className="border-l-2 border-gray-300 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Rezultat</h4>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">⭐</span>
                      <span className="font-semibold text-gray-900">Usunięcie 5 fałszywych opinii</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">📈</span>
                      <span className="font-semibold text-gray-900">+50% nowych klientów</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🛡️</span>
                      <span className="font-semibold text-gray-900">Ochrona przed atakami</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Specjalizujemy się w sprawach ALEO.com dla branż:</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Usługi prawne i księgowe</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Nieruchomości i deweloperzy</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Usługi finansowe</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">IT i technologie</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Usługi dla biznesu</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Edukacja i szkolenia</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Marketing i reklama</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Usługi remontowe</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">I wiele innych...</span>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Rozpocznij współpracę z ALEO.com
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Link href="/formularz-opinie">
              <button 
                className="w-full text-white px-6 py-4 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center"
                style={{backgroundColor: '#081D44'}}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
                </svg>
                Pomoc z opiniami w ALEO
              </button>
            </Link>
            <Link href="/kontakt">
              <button 
                className="w-full border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                Bezpłatna konsultacja
              </button>
            </Link>
          </div>

          {/* Sekcja z linkami do powiązanych usług */}
          <div className="w-full max-w-4xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Sprawdź nasze inne usługi związane z ALEO.com
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/jak-usunac-opinie-z-aleo" className="text-gray-700 hover:text-gray-900 underline font-medium">
                  Jak usunąć opinie z ALEO - kompletny przewodnik prawny
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-firme-z-aleo" className="text-gray-700 hover:text-gray-900 underline font-medium">
                  Usuwanie profilu firmy z ALEO.com - procedury prawne
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-dane-z-aleo" className="text-gray-700 hover:text-gray-900 underline font-medium">
                  Korekta danych firmowych w serwisie ALEO
                </Link>
              </li>
              <li>
                <Link href="/falszywe-opinie-aleo-usuwanie" className="text-gray-700 hover:text-gray-900 underline font-medium">
                  Walka z fałszywymi opiniami w ALEO - skuteczne metody
                </Link>
              </li>
            </ul>
          </div>

          {/* Zastrzeżenia prawne */}
          <div className="w-full max-w-4xl mx-auto mt-8 p-4 bg-gray-100 rounded-lg border border-gray-300">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Zastrzeżenia prawne:</h4>
            <p className="text-xs text-gray-600 leading-relaxed mb-2">
              * Statystyki i dane prezentowane na stronie mają charakter szacunkowy i mogą różnić się w zależności od branży, lokalizacji i innych czynników. 
              Nie stanowią gwarancji określonych rezultatów.
            </p>
            <p className="text-xs text-gray-600 leading-relaxed mb-2">
              Wszystkie nasze działania są prowadzone zgodnie z obowiązującym prawem polskim, regulaminem serwisu ALEO.com oraz zasadami etyki zawodowej. 
              Nie gwarantujemy skuteczności działań w każdym przypadku, gdyż zależy to od indywidualnych okoliczności sprawy.
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Oferujemy doradztwo prawne i reprezentację w granicach obowiązującego prawa. Każdy przypadek wymaga indywidualnej analizy prawnej.
            </p>
          </div>

        </div>
      </article>

      {/* Business Type Selector CTA */}
      <div className="w-full max-w-4xl px-4 py-8 mb-6">
        <BusinessTypeSelectorCTA />
      </div>

    </div>
  );
}
