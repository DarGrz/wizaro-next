'use client';

export default function RegulaminPage() {
  return (
    <div className="max-w-3xl mx-auto py-20 px-6 text-gray-800">
      <h1 className="text-3xl font-semibold mb-6 text-[#002a5c]">Regulamin</h1>

      <p className="mb-4">
        Właścicielem serwisu jest Dariusz Grzegorczyk, NIP: 6782978644, z siedzibą
        w Krakowie, osiedle Oświecenia 57. Korzystanie z usługi oznacza akceptację
        niniejszego regulaminu.
      </p>

      <ul className="list-disc list-inside space-y-2">
        <li>Usługa polega na przygotowaniu gotowego rozwiązania do usunięcia danych firmy z portali takich jak GoWork, Aleo, Panorama Firm czy PKT.</li>
        <li>Użytkownik jest odpowiedzialny za samodzielne wysłanie wygenerowanego pisma do odpowiedniego serwisu.</li>
        <li>Cena usługi wynosi 399 zł brutto i zawiera 23% VAT.</li>
        <li>Zlecenie trafia natychmiast do realizacji po opłaceniu formularza.</li>
        <li>Ze względu na ochronę danych osobowych, nie ma możliwości odzyskania wygenerowanych dokumentów po ich usunięciu.</li>
        <li>Dane wprowadzone do formularza nie są udostępniane innym podmiotom i nie są wykorzystywane w celach marketingowych.</li>
        <li>Dane są przechowywane przez 60 dni, po czym są bezpowrotnie usuwane.</li>
        <li>Reklamacje można składać telefonicznie (571 767 999) lub mailowo (kontakt@wzorypism.io) maksymalnie do 24h po zakupie.</li>
        <li>Nie ma możliwości zwrotu pieniędzy z tytułu błędnie wypełnionych danych przez użytkownika.</li>
        <li>Właściciel zastrzega sobie prawo do zmian w regulaminie.</li>
      </ul>
    </div>
  );
}
