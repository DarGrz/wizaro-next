//JakUsunacDaneZAleoPage.tsx

"use client";

import BusinessTypeSelector from "./BusinessTypeSelector";
import MobileActionButton from "./MobileActionButton";
import BusinessTypeSelectorMobileAleo from "./BusinessTypeSelectorMobileAleo";
import Link from "next/link";

export default function JakUsunacDaneZAleoPage() {
  return (
    <div className="min-h-screen mx-auto flex items-center justify-center px-4 flex-col max-w-4xl pt-10">
      {/* Przycisk mobilny */}
      <MobileActionButton />
      
      {/* Główna sekcja z nagłówkiem i selektorem */}
      <div className="gap-6 mb-4 lg:flex hidden md:block">
        <div className="md:p-10 p-4 w-full max-w-lg mt-4 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Jak usunąć dane z Aleo?
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Kompletny przewodnik usuwania danych z serwisu Aleo zgodnie z RODO. 
            Profesjonalna pomoc, gwarancja rezultatu, pełna dyskrecja.
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
      <div className="flex flex-col items-center gap-2 mt-6 mb-10 shadow-lg rounded-lg p-6">
        
        <p className="text-center text-gray-700 font-bold">
          Zadzwoń jeśli masz pytania lub potrzebujesz pomocy
        </p>
        <Link href="tel:+48792861513" className="mx-auto mt-2">
          <button className="bg-[#5BA155] text-white px-6 py-2 rounded font-semibold hover:bg-[#5BA155] transition">
            +48 792 861 513
          </button>
        </Link>
      </div>

      {/* Główny artykuł SEO */}
      <article className="w-full max-w-4xl px-4 py-8">
        <div className="prose prose-lg max-w-none">
          
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Jak skutecznie usunąć dane z Aleo - praktyczny przewodnik
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Cześć! Jeśli czytasz ten artykuł, prawdopodobnie szukasz skutecznego sposobu 
            na usunięcie swoich danych z platformy Aleo. To zrozumiałe - w dzisiejszych czasach 
            kontrola nad własnymi danymi osobowymi to nie luksus, ale konieczność. 
            Pokażę Ci, jak krok po kroku usunąć swoje informacje z tego popularnego polskiego serwisu.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Aleo to jedna z największych polskich platform opinii i katalogów firm. 
            Przechowuje ogromne ilości danych - od informacji o firmach, przez opinie użytkowników, 
            po dane kontaktowe i osobowe. Każdy ma prawo kontrolować sposób wykorzystania 
            swoich danych, a w razie potrzeby - żądać ich usunięcia.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Dlaczego warto usunąć dane z Aleo?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Zanim przejdziemy do konkretnych kroków, warto zastanowić się nad powodami, 
            dla których możesz chcieć usunąć swoje dane z Aleo. Znajomość tych przyczyn 
            pomoże Ci lepiej argumentować swoje żądanie i zwiększy szanse powodzenia.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Ochrona prywatności i bezpieczeństwa danych
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Głównym powodem usuwania danych z Aleo jest często troska o prywatność. 
            Im mniej informacji o sobie masz rozproszone po internecie, tym mniejsze 
            ryzyko ich niewłaściwego wykorzystania czy wycieków. To szczególnie ważne 
            w przypadku danych wrażliwych lub biznesowych.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Dodatkowo, każda platforma internetowa stanowi potencjalny punkt ataku 
            dla cyberprzestępców. Usuwając swoje dane z platform, których już nie używasz, 
            zmniejszasz powierzchnię potencjalnego ataku na Twoje informacje osobowe.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Nieprawdziwe lub nieaktualne informacje
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Często dane w Aleo są nieaktualne, nieprawdziwe lub zostały dodane bez Twojej zgody. 
            Może to dotyczyć informacji o Twojej firmie - błędnego adresu, nieaktualnego numeru 
            telefonu czy nieprawdziwego opisu działalności. Takie informacje mogą szkodzić 
            Twojemu biznesowi.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            W przypadku danych osobowych problem może być jeszcze poważniejszy. 
            Nieaktualne informacje mogą prowadzić do problemów z tożsamością, 
            niepożądanych kontaktów czy innych komplikacji w życiu prywatnym czy zawodowym.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Zmiana strategii biznesowej lub osobistej
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Czasami powody usuwania danych z Aleo są związane ze zmianami w życiu osobistym 
            czy biznesowym. Może zamknąłeś firmę, zmieniłeś branżę, przeprowadziłeś się 
            czy po prostu chcesz ograniczyć swoją obecność w internecie.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            W takich przypadkach pozostawienie starych danych w Aleo może wprowadzać 
            w błąd potencjalnych klientów czy kontrahentów. Lepiej jest usunąć nieaktualne 
            informacje niż pozwolić, żeby szkodziły Twojemu obecnemu wizerunkowi.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Twoje prawa wynikające z RODO
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Rozporządzenie o ochronie danych osobowych (RODO) daje Ci mocne narzędzia 
            do kontrolowania sposobu przetwarzania Twoich danych. W kontekście usuwania 
            danych z Aleo najważniejsze są trzy fundamentalne prawa.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Prawo dostępu do danych
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Przed usunięciem danych warto skorzystać z prawa dostępu do informacji 
            o tym, jakie dane o Tobie przetwarza Aleo. Możesz zażądać kopii wszystkich 
            swoich danych osobowych wraz z informacją o celach ich przetwarzania.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Ta informacja pomoże Ci lepiej zrozumieć zakres danych do usunięcia 
            i przygotować precyzyjny wniosek. Im bardziej szczegółowy będzie Twój wniosek, 
            tym większe szanse na jego pozytywne rozpatrzenie przez Aleo.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Prawo do sprostowania
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Jeśli dane w Aleo są nieprawdziwe lub nieaktualne, możesz najpierw spróbować 
            ich sprostowania. Czasami to wystarczy do rozwiązania problemu. Jeśli jednak 
            Aleo nie może lub nie chce sprostować danych, kolejnym krokiem jest żądanie 
            ich usunięcia.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Prawo do sprostowania jest często pierwszym krokiem w procesie oczyszczania 
            swojej obecności w internecie. Warto z niego skorzystać, szczególnie gdy 
            nieprawdziwe informacje mogą szkodzić Twojej reputacji czy interesom.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Prawo do usunięcia danych
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Prawo do usunięcia, czasem nazywane &quot;prawem do bycia zapomnianym&quot;, 
            to najważniejsze narzędzie w kontekście tematu tego artykułu. Pozwala Ci żądać 
            usunięcia swoich danych osobowych w określonych okolicznościach.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Szczególnie mocne podstawy do skorzystania z tego prawa masz, gdy dane nie są 
            już potrzebne do celów, dla których zostały zebrane, gdy cofnąłeś zgodę na ich 
            przetwarzanie, lub gdy dane były przetwarzane niezgodnie z prawem.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Jak usunąć dane z Aleo - szczegółowy przewodnik
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Teraz przejdziemy do najważniejszej części - konkretnych kroków, które musisz 
            podjąć, żeby skutecznie usunąć swoje dane z Aleo. Proces ten wymaga systematycznego 
            podejścia i cierpliwości, ale przy właściwym przeprowadzeniu ma wysokie szanse powodzenia.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Krok 1: Inwentaryzacja danych w Aleo
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Pierwszym krokiem jest dokładne przejrzenie Aleo i zidentyfikowanie wszystkich 
            informacji, które Cię dotyczą. Może to być profil firmy, dane kontaktowe, opinie, 
            które napisałeś, komentarze czy inne treści związane z Twoją osobą lub działalnością.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Warto sporządzić szczegółową listę i zrobić zrzuty ekranu jako dokumentację 
            obecnego stanu. Te materiały będą przydatne przy składaniu wniosku i mogą 
            służyć jako dowód w przypadku ewentualnych sporów z Aleo.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Krok 2: Przygotowanie wniosku RODO
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Wniosek o usunięcie danych musi być przygotowany zgodnie z wymogami RODO. 
            Powinien zawierać Twoje dane identyfikacyjne, precyzyjne określenie danych 
            do usunięcia, podstawę prawną żądania oraz termin na rozpatrzenie sprawy.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Szczególnie ważne jest wskazanie konkretnego artykułu RODO, na podstawie którego 
            żądasz usunięcia. Najczęściej będzie to art. 17 ust. 1 lit. a) - dane nie są 
            już potrzebne do celów, dla których zostały zebrane, lub lit. b) - cofnięcie zgody.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Krok 3: Złożenie wniosku w Aleo
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Wniosek należy wysłać na oficjalny adres e-mail Aleo odpowiedzialny za sprawy 
            ochrony danych osobowych. Warto również wysłać kopię na adres ogólny obsługi 
            klienta i zachować potwierdzenie wysłania wiadomości.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            W treści e-maila powołaj się na konkretne przepisy RODO i jasno sformułuj 
            swoje żądanie. Podkreśl, że oczekujesz odpowiedzi w terminie 30 dni od otrzymania 
            wniosku, zgodnie z art. 12 ust. 3 RODO.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Krok 4: Monitoring i dalsze działania
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Po złożeniu wniosku należy cierpliwie czekać na odpowiedź Aleo i regularnie 
            sprawdzać, czy platforma podjęła działania zgodnie z Twoim żądaniem. 
            Jeśli w terminie 30 dni nie otrzymasz odpowiedzi, możesz przystąpić do dalszych kroków.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            W przypadku braku odpowiedzi lub odmowy usunięcia danych kolejnym krokiem 
            może być skarga do Prezesa Urzędu Ochrony Danych Osobowych. To często skuteczny 
            sposób na wymuszenie respektowania praw wynikających z RODO.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Najczęstsze wyzwania przy usuwaniu danych z Aleo
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Proces usuwania danych z Aleo nie zawsze przebiega bez problemów. 
            Istnieje kilka typowych wyzwań, z którymi możesz się spotkać, oraz sprawdzone 
            sposoby ich rozwiązania. Znajomość tych problemów pomoże Ci lepiej się przygotować.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Wyzwanie 1: Weryfikacja tożsamości
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Aleo może zażądać dodatkowych dokumentów potwierdzających Twoją tożsamość 
            przed usunięciem danych. To normalna procedura mająca na celu ochronę 
            przed nieuprawnionym dostępem do danych innych osób.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Przygotuj się na konieczność dostarczenia kopii dokumentu tożsamości 
            czy innych dokumentów potwierdzających Twoje uprawnienia do żądania usunięcia danych. 
            To może wydłużyć proces, ale jest to zgodne z wymogami bezpieczeństwa.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Wyzwanie 2: Argumenty prawne Aleo
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Aleo może argumentować, że ma prawnie uzasadniony interes w przetwarzaniu 
            Twoich danych lub że dane są potrzebne do realizacji innych celów. 
            Każdy taki argument należy indywidualnie ocenić i ewentualnie zakwestionować.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Warto pamiętać, że obowiązek udowodnienia istnienia prawnie uzasadnionego interesu 
            spoczywa na Aleo, nie na Tobie. Jeśli uważasz, że argumenty platformy są nieuzasadnione, 
            możesz je zakwestionować i żądać ponownego rozpatrzenia sprawy.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Wyzwanie 3: Dane powiązane z innymi użytkownikami
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Szczególnie skomplikowane może być usuwanie danych, które są powiązane 
            z informacjami innych użytkowników - na przykład opinii o Twojej firmie 
            napisanych przez klientów. Aleo może argumentować konieczność ochrony 
            praw innych osób.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            W takich przypadkach często możliwy jest kompromis - częściowe usunięcie 
            lub anonimizacja danych w sposób, który chroni zarówno Twoje prawa, 
            jak i prawa innych użytkowników platformy.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Kiedy warto skorzystać z profesjonalnej pomocy?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Chociaż teoretycznie możesz samodzielnie przeprowadzić proces usuwania danych z Aleo, 
            w praktyce warto rozważyć skorzystanie z profesjonalnej pomocy. Szczególnie w przypadkach 
            skomplikowanych czy gdy zależy Ci na szybkim i skutecznym załatwieniu sprawy.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Złożone przypadki prawne
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Jeśli Twoja sprawa jest skomplikowana - na przykład dotyczy danych biznesowych, 
            opinii napisanych przez innych użytkowników, czy wymaga argumentacji prawnej - 
            profesjonalna pomoc może znacznie zwiększyć szanse powodzenia.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Specjalista zna procedury RODO, ma doświadczenie w komunikacji z platformami 
            internetowymi i wie, jakie argumenty są najskuteczniejsze w różnych sytuacjach. 
            To przekłada się na wyższą skuteczność i krótszy czas realizacji.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Brak czasu lub doświadczenia
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Proces usuwania danych może być czasochłonny i wymaga znajomości skomplikowanych 
            przepisów prawnych. Jeśli nie masz czasu na zajmowanie się tym samodzielnie 
            lub nie czujesz się pewnie w kwestiach prawnych, pomoc specjalisty będzie najlepszym rozwiązaniem.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Zamiast tracić czas na uczenie się procedur i ryzykować błędy, które mogą 
            przedłużyć proces, możesz skupić się na swoich bieżących sprawach, podczas gdy 
            specjalista profesjonalnie zajmie się Twoją sprawą.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Gwarancja rezultatu - płatność za sukces
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Jedną z największych zalet współpracy z profesjonalistą jest możliwość uzyskania 
            gwarancji rezultatu. W przypadku moich usług płacisz tylko wtedy, gdy osiągnę 
            zamierzony cel - skuteczne usunięcie Twoich danych z Aleo.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Taka formuła współpracy minimalizuje Twoje ryzyko finansowe i gwarantuje, 
            że jestem maksymalnie zmotywowany do osiągnięcia sukcesu. Nie płacisz za próby 
            czy starania - płacisz wyłącznie za konkretny rezultat.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Jak długo trwa proces usuwania danych z Aleo?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Czas potrzebny na usunięcie danych z Aleo zależy od wielu czynników - rodzaju danych, 
            złożoności sprawy, reakcji administracji platformy i ewentualnych komplikacji prawnych. 
            W prostych przypadkach proces może zająć kilka tygodni.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Bardziej skomplikowane sprawy mogą wymagać kilku miesięcy, szczególnie jeśli 
            konieczne są dodatkowe działania prawne czy komunikacja z organami nadzorczymi. 
            Kluczowe jest realistyczne podejście do terminarów i cierpliwe prowadzenie sprawy.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Co zrobić po usunięciu danych z Aleo?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Po skutecznym usunięciu danych z Aleo warto podjąć działania prewencyjne, 
            żeby uniknąć podobnych problemów w przyszłości. Przede wszystkim, regularnie 
            monitoruj swoją obecność w internecie i szybko reaguj na niepożądane treści.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Rozważ także ograniczenie ilości danych osobowych, które udostępniasz 
            w internecie. Mniejsza powierzchnia cyfrowa oznacza mniejsze ryzyko problemów 
            z prywatnością i bezpieczeństwem danych w przyszłości.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Podsumowanie - kontrola nad swoimi danymi
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Usuwanie danych z Aleo to proces, który wymaga systematycznego podejścia, 
            znajomości przepisów RODO i cierpliwości. Choć może wydawać się skomplikowany, 
            przy właściwym przygotowaniu ma wysokie szanse powodzenia.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Pamiętaj, że kontrola nad swoimi danymi osobowymi to Twoje fundamentalne prawo. 
            Nie wahaj się z niego korzystać, gdy czujesz, że Twoje dane są wykorzystywane 
            w sposób, z którym się nie zgadzasz, lub gdy po prostu chcesz ograniczyć 
            swoją obecność w internecie.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Jeśli potrzebujesz pomocy w usunięciu swoich danych z Aleo, nie wahaj się 
            skontaktować ze mną już dziś. Pierwsza konsultacja jest bezpłatna, a dzięki 
            gwarancji rezultatu płacisz tylko za sukces. Razem możemy skutecznie oczyścić 
            Twoją obecność w internecie.
          </p>

          <p className="text-gray-700 mb-8 leading-relaxed font-semibold">
            Zadzwoń już dziś i odzyskaj pełną kontrolę nad swoimi danymi w Aleo!
          </p>

          {/* Sekcja z linkami do powiązanych usług */}
          <div className="w-full max-w-4xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Sprawdź nasze inne usługi usuwania treści
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/jak-usunac-opinie-z-aleo" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Jak usunąć opinie z Aleo - Szczegółowy przewodnik usuwania opinii z serwisu Aleo
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-firme-z-aleo" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Usuwanie firmy z Aleo - Profesjonalne usuwanie profili firm z platformy Aleo
                </Link>
              </li>
              <li>
                <Link href="/aleo-jak-usunac-opinie" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Aleo jak usunąć opinie - Profesjonalne usuwanie negatywnych opinii z serwisu Aleo
                </Link>
              </li>
              <li>
                <Link href="/aleo-jak-usunac-dane" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Aleo jak usunąć dane - Usuwanie danych osobowych i firmowych z serwisu Aleo
                </Link>
              </li>
              <li>
                <Link href="/usuwanie-aleo" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Ogólne usuwanie z Aleo - Kompleksowe usługi usuwania różnych treści z serwisu Aleo
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-opinie-z-gowork" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Usuwanie z GoWork - Profesjonalne usuwanie opinii z platformy GoWork
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
            Gotowy na usunięcie swoich danych z Aleo?
          </h3>
          <p className="mb-6">
            Skontaktuj się ze mną już dziś i otrzymaj bezpłatną konsultację RODO 
            oraz profesjonalną pomoc w usuwaniu danych.
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
