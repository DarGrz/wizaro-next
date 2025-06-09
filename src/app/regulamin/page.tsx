'use client';

import { REGULAMIN_VERSION } from '@/app/constants/regulamin-version';

export default function Page() {
  const sections = [
    { id: "ogolne", label: "§1. Postanowienia ogólne" },
    { id: "zakres", label: "§2. Zakres usług" },
    { id: "platnosci", label: "§3. Warunki płatności" },
    { id: "realizacja", label: "§4. Realizacja zamówienia" },
    { id: "odpowiedzialnosc", label: "§5. Odpowiedzialność" },
    { id: "rezygnacja", label: "§6. Rezygnacja z usługi" },
    { id: "dane", label: "§7. Dane osobowe" },
    { id: "koncowe", label: "§8. Postanowienia końcowe" },
    { id: "cennik", label: "§9. Cennik usług" },
    { id: "zabezpieczenia", label: "§10. Zabezpieczenia wykonawcy" },
    { id: "archiwizacja", label: "§11. Archiwizacja i dostępność usług" },
    { id: "warunki-techniczne", label: "§12. Warunki techniczne i komunikacja" },
    { id: "ochrona-tresci", label: "§13. Ochrona treści i metod" },
    { id: "weryfikacja", label: "§14. Weryfikacja danych klienta" },
    { id: "kontakt-wsparcie", label: "§15. Kontakt i zakres wsparcia" },
    { id: "zmiany-regulaminu", label: "§16. Zmiany regulaminu" },
    { id: "reklamacje", label: "Kontakt i reklamacje" },
    { id: "info", label: "Informacje dodatkowe" },
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-[#002a5c] tracking-tight">
        UMOWA O ŚWIADCZENIE USŁUG – REGULAMIN 
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
        Poniżej znajdziesz szczegółowy regulamin świadczenia usług usuwania wizytówek i opinii z internetu, zasady płatności, realizacji zamówień, odpowiedzialności oraz informacje o przetwarzaniu danych osobowych. Skorzystaj z nawigacji, aby szybko przejść do interesującej Cię sekcji.
      </p>
      <nav aria-label="Spis treści" className="mb-10">
        <ul className="flex flex-wrap gap-3 justify-center text-sm md:text-base">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-[#002a5c] hover:underline font-medium transition-colors">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 space-y-8 border border-gray-100">

        <section id="ogolne">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§1. Postanowienia ogólne</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Niniejszy regulamin stanowi integralną część umowy o świadczenie usług zawieranej pomiędzy Klientem a Usługodawcą – Dariuszem Grzegorczykiem, prowadzącym działalność gospodarczą pod adresem: Osiedle Oświecenia 57/12, 31-636 Kraków, NIP: 6782978644.</li>
            <li>Złożenie zamówienia za pośrednictwem formularza na stronie Usługodawcy oznacza akceptację niniejszego regulaminu i zawarcie umowy.</li>
            <li>Regulamin obowiązuje dla wszystkich usług świadczonych przez Usługodawcę, o ile nie uzgodniono inaczej indywidualnie.</li>
          </ul>
        </section>

        <section id="zakres">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§2. Zakres usług</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Usługi świadczone obejmują m.in.: usuwanie wizytówek firmowych z Map Google, usuwanie opinii z portali internetowych (GoWork, Aleo, Panorama Firm, PKT, Wenet), sporządzanie pism, wniosków, żądań prawnych, a także doradztwo w zakresie ochrony reputacji w internecie.</li>
            <li>Szczegółowy opis usługi oraz zakres działań znajduje się w formularzu zamówienia lub w potwierdzeniu e-mail przesyłanym przez Usługodawcę.</li>
          </ul>
        </section>

        <section id="platnosci">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§3. Warunki płatności</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Płatność następuje po wykonaniu głównej części usługi (usunięcie opinii lub profilu), ale przed otrzymaniem raportu końcowego, na podstawie faktury proforma.</li>
            <li>Klient zobowiązany jest do uregulowania należności w terminie wskazanym na fakturze (domyślnie: 3 dni robocze).</li>
            <li>Brak płatności w terminie skutkuje wszczęciem działań windykacyjnych lub skierowaniem sprawy na drogę sądową.</li>
            <li>Akceptacja regulaminu jest równoznaczna z wyrażeniem zgody na wykonanie usługi oraz zobowiązaniem się do jej opłacenia po wykonaniu.</li>
            <li>Raport końcowy potwierdzający wykonanie usługi zostanie przekazany Klientowi po zaksięgowaniu płatności.</li>
          </ul>
        </section>

        <section id="realizacja">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§4. Realizacja zamówienia</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Usługa realizowana jest po otrzymaniu kompletnego zlecenia – nie wymaga uprzedniej płatności.</li>
            <li>Standardowy termin realizacji to 14 dni kalendarzowych, chyba że ustalono inaczej.</li>
            <li>Klient zobowiązany jest do współpracy oraz dostarczenia niezbędnych danych i dokumentów.</li>
            <li>Po skutecznym usunięciu opinii lub profilu klient otrzymuje powiadomienie o konieczności dokonania płatności.</li>
            <li>Każda usługa kończy się przygotowaniem i dostarczeniem raportu końcowego, który dokumentuje wykonane czynności. Raport stanowi integralną część usługi i jest przekazywany Klientowi po otrzymaniu płatności.</li>
          </ul>
        </section>

        <section id="odpowiedzialnosc">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§5. Odpowiedzialność</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Usługodawca dołoży należytej staranności w realizacji zlecenia, jednak nie gwarantuje skuteczności usługi z uwagi na niezależność decyzji administratorów portali zewnętrznych.</li>
            <li>Usługodawca nie ponosi odpowiedzialności za podanie błędnych, niepełnych lub nieprawdziwych danych przez Klienta.</li>
          </ul>
        </section>

        <section id="rezygnacja">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§6. Rezygnacja z usługi</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>W przypadku usług w pełni wykonanych przed dokonaniem płatności, prawo do odstąpienia od umowy zgodnie z ustawą o prawach konsumenta nie przysługuje. Klient, składając zamówienie, wyraża zgodę na rozpoczęcie i pełne wykonanie usługi przed upływem terminu odstąpienia.</li>
            <li>Rezygnacja z usługi jest możliwa tylko do momentu rozpoczęcia realizacji. Po rozpoczęciu – obowiązek zapłaty pozostaje w mocy.</li>
            <li>W przypadku rezygnacji po wykonaniu usługi – koszty nie podlegają zwrotowi.</li>
          </ul>
        </section>

        <section id="dane">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§7. Dane osobowe</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Administratorem danych osobowych jest Dariusz Grzegorczyk.</li>
            <li>Dane są przetwarzane wyłącznie w celu realizacji umowy oraz kontaktu z Klientem.</li>
            <li>Szczegółowe informacje o przetwarzaniu danych znajdują się w Polityce Prywatności dostępnej na stronie internetowej Usługodawcy.</li>
          </ul>
        </section>

        <section id="koncowe">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§8. Postanowienia końcowe</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Umowa podlega prawu polskiemu.</li>
            <li>Wszelkie spory rozpatruje sąd właściwy miejscowo dla siedziby Usługodawcy.</li>
            <li>Akceptując regulamin, Klient potwierdza, że zapoznał się z jego treścią i akceptuje wszystkie postanowienia.</li>
          </ul>
        </section>

        <section id="cennik">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§9. Cennik usług</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Usunięcie profilu firmy z Map Google: 1299 zł brutto. Usługa obejmuje działania prowadzące do usunięcia profilu, za które płatność następuje po ich skutecznym wykonaniu, oraz sporządzenie i dostarczenie raportu końcowego potwierdzającego podjęte czynności. Raport zostanie przesłany po otrzymaniu płatności.</li>
            <li>Usunięcie profilu firmy z portali GoWork, Aleo, Panorama Firm, Biznes Finder, PKT.pl: 699 zł brutto. Usługa obejmuje działania prowadzące do usunięcia profilu, za które płatność następuje po ich skutecznym wykonaniu, oraz sporządzenie i dostarczenie raportu końcowego potwierdzającego podjęte czynności. Raport zostanie przesłany po otrzymaniu płatności.</li>
            <li>Usunięcie pojedynczej opinii: 299 zł brutto. Usługa obejmuje działania prowadzące do usunięcia opinii, za które płatność następuje po ich skutecznym wykonaniu, oraz sporządzenie i dostarczenie raportu końcowego potwierdzającego podjęte czynności. Raport zostanie przesłany po otrzymaniu płatności.</li>
            <li>Resetowanie wizytówki Google: 2199 zł brutto. Usługa obejmuje działania prowadzące do całkowitego zresetowania profilu, za które płatność następuje po ich skutecznym wykonaniu, oraz sporządzenie i dostarczenie raportu końcowego potwierdzającego podjęte czynności. Raport zostanie przesłany po otrzymaniu płatności.</li>
            <li>W przypadku indywidualnych usług ceny mogą być ustalane odrębnie w drodze korespondencji z Usługodawcą. Każda usługa obejmuje przygotowanie i dostarczenie raportu końcowego, który zostanie przesłany po otrzymaniu płatności.</li>
          </ul>
        </section>

        <section id="zabezpieczenia">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§10. Zabezpieczenia wykonawcy</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Usługodawca zastrzega sobie prawo do odmowy realizacji usługi w przypadku podejrzenia działań niezgodnych z prawem, naruszających dobra osobiste osób trzecich lub mogących prowadzić do powstania odpowiedzialności cywilnej lub karnej.</li>
            <li>W przypadku przesłania przez Klienta treści niezgodnych z prawem lub naruszających regulaminy platform internetowych, odpowiedzialność za skutki ponosi wyłącznie Klient.</li>
            <li>Wszelkie materiały przygotowane przez Usługodawcę (pisma, wnioski, zgłoszenia) są chronione prawem autorskim i nie mogą być rozpowszechniane ani wykorzystywane w innych celach bez uprzedniej zgody.</li>
            <li>Usługodawca ma prawo do przerwania realizacji zlecenia w przypadku braku współpracy ze strony Klienta, w szczególności opóźnień w dostarczaniu niezbędnych informacji lub dokumentów.</li>
          </ul>
        </section>

        <section id="archiwizacja">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§11. Archiwizacja i dostępność usług</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Usługodawca przechowuje dokumentację związaną z realizowanymi usługami przez okres 12 miesięcy od daty zakończenia realizacji usługi.</li>
            <li>Raporty końcowe z wykonanych usług są dostępne dla Klienta przez okres 6 miesięcy od daty ich dostarczenia. Po tym okresie mogą zostać zarchiwizowane i udostępniane jedynie na wyraźne żądanie Klienta.</li>
            <li>Dostęp do historii zamówień i raportów jest możliwy po zalogowaniu się na konto Klienta lub poprzez kontakt z Usługodawcą.</li>
            <li>Usługodawca zastrzega sobie prawo do czasowego ograniczenia dostępności usług w przypadku prac konserwacyjnych, modernizacyjnych lub innych zdarzeń niezależnych od Usługodawcy.</li>
          </ul>
        </section>

        <section id="warunki-techniczne">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§12. Warunki techniczne i komunikacja</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Korzystanie z serwisu wymaga urządzenia z dostępem do internetu oraz przeglądarki internetowej obsługującej HTML5, CSS3 i JavaScript.</li>
            <li>Zalecane jest korzystanie z najnowszych wersji przeglądarek: Chrome, Firefox, Safari, Edge.</li>
            <li>Komunikacja z Klientem odbywa się przede wszystkim drogą elektroniczną (e-mail) lub telefonicznie na numery wskazane w formularzu zamówienia.</li>
            <li>Klient zobowiązany jest do regularnego sprawdzania swojej skrzynki e-mail oraz odbierania połączeń telefonicznych od Usługodawcy, co jest niezbędne dla prawidłowej realizacji usługi.</li>
            <li>Usługodawca nie ponosi odpowiedzialności za opóźnienia wynikające z braku kontaktu z Klientem.</li>
          </ul>
        </section>

        <section id="ochrona-tresci">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§13. Ochrona treści i metod</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Wszelkie materiały, dokumenty, pisma oraz metody działania stosowane przez Usługodawcę stanowią jego własność intelektualną i są chronione prawem autorskim.</li>
            <li>Klient zobowiązuje się do nieudostępniania, niepowielania i nierozpowszechniania otrzymanych materiałów osobom trzecim bez zgody Usługodawcy.</li>
            <li>Przekazanie Klientowi raportów, pism lub innych dokumentów nie oznacza przeniesienia na niego praw autorskich do tych materiałów.</li>
            <li>Wykorzystanie metod i procedur Usługodawcy przez osoby trzecie bez jego zgody stanowi naruszenie praw autorskich i może skutkować odpowiedzialnością prawną.</li>
          </ul>
        </section>

        <section id="weryfikacja">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§14. Weryfikacja danych klienta</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Usługodawca zastrzega sobie prawo do weryfikacji danych podanych przez Klienta w celu potwierdzenia jego tożsamości oraz uprawnienia do zlecenia usunięcia opinii lub profilu.</li>
            <li>W przypadku usług związanych z usuwaniem wizytówek firmowych, Klient może zostać poproszony o dostarczenie dokumentów potwierdzających jego związek z firmą (np. wpis do CEIDG, KRS, pełnomocnictwo).</li>
            <li>Brak dostarczenia wymaganych dokumentów weryfikacyjnych może skutkować odmową realizacji usługi.</li>
            <li>Usługodawca zobowiązuje się do zachowania poufności przekazanych dokumentów i wykorzystania ich wyłącznie w celu weryfikacji uprawnień Klienta.</li>
          </ul>
        </section>

        <section id="kontakt-wsparcie">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§15. Kontakt i zakres wsparcia</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Usługodawca zapewnia wsparcie w zakresie realizowanych usług w dni robocze (poniedziałek-piątek) w godzinach 9:00-17:00.</li>
            <li>Kontakt z Usługodawcą jest możliwy telefonicznie pod numerem 792 861 513 lub mailowo pod adresem kontakt@wizaro.pl.</li>
            <li>Czas odpowiedzi na zapytania wynosi standardowo do 24 godzin w dni robocze.</li>
            <li>W ramach wsparcia Klient może uzyskać informacje o statusie realizacji usługi, wyjaśnienia dotyczące procedur oraz pomoc w rozwiązywaniu problemów związanych z realizacją usługi.</li>
            <li>Wsparcie techniczne nie obejmuje kwestii niezwiązanych bezpośrednio z realizowaną usługą.</li>
          </ul>
        </section>

        <section id="zmiany-regulaminu">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§16. Zmiany regulaminu</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Usługodawca zastrzega sobie prawo do zmiany regulaminu z ważnych przyczyn, w szczególności w przypadku zmiany przepisów prawa, zmiany zakresu świadczonych usług lub wprowadzenia nowych funkcjonalności.</li>
            <li>O zmianach regulaminu Usługodawca informuje poprzez publikację aktualnej wersji na stronie internetowej.</li>
            <li>Zmiany regulaminu wchodzą w życie w terminie wskazanym przez Usługodawcę, nie krótszym niż 7 dni od dnia ich opublikowania.</li>
            <li>Klient, który nie akceptuje zmian regulaminu, może zrezygnować z dalszego korzystania z usług Usługodawcy.</li>
            <li>Zlecenia złożone przed wejściem w życie zmian regulaminu są realizowane na zasadach obowiązujących w dniu złożenia zamówienia.</li>
          </ul>
        </section>

        <section id="reklamacje">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">Kontakt i reklamacje</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Reklamacje należy składać w terminie 24 godzin od otrzymania efektu usługi.</li>
            <li>Telefon: <a href="tel:792861513" className="text-[#002a5c] hover:underline font-medium">792 861 513</a></li>
            <li>E-mail: <a href="mailto:kontakt@wizaro.pl" className="text-[#002a5c] hover:underline font-medium">kontakt@wizaro.pl</a></li>
          </ul>
        </section>

        <section id="info">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">Informacje dodatkowe</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Serwis należy do Dariusza Grzegorczyka, NIP: 6782978644, os. Oświecenia 57/12, 31-636 Kraków.</li>
            <li>Korzystanie z serwisu oznacza akceptację niniejszego regulaminu w całości.</li>
          </ul>
        </section>

      </div>
      
      <div className="mt-10 text-center">
        <div className="mb-6">
          <p className="text-gray-700 mb-2">Wersja regulaminu: {REGULAMIN_VERSION} (obowiązuje od 06.06.2025)</p>
          <p className="text-sm text-gray-600">Ostatnia aktualizacja: 06.06.2025</p>
        </div>
      </div>
    </div>
  );
}
