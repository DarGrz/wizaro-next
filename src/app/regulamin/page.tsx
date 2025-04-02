'use client';

export default function RegulaminPage() {
  return (
    <div className="max-w-5xl h-screen bg-white mx-auto rounded-xl p-6 md:p-8 text-sm text-gray-800 leading-relaxed space-y-4">
  

  <h2 className="text-xl font-semibold text-gray-900 mt-2">Regulamin świadczenia usługi usuwania profili firmowych</h2>

  <ul className="list-decimal list-inside space-y-2 mt-4">
    <li>
      <strong>Zakres usługi:</strong><br />
      Usługa polega na podjęciu działań zmierzających do usunięcia wskazanego przez klienta profilu firmowego z portali zewnętrznych (np. GoWork, Aleo, Panorama Firm, PKT, BiznesFinder, Google Maps) na podstawie danych dostarczonych przez klienta za pośrednictwem formularza zgłoszeniowego.
    </li>

    <li>
      <strong>Realizacja:</strong><br />
      Zlecenie trafia do realizacji natychmiast po dokonaniu płatności. Klient potwierdza, że przekazane dane są zgodne ze stanem faktycznym i uprawniają go do złożenia takiego wniosku.
    </li>

    <li>
      <strong>Obowiązki klienta:</strong><br />
      Klient zobowiązuje się do podania kompletnych i prawdziwych informacji niezbędnych do realizacji usługi. Usługodawca nie ponosi odpowiedzialności za skuteczność usunięcia profilu w przypadku podania błędnych, niepełnych lub nieprawdziwych danych.
    </li>

    <li>
      <strong>Zwroty i reklamacje:</strong><br />
      Ze względu na cyfrowy charakter usługi oraz natychmiastowe przystąpienie do jej realizacji, klientowi nie przysługuje prawo do odstąpienia od umowy ani zwrot środków.<br />
      Reklamacje można składać w ciągu 24 godzin od zakupu:
      <ul className="list-disc list-inside pl-4 mt-1 space-y-1 text-gray-700">
        <li>Telefonicznie: <a href="tel:792861513" className="text-[#002a5c] hover:underline font-medium">792 861 513</a></li>
        <li>Mailowo: <a href="mailto:kontakt@wizaro.pl" className="text-[#002a5c] hover:underline font-medium">kontakt@wizaro.pl</a></li>
      </ul>
    </li>

    <li>
      <strong>Odpowiedzialność usługodawcy:</strong><br />
      Usługodawca podejmuje działania z należytą starannością, jednak nie gwarantuje skuteczności usunięcia profilu – decyzja należy do administratora zewnętrznego portalu. Usługodawca nie ponosi odpowiedzialności za brak reakcji portalu, odrzucenie zgłoszenia ani czas oczekiwania.
    </li>

    <li>
      <strong>Dane osobowe:</strong><br />
      Wszystkie dane przekazane przez klienta wykorzystywane są wyłącznie w celu realizacji usługi. Nie są udostępniane osobom trzecim ani wykorzystywane w celach marketingowych. Dane przechowywane są przez 60 dni, po czym są bezpowrotnie usuwane. Dokumenty nie są dostępne po ich usunięciu.
    </li>

    <li>
      <strong>Postanowienia końcowe:</strong><br />
      Usługodawca zastrzega sobie prawo do zmiany niniejszego regulaminu. Zmiany obowiązują od momentu ich opublikowania na stronie internetowej.
    </li>
  </ul>
  <p className="text-sm text-gray-700">
    Właścicielem serwisu jest <strong>Dariusz Grzegorczyk</strong>, NIP: <strong>6782978644</strong>, z siedzibą w Krakowie, osiedle Oświecenia 57.
    Korzystanie z usługi oznacza akceptację niniejszego regulaminu.
  </p>
</div>

  );
}
