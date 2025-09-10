export default function GoogleContentFormExplenationClean() {
    return (
      <section className="text-gray-800 p-4 rounded-xl max-w-2xl mx-auto text-sm">
        
  
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
      <li>Kliknij przycisk &quot;Przejdź dalej&quot;, aktualna cena pokaże się automatycznie.</li>
    </ul>
    
  </li>

  {/* Krok 4 */}
  <li className="bg-white p-3">
    <p className="font-medium mb-1">3. Uzupełnij informacje</p>
     <ul className="list-disc list-inside space-y-0.5 text-gray-700">
      <li>Podaj autora i treść</li>
      <li>Opcjonalnie wybierz datę dodania</li>
      <li>Możesz dodać na raz więcej elementów, klikając przycisk &quot;Dodaj kolejny element&quot;.</li>
      <li>Sprawdź cenę. Jeśli wszystko się zgadza, przejdź dalej.</li>
    </ul>
    
  </li>
</ol>

      </section>
    );
  }
