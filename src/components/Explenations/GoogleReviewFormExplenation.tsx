
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
     <ul className="list-disc list-inside space-y-0.5 text-gray-700">
      <li>Wpisz nazwę firmy – wybierz ją z listy podpowiedzi.</li>
      <li>Jeśli nie możesz znależć firmy skorzystaj z <a className="text-[#2D5CF2]" href="/formularz-opinie">formularza ogólnego</a></li>
    </ul>
    
  </li>

  {/* Krok 2 */}
  <li className="bg-white p-3">
    <p className="font-medium mb-1">2. Sprawdź informacje</p>
    <ul className="list-disc list-inside space-y-0.5 text-gray-700">
      <li>Upewnij się, że  wybrałeś właściwą firmę</li>
    </ul>
  </li>


  {/* Krok 3 */}
  <li className="bg-white p-3">
    <p className="font-medium mb-1">3. Przejdź dalej</p>
     <ul className="list-disc list-inside space-y-0.5 text-gray-700">
      <li>Kliknij przycisk &quot;Dodaj opinie do usunięcie&quot;, aktualna cena pokaże się automatycznie.</li>
    </ul>
    
  </li>

  {/* Krok 4 */}
  <li className="bg-white p-3">
    <p className="font-medium mb-1">3. Wpisz opinie do usunięcia</p>
     <ul className="list-disc list-inside space-y-0.5 text-gray-700">
      <li>Podaj autora i treść opinii</li>
      <li>Opcjonalnie wybierz datę dodania opinii</li>
      <li>Możesz dodać na raz więcej opinii, klikając przycisk &quot;Dodaj koljeną opinię&quot;.</li>
      <li>Sprawdź cenę. Jeśli wszysto sie zgadza, przejdź dalej.</li>
    </ul>
    
  </li>
</ol>

      
      
      </section>
    );
  }
  