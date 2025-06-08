'use client';

import React from "react";
import Link from "next/link";
import { Shield, Eye, AlertTriangle, FileText, ShoppingBag } from 'lucide-react';
import BusinessTypeSelector from "@/components/BusinessTypeSelector";
import BusinessTypeSelectorCTA from "@/components/BusinessTypeSelectorCTA";

export default function UsuwanieOpiniiAleoPage() {
  return (
    <main className="max-w-5xl mx-auto px-2 md:px-8 py-10">
      <h1 className="text-3xl md:text-5xl font-extrabold text-[#002a5c] mb-8 text-center max-w-3xl mx-auto leading-tight">
        Usuwanie Opinii i Profilu z Aleo
      </h1>

      {/* Hero section z BusinessTypeSelectorCTA */}
      <div className="mb-16">
        <BusinessTypeSelectorCTA />
      </div>

      {/* Sekcja wstępna */}
      <section className="bg-white rounded-xl shadow-lg p-6 md:p-14 border border-gray-100 mb-10 transform hover:scale-[1.02] transition-all duration-300">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#002a5c] mb-6 leading-tight">
            Dlaczego zarządzanie profilem i opiniami w Aleo jest ważne dla Twojej firmy?
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Portal Aleo to jedna z najważniejszych platform B2B w Polsce, gdzie przedsiębiorcy mogą znaleźć dostawców, klientów oraz zweryfikować wiarygodność potencjalnych partnerów biznesowych. Opinie i informacje zamieszczone na Twoim profilu Aleo mają bezpośredni wpływ na decyzje zakupowe innych firm oraz na postrzeganie wiarygodności Twojego biznesu.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Negatywne opinie lub nieaktualne informacje w profilu Aleo mogą skutecznie blokować rozwój Twojej firmy w sektorze B2B. Potencjalni partnerzy biznesowi, zanim podejmą współpracę, często sprawdzają opinie i dane na platformach takich jak Aleo, traktując je jako wiarygodne źródło informacji o rzetelności i profesjonalizmie dostawcy.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              W Wizaro.pl oferujemy kompleksowe wsparcie w zakresie zarządzania profilami firmowymi na platformach B2B takich jak Aleo. Nasze działania są zawsze zgodne z regulaminem serwisu oraz prawem, zapewniając skuteczne i etyczne rozwiązania problemów wizerunkowych w przestrzeni biznesowej.
            </p>
          </div>

          <div className="flex justify-center mt-8">
            <Link 
              href="/formularz-profil" 
              className="bg-[#002a5c] hover:bg-[#004a8c] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
            >
              Skonsultuj swój przypadek z ekspertem
            </Link>
          </div>
        </div>
      </section>

      {/* Sekcja o wyzwaniach */}
      <section className="bg-gradient-to-br from-white to-[#f8fafc] rounded-xl shadow-lg p-6 md:p-14 border border-gray-100 mb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#002a5c] mb-8 text-center">
            5 najczęstszych wyzwań związanych z profilem w Aleo
          </h2>
          
          <div className="grid gap-8 mt-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex gap-4 items-start">
                <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] shrink-0">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#002a5c] mb-2">Nieprawdziwe dane firmowe</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Błędne lub nieaktualne informacje o firmie, które mogą wprowadzać w błąd potencjalnych partnerów biznesowych.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex gap-4 items-start">
                <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] shrink-0">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#002a5c] mb-2">Nieautoryzowane oferty</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Oferty i produkty dodane bez Twojej wiedzy i zgody, często z nieaktualnymi cenami lub warunkami.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex gap-4 items-start">
                <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] shrink-0">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#002a5c] mb-2">Naruszenie prywatności</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Ujawnienie poufnych informacji biznesowych lub danych wrażliwych bez autoryzacji.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex gap-4 items-start">
                <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] shrink-0">
                  <Eye size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#002a5c] mb-2">Konkurencyjny sabotaż</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Celowe działania konkurencji mające na celu zaszkodzenie reputacji Twojej firmy w środowisku B2B.
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
                  <h3 className="text-xl font-semibold text-[#002a5c] mb-2">Dublujące się profile</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Wielokrotne profile tej samej firmy, powodujące chaos informacyjny i utrudniające zarządzanie wizerunkiem.
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

      {/* Sekcja o procesie zarządzania */}
      <section className="bg-white rounded-xl shadow p-6 md:p-14 border border-gray-100 mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-[#002a5c] mb-4">
          Proces zarządzania profilem i opiniami w Aleo - co warto wiedzieć
        </h2>
        <p className="text-gray-800 leading-relaxed mb-4">
          Zarządzanie profilem na platformie Aleo wymaga zrozumienia specyfiki tego środowiska oraz znajomości procedur obowiązujących w serwisie. Aleo, jako platforma skierowana do profesjonalnych podmiotów gospodarczych, ma swoje własne mechanizmy weryfikacji i moderacji treści.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Pierwszym krokiem w skutecznym zarządzaniu profilem jest oficjalne przejęcie kontroli nad wizytówką firmy. Proces ten wymaga weryfikacji tożsamości przedsiębiorstwa, co zwykle wiąże się z dostarczeniem odpowiednich dokumentów potwierdzających prawo do reprezentowania firmy. Po weryfikacji otrzymujesz dostęp do panelu administracyjnego, który pozwala na edycję danych, aktualizację oferty oraz zarządzanie opiniami.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          W przypadku negatywnych opinii, platforma Aleo stosuje podobne zasady jak inne portale biznesowe - opinie nie są usuwane tylko dlatego, że są krytyczne. Zgłoszenie opinii do moderacji ma szansę powodzenia, jeśli zawiera ona nieprawdziwe informacje, narusza regulamin serwisu, zawiera treści obraźliwe lub stanowi ewidentną próbę nieuczciwej konkurencji. Skuteczne zgłoszenie wymaga merytorycznego uzasadnienia i często dostarczenia dowodów.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Aktualizacja informacji w profilu powinna być przeprowadzana regularnie, szczególnie po zmianach w strukturze firmy, ofercie produktowej czy danych kontaktowych. Warto pamiętać, że Aleo integruje informacje z różnych źródeł, w tym oficjalnych rejestrów gospodarczych, dlatego niektóre dane mogą być aktualizowane automatycznie, ale nie zawsze natychmiast po zmianach.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          W przypadkach, gdy konieczne jest usunięcie całego profilu, np. z powodu zakończenia działalności lub fuzji, proces ten wymaga bezpośredniego kontaktu z administracją Aleo. Konieczne jest udokumentowanie zmian i uzasadnienie prośby o usunięcie. Należy przygotować się na to, że procedura może trwać od kilku dni do kilku tygodni, w zależności od złożoności sprawy.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          W Wizaro.pl posiadamy wieloletnie doświadczenie w zarządzaniu profilami firmowymi na platformach B2B takich jak Aleo. Znamy procedury, wiemy jak skutecznie komunikować się z administracją serwisu i jak przygotować dokumentację, która maksymalizuje szanse na pozytywne rozpatrzenie sprawy.
        </p>
      </section>

      {/* Sekcja o legalnych metodach */}
      <section className="bg-white rounded-xl shadow p-6 md:p-14 border border-gray-100 mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-[#002a5c] mb-4">
          Legalne metody zarządzania profilem w Aleo
        </h2>
        <p className="text-gray-800 leading-relaxed mb-4">
          Zarządzanie profilem w serwisie Aleo musi odbywać się zgodnie z regulaminem platformy oraz obowiązującym prawem. Istnieje kilka legalnych i etycznych metod, które pozwalają skutecznie zadbać o wizerunek firmy w tym środowisku biznesowym.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Podstawową metodą jest oficjalne zarządzanie profilem po przejściu procesu weryfikacji. Aleo umożliwia firmom, które potwierdziły swoją tożsamość, pełną kontrolę nad profilem biznesowym. Dzięki temu możesz aktualizować dane kontaktowe, informacje o firmie, ofertę produktową i usługową oraz materiały promocyjne. Regularne aktualizacje profilu zwiększają wiarygodność firmy i jej widoczność w wyszukiwaniach na platformie.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Drugą metodą jest aktywne odpowiadanie na zapytania i opinie. Profesjonalne i merytoryczne odpowiedzi na pytania potencjalnych partnerów biznesowych oraz komentarze do otrzymanych opinii pokazują zaangażowanie firmy i jej profesjonalizm. W przypadku negatywnych opinii, rzeczowa odpowiedź wyjaśniająca sytuację może znacząco zmienić odbiór krytycznego komentarza przez innych użytkowników platformy.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Trzecią metodą jest zgłaszanie nieprawidłowych treści do moderacji Aleo. Platforma umożliwia zgłaszanie opinii, które zawierają nieprawdziwe informacje, treści obraźliwe, naruszają regulamin lub są ewidentną próbą nieuczciwej konkurencji. Aby zwiększyć szanse na pozytywne rozpatrzenie zgłoszenia, należy dokładnie wskazać, które elementy opinii są nieprawidłowe i dlaczego, oraz dołączyć dowody potwierdzające stanowisko firmy.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Czwartą metodą jest rozbudowa profilu o elementy budujące zaufanie. Aleo pozwala na dodawanie certyfikatów, referencji, przykładów zrealizowanych projektów czy informacji o członkostwie w organizacjach branżowych. Kompleksowy i profesjonalnie przygotowany profil zwiększa wiarygodność firmy i może skutecznie równoważyć wpływ ewentualnych negatywnych opinii.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          W przypadku poważnych naruszeń, takich jak zniesławienie, naruszenie tajemnicy przedsiębiorstwa czy publikacja fałszywych informacji mających na celu zaszkodzenie reputacji firmy, możliwe jest również podjęcie kroków prawnych. Jest to rozwiązanie ostateczne, stosowane tylko w sytuacjach, gdy inne metody zawiodły, a naruszenia powodują wymierne szkody dla biznesu.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Należy podkreślić, że wszelkie działania związane z zarządzaniem profilem w Aleo powinny być zgodne z zasadami etyki biznesowej. Próby manipulowania opiniami, tworzenie fałszywych kont czy inne nieuczciwe praktyki mogą prowadzić do trwałego usunięcia profilu z platformy i negatywnych konsekwencji dla reputacji firmy.
        </p>

        <div className="flex justify-center mt-8">
          <Link href="/formularz-profil" className="bg-[#002a5c] hover:bg-[#004a8c] text-white font-bold py-3 px-6 rounded-full transition-colors duration-300">
            Skontaktuj się z nami po profesjonalną pomoc
          </Link>
        </div>
      </section>

      {/* Sekcja FAQ */}
      <section className="bg-white rounded-xl shadow p-6 md:p-14 border border-gray-100 mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-[#002a5c] mb-4">
          Najczęściej zadawane pytania
        </h2>
        
        <div className="space-y-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold text-[#002a5c]">Jak mogę przejąć kontrolę nad profilem mojej firmy w Aleo?</h3>
            <p className="text-gray-700 mt-2">
              Aby przejąć kontrolę nad profilem firmy w Aleo, należy przejść proces weryfikacji tożsamości przedsiębiorstwa. Proces ten zwykle wymaga założenia konta, znalezienia profilu swojej firmy i zgłoszenia się jako uprawniony przedstawiciel. Następnie konieczne jest dostarczenie dokumentów potwierdzających prawo do reprezentowania firmy, takich jak odpis z KRS, zaświadczenie CEIDG lub pełnomocnictwo. Po pozytywnej weryfikacji otrzymasz dostęp do panelu administracyjnego profilu.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#002a5c]">Czy mogę usunąć negatywną opinię o mojej firmie z Aleo?</h3>
            <p className="text-gray-700 mt-2">
              Usunięcie negatywnej opinii z Aleo jest możliwe tylko w przypadku, gdy narusza ona regulamin platformy. Opinie, które zawierają nieprawdziwe informacje, obraźliwe treści, mowę nienawiści lub są ewidentną próbą nieuczciwej konkurencji, mogą zostać zgłoszone do moderacji. Aleo nie usuwa opinii tylko dlatego, że są krytyczne - jeśli opinia jest merytoryczna i dotyczy rzeczywistych doświadczeń partnera biznesowego, prawdopodobnie pozostanie na platformie.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#002a5c]">Jak długo trwa proces aktualizacji danych firmowych w Aleo?</h3>
            <p className="text-gray-700 mt-2">
              Czas aktualizacji danych firmowych w Aleo zależy od rodzaju zmian. Podstawowe informacje, takie jak dane kontaktowe czy opis firmy, możesz zaktualizować samodzielnie po przejęciu kontroli nad profilem - zmiany te są widoczne natychmiast. W przypadku zmian w oficjalnych danych rejestrowych, takich jak nazwa firmy czy forma prawna, Aleo może weryfikować te informacje z oficjalnymi rejestrami, co może wydłużyć proces do kilku dni roboczych.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#002a5c]">Czy można całkowicie usunąć profil firmy z Aleo?</h3>
            <p className="text-gray-700 mt-2">
              Tak, można usunąć profil firmy z Aleo, ale proces ten wymaga bezpośredniego kontaktu z administracją platformy. Usunięcie profilu jest zwykle możliwe w przypadku zakończenia działalności firmy, fuzji lub innych istotnych zmian organizacyjnych. Konieczne jest dostarczenie odpowiedniej dokumentacji potwierdzającej zasadność prośby. Sam fakt, że profil zawiera negatywne opinie, nie jest wystarczającym powodem do jego usunięcia.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#002a5c]">Jak Aleo weryfikuje prawdziwość opinii i informacji o firmach?</h3>
            <p className="text-gray-700 mt-2">
              Aleo stosuje kilka mechanizmów weryfikacji informacji. Podstawowe dane firmowe są często pobierane z oficjalnych rejestrów gospodarczych i regularnie aktualizowane. Opinie mogą być wystawiane tylko przez zweryfikowanych użytkowników platformy, co zmniejsza ryzyko fałszywych komentarzy. W przypadku zgłoszenia nieprawidłowości, zespół moderacji Aleo analizuje dostarczone przez obie strony dowody i podejmuje decyzję zgodnie z regulaminem platformy. W przypadkach niejednoznacznych Aleo może poprosić o dodatkowe wyjaśnienia lub dokumentację.
            </p>
          </div>
        </div>
      </section>

      {/* Sekcja SocialProof */}
      <section className="bg-white rounded-xl shadow-lg p-6 md:p-14 border border-gray-100 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#002a5c] mb-8">
            Zaufali nam
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-[#f8fafc] p-6 rounded-lg">
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <p className="text-gray-700 italic mb-4">
                    &ldquo;Dzięki Wizaro udało się uporządkować nasz profil na Aleo i usunąć nieaktualne dane. Teraz nasi partnerzy biznesowi mają dostęp do prawdziwych informacji.&rdquo;
                  </p>
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-[#002a5c]">Piotr M.</p>
                  <p className="text-sm text-gray-600">Właściciel hurtowni</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#f8fafc] p-6 rounded-lg">
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <p className="text-gray-700 italic mb-4">
                    &ldquo;Profesjonalna obsługa i szybkie działanie. Problem z nieprawdziwymi opiniami konkurencji został rozwiązany w ciągu kilku dni.&rdquo;
                  </p>
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-[#002a5c]">Katarzyna L.</p>
                  <p className="text-sm text-gray-600">Dyrektor handlowy</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#f8fafc] p-6 rounded-lg">
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <p className="text-gray-700 italic mb-4">
                    &ldquo;Polecam usługi Wizaro każdej firmie, która chce zadbać o swój wizerunek w sektorze B2B. Skuteczne działanie i pełen profesjonalizm.&rdquo;
                  </p>
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-[#002a5c]">Marcin R.</p>
                  <p className="text-sm text-gray-600">CEO firmy produkcyjnej</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Końcowa sekcja z CTA i BusinessTypeSelector */}
      <section className="bg-gradient-to-br from-[#002a5c] to-[#004a8c] rounded-xl shadow-lg p-6 md:p-14 text-white mb-10">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Zabezpiecz reputację swojej firmy w sektorze B2B
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Nie pozwól, aby nieaktualne dane czy nieprawdziwe opinie ograniczały rozwój Twojego biznesu. Działaj teraz!
          </p>
        </div>
        
        <BusinessTypeSelector />
      </section>
    </main>
  );
}
