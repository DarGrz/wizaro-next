'use client';

export default function RegulaminZamowienPage() {
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
    { id: "reklamacje", label: "Kontakt i reklamacje" },
    { id: "info", label: "Informacje dodatkowe" },
    { id: "zabezpieczenia", label: "§10. Zabezpieczenia wykonawcy" },
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-[#002a5c] tracking-tight">
        UMOWA O ŚWIADCZENIE USŁUG – REGULAMIN SKŁADANIA ZAMÓWIEŃ
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
            <li>Płatność następuje po wykonaniu usługi, na podstawie faktury proforma.</li>
            <li>Klient zobowiązany jest do uregulowania należności w terminie wskazanym na fakturze (domyślnie: 3 dni robocze).</li>
            <li>Brak płatności w terminie skutkuje wszczęciem działań windykacyjnych lub skierowaniem sprawy na drogę sądową.</li>
            <li>Akceptacja regulaminu jest równoznaczna z wyrażeniem zgody na wykonanie usługi oraz zobowiązaniem się do jej opłacenia po wykonaniu.</li>
          </ul>
        </section>

        <section id="realizacja">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§4. Realizacja zamówienia</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Usługa realizowana jest po otrzymaniu kompletnego zlecenia – nie wymaga uprzedniej płatności.</li>
            <li>Standardowy termin realizacji to 14 dni kalendarzowych, chyba że ustalono inaczej.</li>
            <li>Klient zobowiązany jest do współpracy oraz dostarczenia niezbędnych danych i dokumentów.</li>
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
            <li>Usunięcie wizytówki z Google Maps: 1299 zł brutto.</li>
            <li>Usunięcie opinii z GoWork: 699 zł brutto.</li>
            <li>Usunięcie opinii z portali Aleo, Panorama Firm, PKT, Wenet: 699 zł brutto.</li>
            <li>W przypadku indywidualnych usług ceny mogą być ustalane odrębnie w drodze korespondencji z Usługodawcą.</li>
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

        <section id="zabezpieczenia">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§10. Zabezpieczenia wykonawcy</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Usługodawca zastrzega sobie prawo do odmowy realizacji usługi w przypadku podejrzenia działań niezgodnych z prawem, naruszających dobra osobiste osób trzecich lub mogących prowadzić do powstania odpowiedzialności cywilnej lub karnej.</li>
            <li>W przypadku przesłania przez Klienta treści niezgodnych z prawem lub naruszających regulaminy platform internetowych, odpowiedzialność za skutki ponosi wyłącznie Klient.</li>
            <li>Wszelkie materiały przygotowane przez Usługodawcę (pisma, wnioski, zgłoszenia) są chronione prawem autorskim i nie mogą być rozpowszechniane ani wykorzystywane w innych celach bez uprzedniej zgody.</li>
            <li>Usługodawca ma prawo do przerwania realizacji zlecenia w przypadku braku współpracy ze strony Klienta, w szczególności opóźnień w dostarczaniu niezbędnych informacji lub dokumentów.</li>
          </ul>
        </section>

      </div>
    </div>
  );
}
