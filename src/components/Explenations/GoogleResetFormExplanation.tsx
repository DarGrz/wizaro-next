export default function GoogleResetFormExplanation() {
  return (
    <section className="text-gray-800 p-4 rounded-xl max-w-2xl mx-auto text-sm">
      <div className="text-xl sm:text-md text-center font-semibold border-b border-gray-200 rounded p-4 mb-4">
        Resetowanie wizytówki Google pozwala na usunięcie wszystkich negatywnych opinii i rozpoczęcie budowania reputacji od nowa.
      </div>
    
     <ol className="space-y-3">        {/* Krok 1 */}
        <li className="bg-white p-3">
          <p className="font-medium mb-1">1. Wyszukaj profil Google Business</p>
          <ul className="list-disc list-inside space-y-0.5 text-gray-700">
            <li>Wpisz nazwę firmy w wyszukiwarce</li>
            <li>Wybierz właściwy profil z listy wyników</li>
            <li>Sprawdź czy dane się zgadzają</li>
          </ul>
        </li>
    
        {/* Krok 2 */}
        <li className="bg-white p-3">
          <p className="font-medium mb-1">2. Dodaj więcej profili (jeśli potrzebujesz)</p>
          <p className="text-gray-700">Kliknij <span className="text-[#5FA054]">&bdquo;Dodaj profil&rdquo;</span>, aby usunąć kilka wizytówek Google jednocześnie.</p>
        </li>

        {/* Krok 3 */}
        <li className="bg-white p-3">
          <p className="font-medium mb-1">3. Sprawdź cenę i przejdź dalej</p>
          <p className="text-gray-700">Cena pojawi się automatycznie. Kliknij <span className="text-[#5FA054]">&bdquo;Przejdź dalej&rdquo;</span>, aby kontynuować.</p>
        </li>
      </ol>
    </section>
  );
}
