//AleoDanePage.tsx

"use client";

import BusinessTypeSelector from "./BusinessTypeSelector";
import MobileActionButton from "./MobileActionButton";
import BusinessTypeSelectorMobileAleo from "./BusinessTypeSelectorMobileAleo";
import Link from "next/link";

export default function AleoDanePage() {
  return (
    <div className="min-h-screen mx-auto flex items-center justify-center px-4 flex-col max-w-4xl pt-10">
      {/* Przycisk mobilny */}
      <MobileActionButton />
      
      {/* Główna sekcja z nagłówkiem i selektorem */}
      <div className="gap-6 mb-4 lg:flex hidden md:block">
        <div className="md:p-10 p-4 w-full max-w-lg mt-4 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Aleo jak usunąć dane?
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Profesjonalne usuwanie danych osobowych i firmowych z serwisu Aleo. 
            Skuteczne metody zgodne z RODO, gwarancja rezultatu.
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
            Aleo jak usunąć dane - kompletny przewodnik RODO
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Cześć! Jeśli szukasz informacji o tym, jak usunąć swoje dane z serwisu Aleo, 
            trafiłeś we właściwe miejsce. Usuwanie danych osobowych z platform internetowych 
            to Twoje podstawowe prawo wynikające z rozporządzenia RODO, a ja pokażę Ci, 
            jak skutecznie je realizować w przypadku serwisu Aleo.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Aleo, jako jedna z największych polskich platform opinii, przechowuje różnego 
            rodzaju dane - od podstawowych informacji o firmach, przez dane kontaktowe, 
            po treści opinii i komentarzy. Każdy ma prawo kontrolować sposób, w jaki 
            jego dane są wykorzystywane, a w razie potrzeby - żądać ich usunięcia.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Jakie dane przechowuje Aleo i dlaczego warto je usunąć?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Zanim przejdziemy do konkretnych metod usuwania, warto zrozumieć, jakie dane 
            może przechowywać o Tobie serwis Aleo. Ta znajomość pomoże Ci skuteczniej 
            komunikować się z administracją platformy i precyzyjnie określić, co chcesz usunąć.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Dane firmowe w Aleo
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Jeśli prowadzisz działalność gospodarczą, Aleo może przechowywać informacje 
            o Twojej firmie - nazwę, adres, numer telefonu, opis działalności, godziny 
            otwarcia i inne dane kontaktowe. Te informacje mogą zostać dodane przez Ciebie, 
            innych użytkowników lub zaimportowane z publicznych baz danych.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Czasami dane firmowe w Aleo są nieprawdziwe, nieaktualne lub zostały dodane 
            bez Twojej zgody. W takich przypadkach masz pełne prawo żądać ich korekty 
            lub całkowitego usunięcia z platformy.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Dane osobowe użytkowników
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Jeśli korzystałeś z Aleo jako użytkownik - wystawiałeś opinie, komentowałeś, 
            czy po prostu zarejestrowałeś konto - platforma przechowuje Twoje dane osobowe: 
            imię, nazwisko, adres e-mail, a także historię Twoich aktywności na platformie.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Zgodnie z RODO masz prawo do usunięcia tych danych, szczególnie jeśli nie 
            korzystasz już z usług Aleo lub zmieniły się okoliczności, które początkowo 
            uzasadniały przetwarzanie Twoich danych.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Opinie i komentarze
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Wszystkie opinie i komentarze, które napisałeś na Aleo, także stanowią Twoje 
            dane osobowe w rozumieniu RODO. Masz prawo żądać ich usunięcia, szczególnie 
            jeśli żałujesz ich publikacji lub zmieniły się okoliczności, które wpłynęły 
            na Twoją ocenę.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Warto pamiętać, że usunięcie własnych opinii to coś innego niż usuwanie opinii 
            innych osób o Twojej firmie. W pierwszym przypadku korzystasz z prawa do usunięcia 
            swoich danych, w drugim - musisz wykazać, że opinia narusza regulamin lub prawo.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            RODO i Twoje prawa w kontekście Aleo
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Rozporządzenie o ochronie danych osobowych (RODO) daje Ci szereg praw dotyczących 
            Twoich danych osobowych. W kontekście Aleo najważniejsze są prawo do usunięcia 
            danych, prawo do sprostowania oraz prawo do ograniczenia przetwarzania.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Prawo do usunięcia (prawo do bycia zapomnianym)
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Prawo do usunięcia, często nazywane &quot;prawem do bycia zapomnianym&quot;, pozwala Ci 
            żądać usunięcia swoich danych osobowych w określonych okolicznościach. W przypadku 
            Aleo możesz z niego skorzystać, gdy dane nie są już potrzebne do celów, dla których 
            zostały zebrane.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Szczególnie mocne podstawy do skorzystania z prawa do usunięcia masz, gdy 
            cofnąłeś zgodę na przetwarzanie danych, dane były przetwarzane niezgodnie z prawem, 
            lub gdy usunięcie jest konieczne dla wykonania obowiązku prawnego.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Prawo do sprostowania danych
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Jeśli dane o Twojej firmie w Aleo są nieprawdziwe lub nieaktualne, masz prawo 
            żądać ich sprostowania. To szczególnie ważne w przypadku danych kontaktowych - 
            błędny numer telefonu czy adres mogą szkodzić Twojemu biznesowi.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Prawo do sprostowania jest często pierwszym krokiem przed żądaniem usunięcia danych. 
            Jeśli Aleo nie może lub nie chce sprostować danych, możesz żądać ich całkowitego 
            usunięcia z platformy.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Prawo do ograniczenia przetwarzania
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Prawo do ograniczenia przetwarzania pozwala Ci żądać, aby Aleo przestało aktywnie 
            wykorzystywać Twoje dane, ale nie usuwało ich całkowicie. To rozwiązanie pośrednie, 
            które można wykorzystać w spornych sytuacjach.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Na przykład, jeśli kwestionujesz prawidłość danych w Aleo, możesz żądać ograniczenia 
            ich przetwarzania do czasu wyjaśnienia sprawy. To zabezpiecza Cię przed dalszym 
            wykorzystywaniem nieprawdziwych informacji.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Jak skutecznie usunąć dane z Aleo - krok po kroku
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Proces usuwania danych z Aleo wymaga systematycznego podejścia i znajomości 
            procedur RODO. Nie wystarczy po prostu napisać &quot;usuńcie moje dane&quot; - trzeba 
            przygotować odpowiednie zgłoszenie i skutecznie argumentować swoje żądanie.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Krok 1: Identyfikacja danych do usunięcia
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Pierwszym krokiem jest precyzyjne określenie, jakie dane chcesz usunąć z Aleo. 
            Przejrzyj platformę i sporządź listę wszystkich informacji, które Cię dotyczą - 
            profil firmy, opinie, komentarze, dane kontaktowe.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Im bardziej precyzyjnie określisz, co chcesz usunąć, tym łatwiej będzie Aleo 
            rozpatrzyć Twoje żądanie. Warto także udokumentować obecny stan danych - 
            zrób zrzuty ekranu, które mogą być przydatne w dalszej komunikacji.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Krok 2: Przygotowanie formalnego wniosku RODO
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Wniosek o usunięcie danych z Aleo musi być sformułowany zgodnie z wymogami RODO. 
            Powinien zawierać Twoje dane identyfikacyjne, precyzyjne określenie danych do usunięcia 
            oraz podstawę prawną Twojego żądania.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Szczególnie ważne jest wskazanie konkretnego artykułu RODO, na podstawie którego 
            żądasz usunięcia danych. Może to być art. 17 (prawo do usunięcia), art. 16 
            (prawo do sprostowania) czy art. 18 (prawo do ograniczenia przetwarzania).
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Krok 3: Złożenie wniosku i komunikacja z Aleo
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Wniosek należy złożyć na oficjalny adres e-mail Aleo odpowiedzialny za ochronę danych 
            osobowych. Warto również wysłać kopię na adres ogólny obsługi klienta, aby zwiększyć 
            szanse na szybkie rozpatrzenie sprawy.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Aleo ma 30 dni na rozpatrzenie Twojego wniosku i udzielenie odpowiedzi. W tym czasie 
            może poprosić o dodatkowe informacje lub dokumenty potrzebne do weryfikacji Twojej 
            tożsamości i uprawnień.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Krok 4: Monitoring i ewentualne działania dodatkowe
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Po złożeniu wniosku warto regularnie sprawdzać, czy Aleo odpowiedziało i czy podjęło 
            działania zgodnie z Twoim żądaniem. Jeśli platforma nie odpowie w terminie lub 
            odrzuci wniosek bez uzasadnienia, możesz złożyć skargę do organu nadzorczego.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            W Polsce organem nadzorczym w sprawach ochrony danych osobowych jest Prezes 
            Urzędu Ochrony Danych Osobowych. Skarga do PUODO może być skutecznym sposobem 
            na wymuszenie na Aleo respektowania Twoich praw wynikających z RODO.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Najczęstsze problemy przy usuwaniu danych z Aleo
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Proces usuwania danych z Aleo nie zawsze przebiega gładko. Istnieje kilka typowych 
            problemów, z którymi możesz się spotkać, oraz sprawdzone sposoby ich rozwiązania.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Problem 1: Brak odpowiedzi od Aleo
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Jednym z najczęstszych problemów jest brak reakcji ze strony Aleo na złożony wniosek 
            o usunięcie danych. Platforma może nie odpowiedzieć wcale lub przekroczyć 30-dniowy 
            termin przewidziany w RODO.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            W takich przypadkach warto przypomnieć o swoim wniosku, wysyłając go ponownie 
            z zaznaczeniem, że jest to przypomnienie. Jeśli to nie przyniesie efektu, 
            kolejnym krokiem jest skarga do PUODO.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Problem 2: Odmowa usunięcia danych
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Aleo może odmówić usunięcia danych, powołując się na różne podstawy prawne - 
            interes prawnie uzasadniony, konieczność przetwarzania dla celów archiwalnych 
            czy ochronę wolności wypowiedzi innych użytkowników.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Każda odmowa musi być szczegółowo uzasadniona. Jeśli uważasz, że argumenty Aleo 
            są niewłaściwe, możesz zakwestionować decyzję i żądać ponownego rozpatrzenia sprawy 
            lub złożyć skargę do organu nadzorczego.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Problem 3: Częściowe usunięcie danych
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Czasami Aleo usuwa tylko część żądanych danych, argumentując, że pozostałe informacje 
            są konieczne do funkcjonowania platformy lub ochrony praw innych użytkowników. 
            Taka sytuacja wymaga indywidualnej oceny.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Warto przeanalizować, czy argumenty Aleo są zasadne, i ewentualnie negocjować 
            zakres usuwanych danych. Niektóre informacje rzeczywiście mogą być konieczne 
            do zachowania, ale większość danych osobowych powinna podlegać usunięciu.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Dlaczego warto skorzystać z profesjonalnej pomocy?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Usuwanie danych z platform internetowych to proces, który wymaga znajomości 
            przepisów RODO, procedur poszczególnych platform i umiejętności skutecznej 
            komunikacji z administratorami danych. Pomoc specjalisty może znacznie zwiększyć 
            Twoje szanse powodzenia.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Przede wszystkim, profesjonalna pomoc oznacza oszczędność czasu. Zamiast uczyć się 
            skomplikowanych przepisów i procedur, możesz skupić się na swoich bieżących sprawach, 
            podczas gdy specjalista zajmie się Twoją sprawą.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Znajomość przepisów i procedur
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            RODO to skomplikowany akt prawny, a każda platforma ma swoje specyficzne procedury 
            obsługi wniosków o usunięcie danych. Znajomość tych regulacji i doświadczenie 
            w ich stosowaniu znacznie zwiększa skuteczność działań.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Specjalista wie, jak przygotować wniosek, żeby miał największe szanse powodzenia, 
            jakich argumentów użyć i jak skutecznie komunikować się z administracją platformy. 
            To przekłada się na wyższą skuteczność i krótszy czas realizacji.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Doświadczenie w komunikacji z platformami
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Każda platforma ma swoją kulturę komunikacji i specyficzne podejście do wniosków 
            RODO. Doświadczenie w pracy z różnymi platformami, w tym z Aleo, pozwala na 
            dostosowanie strategii komunikacji do konkretnego przypadku.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Wiem, jakie argumenty są najskuteczniejsze w kontakcie z Aleo, jak przygotować 
            dokumentację i w jaki sposób prowadzić korespondencję, żeby osiągnąć zamierzony cel 
            w możliwie najkrótszym czasie.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Gwarancja rezultatu przy usuwaniu danych z Aleo
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Oferuję gwarancję rezultatu przy usuwaniu danych z Aleo - płacisz tylko wtedy, 
            gdy osiągniemy zamierzony cel. To oznacza, że to ja biorę na siebie ryzyko niepowodzenia 
            i jestem motywowany do jak najskuteczniejszego działania.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Taka formuła współpracy jest możliwa dzięki wysokiej skuteczności moich metod 
            i wieloletniemu doświadczeniu w usuwaniu danych z platform internetowych. 
            Jestem na tyle pewny swoich umiejętności, że mogę sobie pozwolić na tak odważną gwarancję.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Jak długo trwa proces usuwania danych z Aleo?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Czas usuwania danych z Aleo zależy od kilku czynników - rodzaju danych, złożoności 
            sprawy i reakcji administracji platformy. W prostych przypadkach proces może zająć 
            kilka tygodni, w bardziej skomplikowanych - kilka miesięcy.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Warto pamiętać, że RODO daje platformom 30 dni na rozpatrzenie wniosku, ale ten 
            termin może zostać przedłużony o kolejne 60 dni w skomplikowanych przypadkach. 
            Kluczowe jest cierpliwe i konsekwentne prowadzenie sprawy.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Co po usunięciu danych z Aleo?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Po skutecznym usunięciu danych z Aleo warto podjąć działania zapobiegawcze, 
            żeby uniknąć podobnych problemów w przyszłości. Przede wszystkim, regularnie 
            monitoruj swoją obecność w internecie i reaguj na niepożądane treści jak najszybciej.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Warto również przemyśleć swoją strategię zarządzania danymi osobowymi. 
            Im mniej informacji o sobie udostępniasz w internecie, tym mniejsze ryzyko 
            problemów z ich niewłaściwym wykorzystaniem.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Podsumowanie - Twoje prawa w erze RODO
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            RODO dało Ci silne narzędzia do kontrolowania sposobu przetwarzania Twoich danych 
            osobowych. Usuwanie danych z platform takich jak Aleo to nie tylko możliwość, 
            ale Twoje podstawowe prawo, które można skutecznie realizować.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Kluczem do sukcesu jest właściwe przygotowanie wniosku, znajomość procedur 
            i cierpliwe prowadzenie sprawy. Jeśli nie masz czasu czy doświadczenia, 
            aby zająć się tym samodzielnie, profesjonalna pomoc może być najlepszym rozwiązaniem.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Jeśli potrzebujesz pomocy w usunięciu danych z Aleo, nie wahaj się skontaktować 
            ze mną już dziś. Pierwsza konsultacja jest bezpłatna, a dzięki gwarancji rezultatu 
            płacisz tylko za sukces. Razem możemy skutecznie oczyścić Twoją obecność w internecie.
          </p>

          <p className="text-gray-700 mb-8 leading-relaxed font-semibold">
            Zadzwoń już dziś i odzyskaj kontrolę nad swoimi danymi w Aleo!
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
                <Link href="/jak-usunac-dane-z-aleo" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Jak usunąć dane z Aleo - Kompleksowe usuwanie wszelkich danych z platformy Aleo
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
            oraz wycenę dostosowaną do specyfiki Twojej sytuacji.
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
