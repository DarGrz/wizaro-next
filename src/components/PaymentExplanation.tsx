export default function PaymentExplanation() {
    return (
      <div className="p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Dlaczego warto skorzystać z tej usługi:</h2>
        <ol className="list-decimal list-inside space-y-2 text-md">
          <li>
            Pozbędziesz się wszystkich negatywnych opinii o swojej firmie.
          </li>
          <li>
            Skutecznie usuwamy dane z takich portali jak GoWork, Aleo, Panorama Firm czy PKT.
          </li>
          <li>
            Rozwiązanie sprawdzone przez przedsiębiorców z całej Polski.
          </li>
          {/* <li>
            Starannie opracowana metodyka dopasowana do wymagań konkretnych portali (GoWork, Aleo, Panorama Firm, PKT).
          </li> */}
          <li>
            Oszczędność czasu – nie musisz samodzielnie szukać rozwiązania.
          </li>
          <li>
            Intuicyjna obsługa – możliwość pobrania, wydrukowania lub wysłania treści jednym kliknięciem.
          </li>
          <li>
            Zabezpieczenie dostępu do rozwiązania przez 60 dni – możliwość powrotu w dowolnym momencie.
          </li>
          <li>
            Zlecenie trafia natychmiast do realizacji po dokonaniu bezpiecznej płatności online.
          </li>
          <li>
            Najbardziej konkurencyjna cena na rynku.
          </li>
        </ol>
      </div>
    );
  }
  