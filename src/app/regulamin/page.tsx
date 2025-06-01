'use client';

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
    { id: "reklamacje", label: "Kontakt i reklamacje" },
    { id: "info", label: "Informacje dodatkowe" },
  ];
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-[#002a5c] tracking-tight">UMOWA O ŚWIADCZENIE USŁUG – REGULAMIN SKŁADANIA ZAMÓWIEŃ</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
        Poniżej znajdziesz szczegółowy regulamin świadczenia usług usuwania wizytówek i opinii z internetu, zasady płatności, realizacji zamówień, odpowiedzialności oraz informacje o przetwarzaniu danych osobowych. Skorzystaj z nawigacji, aby szybko przejść do interesującej Cię sekcji.
      </p>
      {/* Spis treści / Nawigacja */}
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
            <li>Niniejsza umowa określa zasady świadczenia usług przez Dariusza Grzegorczyka, prowadzącego działalność gospodarczą pod adresem: Osiedle Oświecenia 57/12, 31-636 Kraków, NIP: 6782978644, zwanego dalej „Usługodawcą”, na rzecz osoby składającej zamówienie, zwanej dalej „Klientem”.</li>
            <li>Umowa zostaje zawarta z chwilą złożenia zamówienia za pośrednictwem formularza dostępnego na stronie internetowej Usługodawcy.</li>
            <li>Klient, składając zamówienie, oświadcza, że zapoznał się z treścią niniejszej umowy i akceptuje jej postanowienia.</li>
          </ul>
        </section>
        <section id="zakres">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§2. Zakres usług</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Usługodawca zobowiązuje się do wykonania usługi zgodnej z opisem przedstawionym w formularzu zamówienia lub wiadomości e-mail potwierdzającej złożenie zlecenia.</li>
            <li>Usługi mogą obejmować w szczególności: usuwanie wizytówek firm z Map Google, usuwanie opinii z portali internetowych, przygotowanie dokumentów lub pism, doradztwo w zakresie ochrony reputacji online, oraz inne zgodne z ofertą.</li>
          </ul>
        </section>
        <section id="platnosci">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§3. Warunki płatności</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Płatność za usługę następuje po jej wykonaniu, na podstawie wystawionej faktury proforma.</li>
            <li>Klient zobowiązuje się do uregulowania należności w terminie wskazanym na fakturze proforma (domyślnie 3 dni robocze od dnia jej wystawienia).</li>
            <li>Brak zapłaty w terminie uprawnia Usługodawcę do dochodzenia należności na drodze windykacyjnej lub sądowej.</li>
          </ul>
        </section>
        <section id="realizacja">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§4. Realizacja zamówienia</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Realizacja usługi rozpoczyna się po otrzymaniu zamówienia, bez konieczności wcześniejszej płatności.</li>
            <li>Standardowy czas realizacji wynosi do <span className="font-semibold">14 dni </span>, chyba że uzgodniono inaczej z Klientem.</li>
            <li>Klient zobowiązany jest do dostarczenia wszelkich niezbędnych informacji lub dokumentów umożliwiających wykonanie usługi.</li>
          </ul>
        </section>
        <section id="odpowiedzialnosc">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§5. Odpowiedzialność</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Usługodawca wykonuje usługę z należytą starannością, jednak nie ponosi odpowiedzialności za decyzje podmiotów trzecich, od których może zależeć skuteczność usługi.</li>
            <li>Usługodawca nie ponosi odpowiedzialności za skutki wynikające z podania nieprawdziwych, niekompletnych lub wprowadzających w błąd danych przez Klienta.</li>
          </ul>
        </section>
        <section id="rezygnacja">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§6. Rezygnacja z usługi</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Klient może bezkosztowo zrezygnować z usługi, o ile nie została ona jeszcze zrealizowana.</li>
            <li>W przypadku rezygnacji po wykonaniu usługi obowiązek zapłaty za nią pozostaje w mocy i nie przysługuje zwrot kosztów.</li>
          </ul>
        </section>
        <section id="dane">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§7. Dane osobowe</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Administratorem danych osobowych Klienta jest Usługodawca – Dariusz Grzegorczyk.</li>
            <li>Dane osobowe Klienta przetwarzane są wyłącznie w celu realizacji zamówienia oraz do celów księgowych i kontaktowych. Szczegóły znajdują się w Polityce Prywatności.</li>
          </ul>
        </section>
        <section id="koncowe">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">§8. Postanowienia końcowe</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Umowa podlega przepisom prawa polskiego.</li>
            <li>Wszelkie spory wynikające z niniejszej umowy będą rozpatrywane przez sąd właściwy miejscowo dla siedziby Usługodawcy.</li>
            <li>Klient oświadcza, że akceptuje niniejsze warunki poprzez zaznaczenie odpowiedniego pola przy składaniu zamówienia.</li>
          </ul>
        </section>
        <section id="reklamacje">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">Kontakt i reklamacje</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Reklamacje można składać w ciągu 24 godzin od zakupu:</li>
            <li>Telefonicznie: <a href="tel:792861513" className="text-[#002a5c] hover:underline font-medium">792 861 513</a></li>
            <li>Mailowo: <a href="mailto:kontakt@wizaro.pl" className="text-[#002a5c] hover:underline font-medium">kontakt@wizaro.pl</a></li>
          </ul>
        </section>
        <section id="info">
          <h2 className="text-xl font-bold text-[#002a5c] mb-2 mt-4">Informacje dodatkowe</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Właścicielem serwisu jest <strong>Dariusz Grzegorczyk</strong>, NIP: <strong>6782978644</strong>, z siedzibą w Krakowie, osiedle Oświecenia 57.</li>
            <li>Korzystanie z usługi oznacza akceptację niniejszego regulaminu.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
