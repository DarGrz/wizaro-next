export default function CompanyReviewRemovalFormExplenationClean() {
    return (
      <section className="text-gray-800 p-4 rounded-xl max-w-2xl mx-auto text-sm">
        <div className="text-xl sm:text-md text-center font-semibold border-b border-gray-200 rounded p-4 mb-4">
          Wprowadź dane firmy, aby przygotować wniosek o usunięcie negatywnych recenzji. Dane kontaktowe i adresowe są potrzebne do prawidłowej identyfikacji profilu.
        </div>
  
        <ol className="space-y-3">
          {/* Krok 1 */}
          <li className="bg-white p-3">
            <p className="font-medium mb-1">1. Dane identyfikacyjne firmy</p>
            <ul className="list-disc list-inside text-gray-700 space-y-0.5">
              <li>Nazwa firmy i NIP – wymagane do formalnej identyfikacji</li>
              <li>Link do profilu – np. Google Maps, GoWork, Aleo (opcjonalny, ale pomocny)</li>
            </ul>
          </li>
  
          {/* Krok 2 */}
          <li className="bg-white p-3">
            <p className="font-medium mb-1">2. Dane osoby kontaktowej</p>
            <ul className="list-disc list-inside text-gray-700 space-y-0.5">
              <li>Imię i nazwisko osoby reprezentującej firmę</li>
              <li>Adres e-mail i numer telefonu – używane do kontaktu lub potwierdzeń</li>
            </ul>
          </li>
  
          {/* Krok 3 */}
          <li className="bg-white p-3">
            <p className="font-medium mb-1">3. Adres siedziby</p>
            <p className="text-gray-700">Ulica, kod pocztowy i miasto – dane adresowe wymagane do identyfikacji wniosku.</p>
          </li>
  
          {/* Krok 4 */}
          <li className="bg-white p-3 hidden">
            <p className="font-medium mb-1">4. Dane płatnika</p>
            <p className="text-gray-700">
              Jeśli faktura ma być wystawiona na inną firmę/osobę, zaznacz opcję &quot;Dane płatnika różnią się od danych firmy&quot; – pojawi się dodatkowy formularz.
            </p>
          </li>
        </ol>
      </section>
    );
  }
