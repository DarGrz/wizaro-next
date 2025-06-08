export default function GoogleResetFormExplanation() {
  return (
    <section className="text-gray-800 p-4 rounded-xl max-w-2xl mx-auto text-sm">
      <div className="text-xl sm:text-md text-center font-semibold border-b border-gray-200 rounded p-4 mb-4">
        Resetowanie wizytówki Google pozwala na usunięcie wszystkich negatywnych opinii i rozpoczęcie budowania reputacji od nowa.
      </div>
    
      <ol className="space-y-3">
        {/* Krok 1 */}
        <li className="bg-white p-3">
          <p className="font-medium mb-1">1. Wprowadź dane firmy i link do wizytówki</p>
          <ul className="list-disc list-inside space-y-0.5 text-gray-700">
            <li>Nazwa firmy – np. „ABC Sp. z o.o.&quot;</li>
            <li>NIP firmy – wymagany do weryfikacji</li>
            <li>Link do wizytówki Google – pełny adres URL</li>
          </ul>
        </li>
    
        {/* Krok 2 */}
        <li className="bg-white p-3">
          <p className="font-medium mb-1">2. Dodaj więcej wizytówek (jeśli potrzebujesz)</p>
          <p className="text-gray-700">Kliknij <span className="text-[#5FA054]">&quot;Dodaj wizytówkę&quot;</span>, aby dodać kolejne – każdą z osobna możesz edytować.</p>
        </li>
    
        {/* Krok 3 */}
        <li className="bg-white p-3">
          <p className="font-medium mb-1">3. Sprawdź cenę i przejdź dalej</p>
          <p className="text-gray-700">Stała cena za usługę to <span className="font-medium">2199 zł brutto</span>. Kliknij <span className="text-[#5FA054]">&quot;Przejdź dalej&quot;</span>, aby kontynuować.</p>
        </li>
      </ol>
    </section>
  );
}
