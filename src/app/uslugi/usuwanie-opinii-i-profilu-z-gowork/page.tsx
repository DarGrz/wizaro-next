'use client';

import React from "react";
import Link from "next/link";
import { Briefcase, Shield, Eye, AlertTriangle, FileText } from 'lucide-react';

export default function UsuwanieOpiniiGoWorkPage() {
  return (
    <main className="max-w-5xl mx-auto px-2 md:px-8 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#002a5c] mb-8 text-center">
        Usuwanie Opinii i Profilu z GoWork
      </h1>

      {/* Sekcja wstępna */}
      <section className="bg-white rounded-xl shadow p-6 md:p-14 border border-gray-100 mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-[#002a5c] mb-4">
          Dlaczego zarządzanie profilem i opiniami w GoWork jest ważne dla Twojej firmy?
        </h2>
        <p className="text-gray-800 leading-relaxed mb-4">
          Portal GoWork to jedna z najpopularniejszych w Polsce platform, gdzie obecni i byli pracownicy dzielą się opiniami o pracodawcach. Opinie te są powszechnie widoczne i mogą znacząco wpływać na postrzeganie Twojej firmy przez potencjalnych kandydatów, partnerów biznesowych oraz klientów.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Negatywne opinie w GoWork, nawet jeśli są nieuzasadnione lub wprowadzające w błąd, mogą utrudniać rekrutację wartościowych pracowników, obniżać morale obecnego zespołu oraz szkodzić wizerunkowi marki. W skrajnych przypadkach, profil z wieloma krytycznymi komentarzami może stać się poważną przeszkodą w rozwoju biznesu.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Istnieją różne sytuacje, w których zarządzanie profilem na GoWork staje się koniecznością. Może to być przypadek nieaktualnego profilu firmy, która zmieniła właściciela lub przeszła gruntowną transformację kulturową. Mogą to być również nieprawdziwe lub złośliwe opinie pozostawione przez osoby, które nigdy nie były pracownikami, albo profil stworzony bez Twojej wiedzy i zgody.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          W Wizaro.pl rozumiemy, jak ważna jest reputacja pracodawcy i oferujemy kompleksowe wsparcie w zakresie zarządzania profilami na platformach takich jak GoWork. Nasze działania są zawsze zgodne z regulaminem serwisu oraz obowiązującym prawem, zapewniając skuteczne i etyczne rozwiązania problemów wizerunkowych.
        </p>

        <div className="flex justify-center mt-8">
          <Link href="/formularz-profil" className="bg-[#002a5c] hover:bg-[#004a8c] text-white font-bold py-3 px-6 rounded-full transition-colors duration-300">
            Skonsultuj swój przypadek z ekspertem
          </Link>
        </div>
      </section>

      {/* Sekcja o wyzwaniach */}
      <section className="bg-white rounded-xl shadow p-6 md:p-14 border border-gray-100 mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-[#002a5c] mb-4">
          5 najczęstszych wyzwań związanych z profilem w GoWork
        </h2>
        
        <div className="space-y-8 mt-6">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] shrink-0">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#002a5c]">Fałszywe opinie</h3>
              <p className="text-gray-700 mt-2">
                Nieprawdziwe opinie wystawiane przez osoby, które nigdy nie były pracownikami firmy, to poważny problem. Mogą one pochodzić od konkurencji, niezadowolonych klientów lub osób trzecich z osobistymi pobudkami. Takie komentarze często zawierają nieprawdziwe informacje, które mogą zniekształcać rzeczywisty obraz firmy jako pracodawcy.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] shrink-0">
              <Briefcase size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#002a5c]">Nieaktualne informacje o firmie</h3>
              <p className="text-gray-700 mt-2">
                Firmy ewoluują - zmieniają strukturę, kulturę organizacyjną, warunki zatrudnienia czy politykę wynagradzania. Opinie sprzed kilku lat mogą nie odzwierciedlać obecnej sytuacji, a mimo to nadal wpływać na decyzje potencjalnych kandydatów. Brak możliwości aktualizacji lub oznaczenia komentarzy jako historyczne stanowi istotne wyzwanie.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] shrink-0">
              <Eye size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#002a5c]">Brak kontroli nad profilem</h3>
              <p className="text-gray-700 mt-2">
                Wiele firm odkrywa swój profil na GoWork dopiero wtedy, gdy pojawią się tam negatywne opinie. Brak oficjalnego zarządzania profilem oznacza, że firma nie może dodać własnego opisu, zaktualizować danych kontaktowych czy reagować na komentarze. To utrudnia budowanie prawdziwego obrazu organizacji.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] shrink-0">
              <Shield size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#002a5c]">Naruszenia prywatności i regulaminu</h3>
              <p className="text-gray-700 mt-2">
                Niektóre opinie na GoWork zawierają treści, które naruszają regulamin platformy lub przepisy o ochronie danych osobowych - na przykład wymieniają z imienia i nazwiska pracowników, zawierają wulgaryzmy lub oszczerstwa. Identyfikacja takich komentarzy i skuteczne zgłaszanie ich do administratorów wymaga znajomości zarówno regulaminu, jak i prawa.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] shrink-0">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#002a5c]">Trudności w usunięciu lub edycji profilu</h3>
              <p className="text-gray-700 mt-2">
                W niektórych sytuacjach firma może potrzebować całkowitego usunięcia profilu z GoWork - na przykład po fuzji, zmianie nazwy lub zamknięciu działalności. Proces ten bywa skomplikowany i wymaga odpowiedniego przygotowania dokumentacji oraz znajomości procedur serwisu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja o procesie usuwania */}
      <section className="bg-white rounded-xl shadow p-6 md:p-14 border border-gray-100 mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-[#002a5c] mb-4">
          Proces usuwania opinii i profilu z GoWork - co warto wiedzieć
        </h2>
        <p className="text-gray-800 leading-relaxed mb-4">
          Usuwanie negatywnych opinii lub całego profilu z portalu GoWork to proces, który wymaga zrozumienia zasad działania platformy, znajomości regulaminu oraz cierpliwości. Portal ten, podobnie jak większość serwisów z opiniami, ma własne procedury weryfikacji zgłoszeń, które nie zawsze są intuicyjne dla użytkowników.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Przede wszystkim należy wiedzieć, że GoWork nie usuwa opinii tylko dlatego, że są negatywne. Każdy pracownik ma prawo wyrazić swoją subiektywną ocenę byłego lub obecnego pracodawcy. Usunięcie opinii jest możliwe tylko wtedy, gdy narusza ona regulamin serwisu - zawiera treści obraźliwe, wulgarne, mowę nienawiści, narusza dobra osobiste konkretnych osób lub stanowi pomówienie.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          W przypadku fałszywych opinii, które nie pochodzą od rzeczywistych pracowników, proces jest bardziej złożony. GoWork wymaga przedstawienia dowodów, które potwierdzą, że autor opinii nie był zatrudniony w firmie. Może to być trudne, zwłaszcza gdy komentarze są anonimowe, a firma nie ma pełnej dokumentacji wszystkich osób, które kiedykolwiek w niej pracowały.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Warto również pamiętać, że zgłoszenie opinii nie gwarantuje jej usunięcia. Każde zgłoszenie jest analizowane indywidualnie przez zespół moderatorów GoWork, którzy podejmują decyzję na podstawie treści opinii, dostarczonych dowodów oraz zgodności z regulaminem. Proces ten może trwać od kilku dni do kilku tygodni.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Jeśli chodzi o usunięcie całego profilu firmy, jest to możliwe tylko w określonych okolicznościach, takich jak zamknięcie działalności, zmiana nazwy prawnej firmy lub fuzja. W takich przypadkach konieczne jest dostarczenie odpowiedniej dokumentacji, która potwierdzi zmiany prawne lub organizacyjne. Sam fakt niezadowolenia z opinii nie jest wystarczającym powodem do usunięcia profilu.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          W Wizaro.pl specjalizujemy się w prowadzeniu tych procesów w sposób zgodny z regulaminem i skuteczny. Nasza wiedza ekspercka, doświadczenie oraz znajomość mechanizmów działania portalu GoWork pozwalają nam osiągać pozytywne rezultaty tam, gdzie indywidualne działania mogą okazać się nieskuteczne.
        </p>
      </section>

      {/* Sekcja o legalnych metodach */}
      <section className="bg-white rounded-xl shadow p-6 md:p-14 border border-gray-100 mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-[#002a5c] mb-4">
          Legalne metody zarządzania opiniami w GoWork
        </h2>
        <p className="text-gray-800 leading-relaxed mb-4">
          Zarządzanie opinami w serwisie GoWork musi odbywać się w zgodzie z regulaminem platformy oraz obowiązującym prawem. Istnieje kilka legalnych i etycznych metod, które pozwalają skutecznie dbać o wizerunek firmy bez naruszania zasad.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Pierwszą metodą jest oficjalne przejęcie kontroli nad profilem firmy. GoWork umożliwia pracodawcom zarządzanie swoim profilem po odpowiedniej weryfikacji. Dzięki temu można dodać oficjalny opis firmy, aktualne informacje kontaktowe, zdjęcia z biura czy aktualności dotyczące kultury organizacyjnej. Kontrola nad profilem daje również możliwość odpowiadania na opinie pracowników, co jest kluczowe w budowaniu wizerunku odpowiedzialnego pracodawcy.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Drugą metodą jest merytoryczne odpowiadanie na opinie. Wiele firm obawia się reagować na negatywne komentarze, podczas gdy profesjonalna i rzeczowa odpowiedź może znacząco zmienić odbiór opinii przez innych użytkowników. Odpowiedzi powinny być wyważone, bez emocji, pokazujące perspektywę firmy i ewentualne działania naprawcze, które zostały podjęte w odpowiedzi na zgłoszone problemy.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Trzecią metodą jest zgłaszanie opinii, które naruszają regulamin GoWork. Platforma umożliwia zgłaszanie komentarzy zawierających treści obraźliwe, wulgarne, nieprawdziwe lub naruszające dobra osobiste. Aby zgłoszenie było skuteczne, należy dokładnie wskazać, które fragmenty opinii są problematyczne i dlaczego uważamy, że naruszają one zasady serwisu.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Czwartą metodą jest zachęcanie zadowolonych pracowników do dzielenia się swoimi pozytywnymi doświadczeniami. To całkowicie legalne działanie, pod warunkiem, że opinie są autentyczne i nie są wymuszane. Informowanie zespołu o istnieniu profilu na GoWork i wartości, jaką mają szczere opinie dla przyszłych kandydatów, może naturalnie zwiększyć liczbę pozytywnych komentarzy.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          W przypadku szczególnie krzywdzących opinii, które mogą zostać uznane za zniesławienie lub naruszenie dóbr osobistych, możliwe jest również podjęcie kroków prawnych. Jest to jednak ostateczność, stosowana tylko w sytuacjach, gdy inne metody zawiodły, a treść opinii powoduje realne szkody wizerunkowe lub finansowe.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Warto podkreślić, że niezależnie od wybranej metody, kluczowe jest przestrzeganie zasad etyki i transparentności. Wszelkie niedozwolone praktyki, takie jak tworzenie fałszywych kont czy próby zastraszania autorów opinii, mogą przynieść efekt odwrotny do zamierzonego i dodatkowo zaszkodzić wizerunkowi firmy.
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
            <h3 className="text-lg font-semibold text-[#002a5c]">Czy każdą negatywną opinię na GoWork można usunąć?</h3>
            <p className="text-gray-700 mt-2">
              Nie, nie każda negatywna opinia kwalifikuje się do usunięcia. GoWork usuwa tylko te opinie, które naruszają regulamin serwisu - zawierają wulgaryzmy, mowę nienawiści, treści obraźliwe lub są ewidentnie nieprawdziwe i można to udowodnić. Subiektywne opinie byłych pracowników, nawet jeśli są krytyczne, ale napisane w sposób kulturalny i odnoszące się do rzeczywistych doświadczeń, zazwyczaj pozostają na platformie.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#002a5c]">Jak długo trwa proces usuwania opinii lub profilu?</h3>
            <p className="text-gray-700 mt-2">
              Czas potrzebny na usunięcie opinii lub profilu z GoWork zależy od wielu czynników, w tym od rodzaju zgłoszenia, jakości dostarczonych dowodów oraz aktualnego obciążenia zespołu moderatorów. Standardowo proces ten może trwać od kilku dni do kilku tygodni. W przypadku bardziej złożonych spraw, wymagających dodatkowej weryfikacji lub konsultacji prawnej, może to zająć nawet dłużej.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#002a5c]">Czy firma może samodzielnie usunąć swój profil z GoWork?</h3>
            <p className="text-gray-700 mt-2">
              Firma nie może samodzielnie usunąć swojego profilu z GoWork. Usunięcie profilu wymaga kontaktu z administracją serwisu i jest możliwe tylko w określonych przypadkach, takich jak zamknięcie działalności, zmiana nazwy prawnej czy fuzja. Konieczne jest dostarczenie odpowiedniej dokumentacji potwierdzającej te zmiany. Sam fakt, że profil zawiera negatywne opinie, nie jest wystarczającym powodem do jego usunięcia.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#002a5c]">Czy mogę dowiedzieć się, kto napisał anonimową opinię o mojej firmie?</h3>
            <p className="text-gray-700 mt-2">
              GoWork chroni anonimowość użytkowników i nie udostępnia danych autorów opinii nawet właścicielom firm. Jedyny wyjątek stanowią sytuacje, gdy sąd nakaże ujawnienie tych informacji w ramach postępowania sądowego, np. w sprawie o zniesławienie. W praktyce jednak nawet wtedy uzyskanie tych danych może być trudne, ponieważ serwis może nie posiadać pełnych informacji o użytkownikach.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#002a5c]">Jakie konsekwencje grożą za próby manipulowania opiniami?</h3>
            <p className="text-gray-700 mt-2">
              Próby manipulowania opiniami poprzez niedozwolone praktyki, takie jak tworzenie fałszywych kont, kupowanie opinii czy zastraszanie autorów negatywnych komentarzy, mogą skutkować poważnymi konsekwencjami. GoWork może zablokować firmie możliwość zarządzania profilem, oznaczać opinię jako podejrzane, a w skrajnych przypadkach nawet zawiadomić odpowiednie organy. Dodatkowo, jeśli takie praktyki wyjdą na jaw, mogą one znacząco zaszkodzić wizerunkowi firmy, pogłębiając problem, który miały rozwiązać.
            </p>
          </div>
        </div>
      </section>

      {/* Sekcja podsumowująca */}
      <section className="bg-white rounded-xl shadow p-6 md:p-14 border border-gray-100">
        <h2 className="text-xl md:text-2xl font-bold text-[#002a5c] mb-4">
          Jak możemy pomóc w zarządzaniu Twoim profilem na GoWork?
        </h2>
        <p className="text-gray-800 leading-relaxed mb-4">
          W Wizaro.pl oferujemy kompleksowe wsparcie w zakresie zarządzania profilem i opiniami na portalu GoWork. Nasze usługi są zawsze zgodne z regulaminem platformy oraz obowiązującym prawem, co zapewnia bezpieczeństwo i skuteczność podejmowanych działań.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Nasz zespół ekspertów przeprowadzi dokładną analizę Twojego profilu, zidentyfikuje opinie naruszające regulamin oraz zaproponuje konkretną strategię działania dostosowaną do Twoich potrzeb. Możemy pomóc w oficjalnym przejęciu kontroli nad profilem, przygotowaniu profesjonalnych odpowiedzi na opinie pracowników oraz skutecznym zgłaszaniu komentarzy, które łamią zasady serwisu.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          W uzasadnionych przypadkach wspieramy również w procesie usunięcia całego profilu firmy, przygotowując niezbędną dokumentację i prowadząc komunikację z administracją GoWork. Nasze wieloletnie doświadczenie i znajomość procedur pozwalają nam osiągać pozytywne rezultaty nawet w skomplikowanych sytuacjach.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Pamiętaj, że dbanie o wizerunek pracodawcy online to proces ciągły, który wymaga systematycznych działań i monitorowania. Dlatego oferujemy również długofalową współpracę w zakresie zarządzania reputacją, która pomoże Ci zbudować i utrzymać pozytywny obraz firmy jako pracodawcy.
        </p>

        <div className="flex justify-center mt-8">
          <Link href="/formularz-profil" className="bg-[#002a5c] hover:bg-[#004a8c] text-white font-bold py-3 px-6 rounded-full transition-colors duration-300">
            Skorzystaj z naszej pomocy już dziś
          </Link>
        </div>
      </section>
    </main>
  );
}
