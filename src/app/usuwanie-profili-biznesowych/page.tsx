'use client';

import React from "react";
import Link from "next/link";
import { Shield, Eye, AlertTriangle, FileText, Building2, Database, Search, Globe, UserX, Clock } from 'lucide-react';
import BusinessTypeSelector from "@/components/BusinessTypeSelector";

export default function UsuwanieProfiliBiznesowePage() {
  return (
    <main className="max-w-5xl mx-auto px-2 md:px-8 py-10">
      <h1 className="text-3xl md:text-5xl font-extrabold text-[#002a5c] mb-8 text-center max-w-4xl mx-auto leading-tight">
        Usuwanie Profili z Portali Biznesowych
      </h1>
      
      <div className="text-center mb-8">
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Skutecznie usuniemy Twój profil z GoWork, ALEO, Panorama Firm, Biznes Finder, PKT.pl i innych portali biznesowych
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <Link 
          href="/formularz-profil-bazy" 
          className="bg-[#002a5c] hover:bg-[#004a8c] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
        >
          Usuń profil firmy
        </Link>
      </div>

    

      {/* Sekcja wstępna */}
      <section className="bg-white rounded-xl shadow-lg p-6 md:p-14 border border-gray-100 mb-10 transform hover:scale-[1.02] transition-all duration-300">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#002a5c] mb-6 leading-tight">
            Dlaczego usuwanie profili z portali biznesowych jest ważne dla Twojej firmy?
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Portale biznesowe takie jak GoWork, ALEO, Panorama Firm czy Biznes Finder odgrywają kluczową rolę w ekosystemie B2B. Nieaktualne, błędne lub niechciane profile firmowe mogą znacząco wpływać na postrzeganie Twojej firmy przez potencjalnych klientów i partnerów biznesowych. Kontrola nad obecnością w tych serwisach jest fundamentem nowoczesnego zarządzania reputacją online.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Wiele przedsiębiorstw boryka się z problemem duplikowania informacji, nieprawdziwymi danymi lub profilami utworzonymi bez ich wiedzy. Taka sytuacja może prowadzić do pomyłek w komunikacji biznesowej, błędnego kierowania zapytań ofertowych czy nawet szkód wizerunkowych. Profesjonalne zarządzanie obecnością w portalach biznesowych to inwestycja w przejrzystość i wiarygodność Twojej marki.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              W Wizaro.pl specjalizujemy się w kompleksowym zarządzaniu profilami firmowymi w najważniejszych portalach biznesowych. Nasze działania są zawsze zgodne z regulaminami poszczególnych serwisów oraz obowiązującym prawem, zapewniając skuteczne i etyczne rozwiązania problemów związanych z obecnością online.
            </p>
          </div>

          <div className="flex justify-center mt-8">
            <Link 
              href="/formularz-profil-bazy" 
              className="bg-[#002a5c] hover:bg-[#004a8c] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
            >
              Usuń profile z portali biznesowych
            </Link>
          </div>
        </div>
      </section>

      {/* Sekcja o głównych portalach */}
      <section className="bg-gradient-to-br from-white to-[#f8fafc] rounded-xl shadow-lg p-6 md:p-14 border border-gray-100 mb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#002a5c] mb-8 text-center">
            Główne portale biznesowe w Polsce
          </h2>
          
          <div className="grid gap-8 mt-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex gap-4 items-start">
                <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] shrink-0">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#002a5c] mb-2">GoWork</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Jedna z największych platform B2B w Polsce, skupiająca tysiące firm z różnych branż. Portal umożliwia prezentację oferty, nawiązywanie kontaktów biznesowych i budowanie sieci partnerskiej.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex gap-4 items-start">
                <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] shrink-0">
                  <Search size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#002a5c] mb-2">ALEO</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Profesjonalna platforma biznesowa oferująca weryfikację firm, katalog dostawców oraz narzędzia do oceny wiarygodności kontrahentów. Szczególnie ważna w branżach B2B.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex gap-4 items-start">
                <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] shrink-0">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#002a5c] mb-2">Panorama Firm</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Rozbudowany katalog firm z możliwością szczegółowej prezentacji działalności, oferty i referencji. Portal często wykorzystywany przez kontrahentów do weryfikacji potencjalnych partnerów.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex gap-4 items-start">
                <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] shrink-0">
                  <Database size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#002a5c] mb-2">Biznes Finder & PKT.pl</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Branżowe katalogi firm umożliwiające prezentację oferty i nawiązywanie kontaktów handlowych. Ważne źródła leadów dla wielu przedsiębiorstw.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex gap-4 items-start">
                <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#002a5c] mb-2">Podobne Firmy i inne portale</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Szeroka gama specjalistycznych portali branżowych i lokalnych katalogów firm, które mogą zawierać informacje o Twojej firmie bez Twojej wiedzy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja o problemach */}
      <section className="bg-white rounded-xl shadow-lg p-6 md:p-14 border border-gray-100 mb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#002a5c] mb-8 text-center">
            6 najczęstszych problemów z profilami biznesowymi
          </h2>
          
          <div className="grid gap-8 mt-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex gap-4 items-start">
                <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] shrink-0">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#002a5c] mb-2">Nieaktualne dane firmowe</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Przestarzałe informacje kontaktowe, adresy, oferta lub dane rejestrowe mogą wprowadzać w błąd potencjalnych klientów i szkodzić wizerunkowi firmy.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex gap-4 items-start">
                <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] shrink-0">
                  <UserX size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#002a5c] mb-2">Profile utworzone bez wiedzy</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Automatycznie generowane profile na podstawie danych z rejestrów publicznych, często zawierające błędne lub niepełne informacje o firmie.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex gap-4 items-start">
                <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#002a5c] mb-2">Duplikowanie profili</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Wielokrotne wpisy tej samej firmy w różnych formatach, powodujące chaos informacyjny i utrudniające zarządzanie wizerunkiem online.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex gap-4 items-start">
                <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] shrink-0">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#002a5c] mb-2">Naruszenie prywatności biznesowej</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Ujawnienie wrażliwych informacji biznesowych, danych finansowych lub strategicznych bez autoryzacji właściciela firmy.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex gap-4 items-start">
                <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] shrink-0">
                  <Eye size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#002a5c] mb-2">Negatywny wpływ na SEO</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Niespójne informacje w różnych portalach mogą negatywnie wpływać na pozycjonowanie strony firmowej w wyszukiwarkach internetowych.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex gap-4 items-start">
                <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#002a5c] mb-2">Problemy po zakończeniu działalności</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Profile nieaktywnych firm mogą wprowadzać w błąd kontrahentów i generować niepotrzebne zapytania handlowe po zakończeniu działalności.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Drugi BusinessTypeSelector */}
      <div className="mb-16">
        <BusinessTypeSelector />
      </div>

      {/* Sekcja o procesie usuwania */}
      <section className="bg-white rounded-xl shadow p-6 md:p-14 border border-gray-100 mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-[#002a5c] mb-4">
          Proces usuwania profili z portali biznesowych - kompleksowe podejście
        </h2>
        <p className="text-gray-800 leading-relaxed mb-4">
          Usuwanie profili firmowych z portali biznesowych to złożony proces wymagający znajomości specyfiki każdej platformy oraz obowiązujących w nich procedur. Każdy portal ma własne zasady dotyczące zarządzania danymi firmowymi, weryfikacji tożsamości oraz procedur usuwania informacji.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Pierwszym etapem jest zawsze dokładna analiza obecności firmy w poszczególnych portalach. Obejmuje to identyfikację wszystkich profili, ocenę ich aktualności oraz określenie, które z nich wymagają aktualizacji, a które całkowitego usunięcia. Często okazuje się, że firma posiada profile w portalach, o których istnieniu nie wiedziała.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Kolejny etap to weryfikacja uprawnień do zarządzania profilami. Większość portali biznesowych wymaga potwierdzenia tożsamości firmy poprzez dostarczenie odpowiednich dokumentów, takich jak odpis z KRS, zaświadczenie o wpisie do CEIDG czy inne dokumenty potwierdzające prawo do reprezentowania podmiotu gospodarczego.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Po uzyskaniu dostępu następuje faza właściwego zarządzania profilem. W przypadku portali takich jak GoWork czy ALEO, procedury usuwania profilu są stosunkowo ustandaryzowane, ale wymagają spełnienia określonych warunków. Niektóre portale pozwalają na samodzielne usunięcie profilu przez panel administracyjny, inne wymagają bezpośredniego kontaktu z obsługą klienta.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Szczególną uwagę należy zwrócić na portale, które automatycznie pobierają dane z rejestrów publicznych. W takich przypadkach usunięcie profilu może być niemożliwe, ale istnieje możliwość ograniczenia zakresu publikowanych informacji lub dodania adnotacji o zakończeniu działalności.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          W Wizaro.pl przeprowadziliśmy setki procesów usuwania profili z różnych portali biznesowych. Nasze doświadczenie pozwala na skuteczne nawigowanie przez procedury każdej platformy oraz maksymalizację szans na pozytywne rozpatrzenie wniosku o usunięcie.
        </p>
      </section>

      {/* Sekcja o legalnych metodach */}
      <section className="bg-gradient-to-br from-white to-[#f8fafc] rounded-xl shadow p-6 md:p-14 border border-gray-100 mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-[#002a5c] mb-4">
          Legalne metody zarządzania profilemi biznesowymi
        </h2>
        <p className="text-gray-800 leading-relaxed mb-4">
          Zarządzanie profilami w portalach biznesowych musi odbywać się zgodnie z regulaminami poszczególnych platform oraz obowiązującym prawem. Istnieje kilka sprawdzonych i legalnych metod, które pozwalają skutecznie kontrolować obecność firmy w przestrzeni online.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          <strong>Oficjalne przejęcie kontroli nad profilem</strong> to podstawowa metoda zarządzania obecnością w portalach biznesowych. Większość platform oferuje procedury weryfikacji, które pozwalają właścicielom firm na uzyskanie pełnej kontroli nad swoimi profilami. Po weryfikacji tożsamości można aktualizować dane, zarządzać treścią oraz, w wielu przypadkach, usunąć profil.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          <strong>Wykorzystanie prawa do usunięcia danych osobowych</strong> wynikającego z RODO może być skuteczną metodą w przypadku firm jednoosobowych lub gdy w profilu publikowane są dane osobowe reprezentantów firmy. Prawo to daje możliwość żądania usunięcia danych w określonych sytuacjach, szczególnie gdy dane nie są już potrzebne lub zostały przetworzone bezprawnie.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          <strong>Korekta nieprawdziwych informacji</strong> to podstawowe prawo każdej firmy. Jeśli profile zawierają błędne dane, można żądać ich poprawienia lub usunięcia na podstawie obowiązujących przepisów o ochronie danych oraz regulaminów poszczególnych portali.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          <strong>Procedury związane z zakończeniem działalności</strong> są przewidziane w większości portali biznesowych. W przypadku likwidacji firmy, zmiany formy prawnej lub zaprzestania działalności w określonej branży, można skutecznie usunąć profile po dostarczeniu odpowiedniej dokumentacji.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          <strong>Negocjacje z administratorami portali</strong> w sprawach indywidualnych mogą przynieść pozytywne rezultaty, szczególnie gdy przedstawione zostaną uzasadnione argumenty prawne lub biznesowe. Profesjonalna komunikacja i merytoryczne uzasadnienie często przekonują administratorów do pozytywnego rozpatrzenia sprawy.
        </p>

        <div className="flex justify-center mt-8">
          <Link href="/formularz-profil-bazy" className="bg-[#002a5c] hover:bg-[#004a8c] text-white font-bold py-3 px-6 rounded-full transition-colors duration-300">
            Rozpocznij proces usuwania profili
          </Link>
        </div>
      </section>

      {/* Sekcja FAQ */}
      <section className="bg-white rounded-xl shadow p-6 md:p-14 border border-gray-100 mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-[#002a5c] mb-6">
          Najczęściej zadawane pytania o usuwanie profili biznesowych
        </h2>
        
        <div className="space-y-6">
          <div className="border-l-4 border-[#002a5c] pl-4">
            <h3 className="font-semibold text-[#002a5c] mb-2">Czy można usunąć profil firmy bez weryfikacji tożsamości?</h3>
            <p className="text-gray-700">
              Większość portali biznesowych wymaga weryfikacji tożsamości przed umożliwieniem zarządzania profilem. Jest to zabezpieczenie przed nieuprawnionymi zmianami. W niektórych przypadkach możliwe jest złożenie wniosku o usunięcie bez weryfikacji, ale szanse na pozytywne rozpatrzenie są znacznie mniejsze.
            </p>
          </div>

          <div className="border-l-4 border-[#002a5c] pl-4">
            <h3 className="font-semibold text-[#002a5c] mb-2">Ile czasu zajmuje proces usuwania profilu z portali biznesowych?</h3>
            <p className="text-gray-700">
              Czas usuwania zależy od specyfiki portalu i złożoności sprawy. Proste przypadki mogą być rozwiązane w ciągu kilku dni, podczas gdy złożone sytuacje wymagające dodatkowej dokumentacji mogą potrwać od 2 do 8 tygodni.
            </p>
          </div>

          <div className="border-l-4 border-[#002a5c] pl-4">
            <h3 className="font-semibold text-[#002a5c] mb-2">Czy usunięcie profilu z jednego portalu wpływa na inne?</h3>
            <p className="text-gray-700">
              Portale biznesowe działają niezależnie, więc usunięcie profilu z jednego serwisu nie wpływa automatycznie na inne. Jednak niektóre portale mogą współdzielić dane, dlatego kompleksowe podejście do zarządzania obecnością online jest najskuteczniejsze.
            </p>
          </div>

          <div className="border-l-4 border-[#002a5c] pl-4">
            <h3 className="font-semibold text-[#002a5c] mb-2">Co zrobić, jeśli portal odmówi usunięcia profilu?</h3>
            <p className="text-gray-700">
              W przypadku odmowy można skorzystać z procedur odwoławczych przewidzianych w regulaminie portalu, złożyć skargę do organu nadzorczego ds. ochrony danych osobowych lub skonsultować sprawę z prawnikiem specjalizującym się w prawie internetowym.
            </p>
          </div>

          <div className="border-l-4 border-[#002a5c] pl-4">
            <h3 className="font-semibold text-[#002a5c] mb-2">Czy usunięcie profilu wpłynie na pozycjonowanie strony firmowej?</h3>
            <p className="text-gray-700">
              Usunięcie profili z portali biznesowych może mieć wpływ na SEO, zarówno pozytywny jak i negatywny. Usunięcie przestarzałych lub błędnych informacji zwykle poprawia spójność danych online, co pozytywnie wpływa na wiarygodność w oczach wyszukiwarek.
            </p>
          </div>
        </div>
      </section>

      {/* Ostateczny CTA */}
      <section className="bg-gradient-to-r from-[#002a5c] to-[#004a8c] rounded-xl shadow-lg p-6 md:p-12 text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Potrzebujesz pomocy w usunięciu profili biznesowych?
        </h2>
        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
          Naszy eksperci przeprowadzą kompleksowy proces usuwania profili z wszystkich głównych portali biznesowych. Działamy szybko, skutecznie i zgodnie z prawem.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/formularz-profil-bazy"
            className="bg-white text-[#002a5c] font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300"
          >
            Usuń profile biznesowe
          </Link>
          <Link 
            href="/kontakt"
            className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-[#002a5c] transition-colors duration-300"
          >
            Skontaktuj się z ekspertem
          </Link>
        </div>
      </section>

      {/* Trzeci BusinessTypeSelector */}
      <div className="mt-16">
        <BusinessTypeSelector />
      </div>
    </main>
  );
}
