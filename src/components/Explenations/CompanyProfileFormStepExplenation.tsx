export default function RemovalFormExplenation() {
    return (
      <section className="text-gray-800 p-4 rounded-xl max-w-2xl mx-auto text-sm">
      <div className="text-xl sm:text-md text-center font-semibold border-b border-gray-200 rounded p-4 mb-4">
        Działamy skutecznie i dyskretnie. Twoje dane wykorzystamy jedynie w celu realizacji usługi.
      </div>
    
      <ol className="space-y-3">
        {/* Krok 1 */}
        <li className="bg-white p-3">
          <p className="font-medium mb-1">1. Wprowadź dane firmy</p>
          <ul className="list-disc list-inside space-y-0.5 text-gray-700">
            <li>Nazwa firmy – np. „ABC Sp. z o.o.”</li>
            <li>NIP – opcjonalnie, ale zalecane</li>
            <li>Ulica i numer</li>
            <li>Kod pocztowy, miasto</li>
          </ul>
        </li>
    
        {/* Krok 2 */}
        <li className="bg-white p-3">
          <p className="font-medium mb-1">2. Podaj dane kontaktowe</p>
          <ul className="list-disc list-inside space-y-0.5 text-gray-700">
            <li>Imię osoby kontaktowej</li>
            <li>Nazwisko osoby kontaktowej</li>
            <li>Adres e-mail</li>
            <li>Numer telefonu</li>
          </ul>
        </li>
    
        {/* Krok 3 */}
        <li className="bg-white p-3">
      <p className="font-medium mb-1">3. Sprawdź podsumowanie i przejdź dalej</p>
      <ul className="list-disc list-inside space-y-0.5 text-gray-700">
        <li>Sprawdź automatycznie wyliczoną cenę</li>
        <li>Kliknij „Przejdź dalej”, aby kontynuować</li>
      </ul>
    </li>
      </ol>
    </section>
    );
  }
  