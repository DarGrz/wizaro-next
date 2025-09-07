//UsuwanieFirmyZGoworkPage.tsx

"use client";

import BusinessTypeSelector from "./BusinessTypeSelector";
import MobileActionButton from "./MobileActionButton";
import BusinessTypeSelectorMobileAleo from "./BusinessTypeSelectorMobileAleo";
import Link from "next/link";

export default function UsuwanieFirmyZGoworkPage() {
  return (
    <div className="min-h-screen mx-auto flex items-center justify-center px-4 flex-col max-w-4xl pt-10">
      {/* Przycisk mobilny */}
      <MobileActionButton />
      
      {/* Główna sekcja z nagłówkiem i selektorem */}
      <div className="gap-6 mb-4 lg:flex hidden md:block">
        <div className="md:p-10 p-4 w-full max-w-lg mt-4 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Usuwanie firmy z GoWork
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Profesjonalne usuwanie profilu firmy z GoWork.pl. 
            Skuteczne usunięcie konta z GoWork, gwarancja rezultatu, płatność po wykonaniu usługi.
          </p>
        </div>

        <BusinessTypeSelector />
      </div>

      {/* Mobilna wersja selektora */}
      <div className="md:gap-8 pt-5 w-full md:hidden block">
        <BusinessTypeSelectorMobileAleo />
      </div>

      {/* Separator */}
      <div className="w-full max-w-4xl px-4">
        <hr className="border-t border-gray-300 my-8" />
      </div>

      {/* CTA telefoniczne */}
      {/* <div className="flex flex-col items-center gap-2 mt-6 mb-10 shadow-lg rounded-lg p-6">
        
        <p className="text-center text-gray-700 font-bold">
          Zadzwoń jeśli masz pytania lub potrzebujesz pomocy
        </p>
        <Link href="tel:+48792861513" className="mx-auto mt-2">
          <button className="bg-[#5BA155] text-white px-6 py-2 rounded font-semibold hover:bg-[#5BA155] transition">
            +48 792 861 513
          </button>
        </Link>
      </div> */}

      {/* Główny artykuł SEO */}
      <article className="w-full max-w-4xl px-4 py-8">
        <div className="prose prose-lg max-w-none">
          
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Usuwanie firmy z GoWork.pl - kompleksowy przewodnik
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Twoje dane i dane Twojej firmy są Twoją wyłączną własnością. Masz pełne prawo 
            do decydowania o tym gdzie są prezentowane i do jakich celów są wykorzystywane, 
            także w GoWork.pl. Możesz chronić swoje dane i dane Twojej firmy lub zlecić 
            ochronę profesjonalistom. Usunięcie firmy z GoWork.pl jest możliwe, w tym także 
            Twoich danych osobowych.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Nie musisz godzić się na komercyjne wykorzystywanie Twoich danych i danych Twojej 
            firmy na stronach internetowych, które nie należą do Ciebie. Profil działalności 
            administratorów GoWork opiera się na wykorzystaniu danych osobowych i firm do 
            budowania struktury stron WWW, indeksowania treści i organicznego pozycjonowania 
            portalu w wynikach wyszukiwania Google.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Dlaczego Twoje dane i dane firmy są w GoWork.pl?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Dane firm, osób prowadzących działalność gospodarczą (JDG), spółek z ograniczoną 
            odpowiedzialnością, spółek akcyjnych, spółek jawnych i cywilnych, a także organizacji 
            pozarządowych takich jak fundacje czy stowarzyszenia nie trafiają przypadkowo do GoWork.pl.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Dane firm przekazywane są do baz strony GoWork.pl z publicznych rejestrów takich jak 
            Centralna Ewidencja Gospodarcza i Rejestru Przedsiębiorców przy Krajowym Rejestrze 
            Sądowym oraz przez czytelników. Trafiają tam, a następnie wykorzystywane są do tworzenia 
            profilów firm i licznych stron, które następnie zgłaszane są do indeksu Google i 
            prezentowane w wynikach wyszukiwania.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            W praktyce takie strony wyświetlane są internautom po wpisaniu słów kluczowych 
            i fraz w Google tożsamych z Twoimi danymi i danymi Twojej firmy, a co najważniejsze 
            generują ruch internetowy w GoWork.pl, który jest niezbędny z punktu widzenia modelu 
            biznesowego administratorów tego typu portali.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Wykorzystanie danych w celach komercyjnych
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Administratorzy stron internetowych, w których publikowane są dane, uważają, że 
            aktualnie obowiązujące przepisy nie zabraniają (a więc &quot;pozwalają&quot;) wykorzystania 
            danych zgromadzonych w CEIDG oraz KRS. Mogą one być publikowane na stronach takich 
            jak GoWork.pl w celach informacyjnych.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            W ocenie ekspertów taka interpretacja przepisów jest niewłaściwa, a sposób i rzeczywisty 
            cel wykorzystania danych jest wyłącznie komercyjny, nie informacyjny. Świadczy o tym 
            fakt, że każda strona, na której prezentowane są dane, jest zgłaszana do indeksu Google 
            i prezentowana w wynikach wyszukiwania - inaczej niż w przypadku rejestrów CEIDG i KRS.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Anonimowe treści w profilu firmy w GoWork.pl
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Na stronach GoWork.pl, na poszczególnych podstronach (tzw. profilach firm), możliwe 
            jest dodawanie anonimowych treści. Dodanie dowolnej treści możliwe jest przez 
            dowolnego użytkownika w zasadzie całkowicie anonimowo, ponieważ w formularzu 
            administrator GoWork.pl nie zastosował mechanizmów weryfikacji tożsamości.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Brak wymogu podania rzeczywistych danych zachęca internautów do dodawania anonimowych 
            treści o wydźwięku pozytywnym i negatywnym, które w praktyce często nie mają nic 
            wspólnego z rzetelną informacją na temat firmy. Często są to treści nieprawdziwe, 
            określane popularnie &quot;hejtem&quot;, a w praktyce naruszające dobra osobiste.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Takie treści istotnie negatywnie wpływają na postrzeganie firmy i jej wizerunek, 
            utrudniają rekrutację pracowników, powodują zmniejszenie liczby klientów, a nawet 
            trudności w relacjach z inwestorami i instytucjami finansowymi.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Jak usunąć firmę i dane z GoWork.pl
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Nie musisz godzić się na przetwarzanie danych przez administratora GoWork.pl i masz 
            pełne prawo zarządzania swoimi danymi i danymi Twojej firmy, niezależnie od tego 
            w jakiej formie organizacyjnej i prawnej działa ona na rynku.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Nie musisz godzić się na utrzymywanie strony (profilu firmy) w GoWork.pl, na której 
            publikowane są anonimowe treści, w tym także takie, które mogą naruszać Twoje dobre 
            imię i w praktyce spowodować, że stracisz klientów. Masz prawo żądać, by Twoje dane 
            zostały usunięte i nie były więcej prezentowane w portalu GoWork.pl.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Metody usuwania firmy z GoWork
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Istnieje kilka skutecznych metod usuwania firmy z GoWork.pl:
          </p>

          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">Usunięcie konta z portalu GoWork.pl</li>
            <li className="mb-2">Usunięcie profilu firmy z GoWork</li>
            <li className="mb-2">Żądanie usunięcia danych na podstawie RODO</li>
            <li className="mb-2">Argumenty prawne dotyczące ochrony dóbr osobistych</li>
            <li className="mb-2">Wykazanie bezprawnego wykorzystania danych</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Proces usuwania krok po kroku
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Proces usuwania firmy z GoWork wymaga systematycznego podejścia i znajomości procedur. 
            Pierwsze kroki obejmują identyfikację wszystkich miejsc, gdzie dane Twojej firmy 
            są prezentowane w serwisie, oraz przygotowanie odpowiedniej dokumentacji prawnej.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Następnie składane są formalne żądania usunięcia danych, powołując się na odpowiednie 
            przepisy prawa, w tym RODO oraz kodeks cywilny w zakresie ochrony dóbr osobistych. 
            W przypadku braku odpowiedzi lub odmowy, możliwe jest podjęcie dalszych kroków prawnych.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Profesjonalne usuwanie danych z GoWork.pl
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Możesz zlecić usuwanie firmy z GoWork profesjonalistom. Będziemy reprezentować Cię 
            do skutku, polubownie i przed właściwym sądem, a naszym celem będzie usunięcie 
            Twoich danych i danych firmy z GoWork.pl, a także z pamięci podręcznej Google.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Podejmiemy dla Ciebie skuteczne działania z zakresu ochrony wizerunku i danych. 
            Pracujemy w modelu success fee, co oznacza, że honorarium naliczamy wyłącznie 
            wtedy, gdy jesteśmy skuteczni. Oferujemy skuteczną ochronę danych osób oraz firm.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Dlaczego warto skorzystać z profesjonalnej pomocy?
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Usuwanie firmy z GoWork.pl wymaga znajomości procedur, przepisów prawnych oraz 
            doświadczenia w komunikacji z administratorami portalu. Profesjonalna obsługa 
            znacznie zwiększa szanse powodzenia i skraca czas potrzebny na osiągnięcie celu.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Dodatkowo, nieprawidłowe podejście do procesu może skutkować odmową usunięcia 
            danych lub nawet pogorszeniem sytuacji. Dlatego warto skorzystać z doświadczenia 
            specjalistów, którzy znają wszystkie aspekty prawne i techniczne tego procesu.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Inne platformy - kompleksowa ochrona danych
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Działania z zakresu ochrony wizerunku i danych prowadzimy także w innych serwisach:
          </p>

          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">Aleo.com - usuwanie firm i opinii</li>
            <li className="mb-2">Biznesfinder.pl - usuwanie profilów firmowych</li>
            <li className="mb-2">Cylex-polska.pl - usuwanie danych firm</li>
            <li className="mb-2">Panoramafirm.pl - usuwanie profilów</li>
            <li className="mb-2">PKT.pl - usuwanie firm i opinii</li>
            <li className="mb-2">Opinia-o-firmie.pl - usuwanie opinii</li>
            <li className="mb-2">Opineo.pl - usuwanie recenzji</li>
            <li className="mb-2">Etransport.pl - usuwanie profilów</li>
            <li className="mb-2">Oferteo.pl - usuwanie danych</li>
            <li className="mb-2">Superpracodawca.pl - usuwanie profilów pracodawców</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Korzyści z usunięcia firmy z GoWork
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Usunięcie firmy z GoWork.pl niesie ze sobą wiele korzyści dla przedsiębiorców. 
            Przede wszystkim odzyskujesz pełną kontrolę nad tym, gdzie i w jaki sposób 
            prezentowane są dane Twojej firmy w internecie.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Eliminujesz ryzyko publikowania nieprawdziwych lub szkodliwych treści na temat 
            Twojej firmy przez anonimowych użytkowników. Dodatkowo przestajesz &quot;pracować&quot; 
            na rzecz portalu, który czerpie korzyści z wykorzystania danych Twojej firmy 
            do generowania ruchu internetowego.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Ochrona wizerunku i reputacji
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Usunięcie profilu firmy z GoWork to ważny element szerszej strategii ochrony 
            wizerunku w internecie. Pozwala to na lepszą kontrolę nad tym, jakie informacje 
            o Twojej firmie są dostępne online i w jakim kontekście są prezentowane.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Podsumowanie - Twoje dane, Twoja decyzja
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Pamiętaj, że dane Twojej firmy to Twoja własność i masz pełne prawo decydować 
            o sposobie ich wykorzystania. Nie musisz godzić się na sytuację, w której 
            zewnętrzny portal czerpie korzyści z prezentowania danych Twojej firmy, 
            szczególnie jeśli wiąże się to z ryzykiem publikowania nieprawdziwych 
            lub szkodliwych treści.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Usunięcie firmy z GoWork.pl jest możliwe i legalne. Możesz to zrobić samodzielnie 
            lub skorzystać z profesjonalnej pomocy, która znacznie zwiększy Twoje szanse 
            na sukces i przyspieszy cały proces.
          </p>

          {/* Powiązane artykuły */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Powiązane usługi usuwania:
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/aleo-jak-usunac-opinie" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Aleo jak usunąć opinie - Profesjonalne usuwanie negatywnych opinii z serwisu Aleo
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-opinie-z-gowork" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Jak usunąć opinie z GoWork - Skuteczne usuwanie opinii z platformy GoWork
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-firme-z-aleo" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Jak usunąć firmę z Aleo - Kompletne usuwanie profilu firmowego z Aleo
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-opinie-z-panoramy-firm" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Usuwanie z Panoramy Firm - Profesjonalne usuwanie opinii z Panoramy Firm
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
            Gotowy na usunięcie firmy z GoWork?
          </h3>
          <p className="mb-6">
            Skontaktuj się ze mną już dziś i otrzymaj bezpłatną konsultację oraz wycenę 
            dostosowaną do specyfiki Twojej sytuacji. Koszt usługi od 300 zł netto.
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
