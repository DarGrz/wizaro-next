//UsuniecieNegatywnychOpiniiGoWorkPage.tsx

"use client";

import BusinessTypeSelector from "./BusinessTypeSelector";
import MobileActionButton from "./MobileActionButton";
import BusinessTypeSelectorGoworkReviews from "./BusinessTypeSelectorGoworkReviews";
import Link from "next/link";
import GuaranteeSection from "./GuaranteeSection";
import BusinessTypeSelectorCTA from "./BusinessTypeSelectorCTA";

export default function UsuniecieNegatywnychOpiniiGoWorkPage() {
  return (
    <div className="min-h-screen mx-auto flex items-center justify-center px-2 flex-col max-w-4xl pt-10">
      {/* Przycisk mobilny */}
      <MobileActionButton />
      
      {/* Główna sekcja z nagłówkiem i selektorem */}
      <div className="gap-6 mb-4 lg:flex hidden md:block">
        <div className="md:p-10 p-4 w-full max-w-lg mt-4 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Szybka Pomoc w Usuwaniu GoWork
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Oferujemy rozwiązania technicznie i doradztwo w sprawach dotyczących platformy GoWork. Analizujemy podstawy prawne i sporządzamy pisma zgodnie z regulaminami platform i obowiązującym prawem.
          </p>
        </div>

        <BusinessTypeSelector />
      </div>

      {/* Mobilna wersja selektora */}
      <div className="md:gap-8 pt-5 w-full md:hidden block">
        <BusinessTypeSelectorGoworkReviews />
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
            Jak działamy w sprawach opinii na GoWork?
          </h2>
          
          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4 border-l-2 border-gray-300 pl-6">
              <div className="text-white rounded w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0 text-sm" style={{backgroundColor: '#6C9F5D'}}>
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Analizujemy treści i identyfikujemy naruszenia regulaminu GoWork</h3>
                <p className="text-gray-600 leading-relaxed">Sprawdzamy, które opinie naruszają regulamin GoWork lub zawierają nieprawdziwe informacje, oceniając podstawy prawne do ich usunięcia.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 border-l-2 border-gray-300 pl-6">
              <div className="text-white rounded w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0 text-sm" style={{backgroundColor: '#6C9F5D'}}>
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Przygotowujemy formalne zgłoszenia do GoWork</h3>
                <p className="text-gray-600 leading-relaxed">Sporządzamy profesjonalne wnioski do administracji GoWork, uwzględniając wszystkie wymagania proceduralne tej platformy.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 border-l-2 border-gray-300 pl-6">
              <div className="text-white rounded w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0 text-sm" style={{backgroundColor: '#6C9F5D'}}>
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Monitorujemy przebieg postępowania w GoWork</h3>
                <p className="text-gray-600 leading-relaxed">Prowadzimy korespondencję z administracją GoWork w imieniu klienta i informujemy o rezultatach na każdym etapie procesu.</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Specyfika platformy GoWork
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
              O platformie GoWork
            </h3>
            <p className="text-gray-700 mb-4">
              GoWork to platforma zawodowa służąca do oceny pracodawców przez pracowników. 
              Często spotykane są przypadki opinii pisanych przez osoby, które nigdy nie pracowały w danej firmie, 
              lub opinii zawierających nieprawdziwe informacje mogące szkodzić reputacji firmy.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Platforma dla ocen pracodawców
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Wpływ na rekrutację i wizerunek firmy
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Możliwość dodawania opinii przez osoby niebędące pracownikami
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Wpływ negatywnych opinii na GoWork na Twój biznes
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
                <div className="text-3xl font-bold text-gray-900 mb-2">73%*</div>
                <div className="text-gray-600 text-sm font-medium">kandydatów sprawdza opinie o firmie przed aplikowaniem</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{backgroundColor: '#081D44'}}>
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">45%*</div>
                <div className="text-gray-600 text-sm font-medium">spadek aplikacji przy negatywnych opiniach</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{backgroundColor: '#081D44'}}>
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">Est. 15 000 zł</div>
                <div className="text-gray-600 text-sm font-medium">średnie koszty dodatkowej rekrutacji</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{backgroundColor: '#081D44'}}>
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">Do 8x</div>
                <div className="text-gray-600 text-sm font-medium">większe zainteresowanie dobrze ocenianą firmą</div>
              </div>
            </div>

            {/* Wykres poziomy z paskami */}
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Atrakcyjność pracodawcy według oceny na GoWork</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700 flex items-center gap-1 flex-shrink-0">
                    4.5+ ⭐
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-lg h-8 relative">
                    <div className="h-full rounded-lg relative" style={{backgroundColor: '#081D44', width: '100%'}}>
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white font-semibold text-sm">100%</span>
                    </div>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm font-medium">Najlepsi pracodawcy</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700 flex items-center gap-1 flex-shrink-0">
                    4.0-4.4 ⭐
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-lg h-8 relative">
                    <div className="h-full rounded-lg relative" style={{backgroundColor: '#081D44', width: '80%'}}>
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white font-semibold text-sm">80%</span>
                    </div>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm font-medium">Dobra reputacja</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700 flex items-center gap-1 flex-shrink-0">
                    3.5-3.9 ⭐
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-lg h-8 relative">
                    <div className="h-full rounded-lg relative" style={{backgroundColor: '#081D44', width: '60%'}}>
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white font-semibold text-sm">60%</span>
                    </div>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm font-medium">Średnia ocena</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700 flex items-center gap-1 flex-shrink-0">
                    3.0-3.4 ⭐
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-lg h-8 relative">
                    <div className="h-full rounded-lg relative" style={{backgroundColor: '#081D44', width: '35%'}}>
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white font-semibold text-sm hidden sm:block">35%</span>
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white font-semibold text-xs sm:hidden">35%</span>
                    </div>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm font-medium">Problemy z wizerunkiem</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700 flex items-center gap-1 flex-shrink-0">
                    &lt;3.0 ⭐
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-lg h-8 relative">
                    <div className="h-full rounded-lg relative" style={{backgroundColor: '#081D44', width: '20%'}}>
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white font-semibold text-xs">20%</span>
                    </div>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm font-medium">Trudności rekrutacyjne</span>
                  </div>
                </div>
              </div>

              {/* Kluczowa informacja */}
              <div className="mt-8 ">
                <div className="flex items-start gap-3">
                  <div className="text-gray-600 text-lg">💡</div>
                  <div>
                    <p className="font-semibold text-gray-900">Kluczowa informacja:</p>
                    <p className="text-gray-600 text-sm">Firmy z oceną poniżej 3.5 gwiazdek mają znacznie większe trudności z rekrutacją specjalistów i ponoszą wyższe koszty pozyskania talentów.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white  mb-8 pt-6 ">
            <div className="text-center mb-8 ">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Czas reagowania ma kluczowe znaczenie!</h3>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Negatywne opinie na GoWork mogą szybko rozprzestrzenić się w środowisku zawodowym. 
                Każdy dzień zwłoki to ryzyko utraty najlepszych kandydatów na rzecz konkurencji.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8 ">
              <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-16 h-16 bg-[#081D44] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">48h</div>
                <div className="text-gray-600 font-medium">Średni czas reakcji na negatywną opinię w GoWork</div>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#081D44'}}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">-30</div>
                <div className="text-gray-600 font-medium">Mniej aplikacji miesięcznie przez jedną złą opinię</div>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#081D44'}}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">+55%</div>
                <div className="text-gray-600 font-medium">Wzrost zainteresowania po poprawie reputacji</div>
              </div>
            </div>

            <div className="rounded-lg p-6 text-white text-center  mb-6" style={{backgroundColor: '#081D44'}}>
              <h4 className="font-bold text-lg mb-2">💡 Specyfika GoWork</h4>
              <p className="text-gray-200">
                W przeciwieństwie do innych platform, opinie na GoWork mogą być dodawane przez osoby podające się za byłych pracowników. 
                Szybka reakcja i profesjonalne podejście są kluczowe dla ochrony wizerunku pracodawcy.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 pt-6">
            Profesjonalne wsparcie w sprawach opinii na GoWork
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Oferujemy specjalistyczną pomoc prawną w zakresie zgłaszania nieprawdziwych lub krzywdzących treści 
            na platformie GoWork. Działamy zgodnie z przepisami prawa oraz regulaminami platform, 
            reprezentując pracodawcę w procesie wnioskowania o usunięcie lub korektę informacji.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">Nasze usługi dla platform zawodowych:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Usuwanie fałszywych opinii pracowniczych
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Weryfikacja autentyczności recenzentów
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Ochrona wizerunku pracodawcy w internecie
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Budowanie pozytywnej reputacji pracodawcy
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Pomagamy nie tylko w usuwaniu nieprawdziwych treści, ale również w budowaniu strategii 
            długoterminowej ochrony wizerunku pracodawcy na platformach zawodowych, zgodnie z etyką biznesu 
            i dobrymi praktykami HR.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Analiza treści i regulaminów</h3>
              <p className="text-gray-700">Szczegółowo analizujemy treści pod kątem naruszenia regulaminu GoWork oraz przepisów prawa pracy i ochrony danych.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Strategia employer branding</h3>
              <p className="text-gray-700">Doradzamy w zakresie budowania pozytywnego wizerunku pracodawcy w długoterminowej perspektywie.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Dlaczego wybrać nasze usługi?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Specjalizujemy się w prawnych aspektach platform zawodowych i mamy bogate doświadczenie 
            w rozwiązywaniu sporów dotyczących opinii pracowniczych. Prowadzimy ponad 300 spraw rocznie 
            związanych z platformami oceny pracodawców.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Nasze kompetencje:</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Znajomość procedur platform zawodowych</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Doświadczenie w prawie pracy i HR</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Ponad 300 spraw rocznie z platformami oceny pracodawców</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Pełna dyskrecja i poufność działań</span>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Skorzystaj z naszej pomocy
          </h2>

          <div className="grid md:grid-cols-1 gap-4 mb-8">
            <Link href="/formularz-opinie">
              <button 
                className="w-full text-white px-6 py-4 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center"
                style={{backgroundColor: '#081D44'}}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
                </svg>
                Formularz pomocy - GoWork i inne platformy
              </button>
            </Link>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Często zadawane pytania o GoWork
          </h2>

          <div className="space-y-4 mb-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Czy można usunąć opinię z GoWork napisaną przez osobę, która nigdy nie pracowała w firmie?</h3>
              <p className="text-gray-700">Tak, to jest jedna z najczęstszych podstaw do usuwania opinii z GoWork. Platforma wymaga, aby opinie były pisane przez rzeczywistych pracowników lub byłych pracowników.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Jak długo trwa proces usuwania opinii z GoWork?</h3>
              <p className="text-gray-700">Proces zazwyczaj trwa od 5 do 21 dni roboczych, w zależności od złożoności sprawy i responsywności administracji GoWork. Proste przypadki mogą być rozwiązane szybciej.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Czy można zweryfikować, kto napisał opinię na GoWork?</h3>
              <p className="text-gray-700">GoWork nie ujawnia tożsamości recenzentów, ale możemy sprawdzić zgodność treści z regulaminem i zasadami platformy, a także wykazać ewentualne nieprawdziwe informacje.</p>
            </div>
          </div>

          {/* Sekcja z przykładami sukcesów */}
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Przykłady naszych sukcesów z GoWork
          </h2>

          <div className="space-y-8 mb-8">
            {/* Przypadek firmy IT */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4" style={{backgroundColor: '#6C9F5D'}}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Firma IT</h3>
                    <p className="text-gray-600 font-medium">Software house z Wrocławia</p>
                  </div>
                </div>
                <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                  Technologie
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="border-l-2 border-gray-300 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Problem</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Były pracownik zwolniony dyscyplinarnie opublikował serię negatywnych opinii 
                    z nieprawdziwymi zarzutami o kulturze pracy i warunkach zatrudnienia.
                  </p>
                </div>
                
                <div className="border-l-2 border-gray-300 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Rozwiązanie</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Udowodniliśmy naruszenie regulaminu GoWork poprzez publikowanie 
                    treści obraźliwych oraz nieprawdziwych informacji o firmie.
                  </p>
                </div>
                
                <div className="border-l-2 border-gray-300 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Efekt</h4>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">⭐</span>
                      <span className="font-semibold text-gray-900">2.8 → 4.2 gwiazdek</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">📈</span>
                      <span className="font-semibold text-gray-900">+70% aplikacji</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🛡️</span>
                      <span className="font-semibold text-gray-900">Odbudowa reputacji</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Przypadek firmy handlowej */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4" style={{backgroundColor: '#6C9F5D'}}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Sieć Handlowa</h3>
                    <p className="text-gray-600 font-medium">Retailer z Warszawy</p>
                  </div>
                </div>
                <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                  Handel
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="border-l-2 border-gray-300 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Problem</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Konkurencyjna firma publikowała fałszywe opinie przez podstawione osoby, 
                    atakując politykę personalną i warunki pracy.
                  </p>
                </div>
                
                <div className="border-l-2 border-gray-300 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Rozwiązanie</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Przeprowadziliśmy analizę cyfrową i wykryliśmy schemat publikacji 
                    przez fałszywe konta oraz manipulację systemem ocen.
                  </p>
                </div>
                
                <div className="border-l-2 border-gray-300 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Efekt</h4>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">⭐</span>
                      <span className="font-semibold text-gray-900">Przywrócenie oceny 3.9</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">📈</span>
                      <span className="font-semibold text-gray-900">+50% zainteresowania</span>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Branże, w których najczęściej pomagamy na GoWork:</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Technologie i IT</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Finanse i bankowość</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Handel i retail</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Produkcja i logistyka</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Usługi profesjonalne</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Agencje rekrutacyjne</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Call center i BPO</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Firmy konsultingowe</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">I wiele innych...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sekcja z linkami do powiązanych usług */}
          <div className="w-full max-w-4xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Sprawdź nasze inne usługi prawne
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/jak-usunac-opinie-z-gowork" className="text-gray-700 hover:text-gray-900 underline font-medium">
                  Kompleksowe usuwanie opinii z GoWork
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-firme-z-google-maps" className="text-gray-700 hover:text-gray-900 underline font-medium">
                  Wsparcie w rozwiązaniu problemów z profilem firmowym w Google Maps
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-opinie-z-aleo" className="text-gray-700 hover:text-gray-900 underline font-medium">
                  Pomoc prawna w sprawach opinii w serwisie Aleo
                </Link>
              </li>
              <li>
                <Link href="/usuwanie-falszywych-opinii" className="text-gray-700 hover:text-gray-900 underline font-medium">
                  Ogólne usuwanie fałszywych opinii (wszystkie platformy)
                </Link>
              </li>
            </ul>
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
