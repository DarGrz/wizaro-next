export default function ReviewFormExplenation() {
    return (
      <section className="text-gray-800 p-4 rounded-xl max-w-2xl mx-auto text-sm">
        <div className="text-xl sm:text-md text-center font-semibold border-b border-gray-200 rounded p-4 mb-4">
          Zgłaszając konkretne opinie do usunięcia, zwiększasz skuteczność działań i szansę na pozytywne rozpatrzenie.
        </div>
  
        <ol className="space-y-3">
          {/* Krok 1 */}
          <li className="bg-white p-3">
            <p className="font-medium mb-1">1. Podaj dane autora i treść opinii</p>
            <ul className="list-disc list-inside space-y-0.5 text-gray-700">
              <li>Imię lub pseudonim autora – tak, jak widnieje przy opinii</li>
              <li>Treść opinii – skopiuj dokładnie</li>
            </ul>
          </li>
  
          {/* Krok 2 */}
          <li className="bg-white p-3">
            <p className="font-medium mb-1">2. Uzupełnij link i datę dodania</p>
            <ul className="list-disc list-inside space-y-0.5 text-gray-700">
              <li>Link – jeśli dostępny, np. do opinii w Google</li>
              <li>Data – przybliżona data dodania opinii</li>
            </ul>
          </li>
  
          {/* Krok 3 */}
          <li className="bg-white p-3">
            <p className="font-medium mb-1">3. Dodaj kolejne lub przejdź dalej</p>
            <p className="text-gray-700">Możesz dodać więcej opinii lub kontynuować proces zgłoszenia.</p>
          </li>
        </ol>
      </section>
    );
  }
  