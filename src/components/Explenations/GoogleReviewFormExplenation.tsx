export default function ReviewFormExplenation() {
    return (
      <section className="text-gray-800 p-4 rounded-xl max-w-2xl mx-auto text-sm">
        <div className="text-xl sm:text-md text-center font-semibold border-b border-gray-200 rounded p-4 mb-4">
          Usuń opinie w kilku prostych krokach.
        </div>
  
        <ol className="space-y-2">
  {/* Krok 1 */}
  <li className="bg-white p-3">
    <p className="font-medium mb-1">1. Wyszukaj firmę</p>
    <p className="text-gray-700">Wpisz nazwę firmy – wybierz ją z listy podpowiedzi.</p>
  </li>

  {/* Krok 2 */}
  <li className="bg-white p-3">
    <p className="font-medium mb-1">2. Podaj dane opinii</p>
    <ul className="list-disc list-inside space-y-0.5 text-gray-700">
      <li>Imię lub pseudonim autora – dokładnie jak w opinii</li>
      <li>Treść opinii – skopiuj bez zmian</li>
    </ul>
  </li>

  {/* Krok 3 */}
  <li className="bg-white p-3">
    <p className="font-medium mb-1">3. Dodaj link i datę</p>
    <ul className="list-disc list-inside space-y-0.5 text-gray-700">
      <li>Link do opinii – jeśli dostępny</li>
      <li>Data dodania – przybliżona</li>
    </ul>
  </li>

  {/* Krok 4 */}
  <li className="bg-white p-3">
    <p className="font-medium mb-1">4. Dodaj kolejne lub przejdź dalej</p>
    <p className="text-gray-700">Możesz dodać więcej opinii lub zakończyć zgłoszenie.</p>
  </li>
</ol>

      
      
      </section>
    );
  }
  