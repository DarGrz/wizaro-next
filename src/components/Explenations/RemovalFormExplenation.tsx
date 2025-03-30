export default function RemovalFormExplenation() {
    return (
      <section className="text-gray-800 p-4 rounded-xl max-w-2xl mx-auto text-sm">
      <div className="text-xl sm:text-md text-center font-semibold border-b border-gray-200 rounded p-4 mb-4">
        Usuwająć profil z negatywnymi opiniami poprawiasz wizerunek firmy i zwiększasz jej wiarygodność.  
      </div>
    
      <ol className="space-y-3">
        {/* Krok 1 */}
        <li className="bg-white p-3">
          <p className="font-medium mb-1">1. Wprowadź dane firmy i link</p>
          <ul className="list-disc list-inside space-y-0.5 text-gray-700">
            <li>Nazwa firmy – np. „ABC Sp. z o.o.”</li>
            <li>NIP firmy – opcjonalnie, ale zalecane</li>
            <li>Link lub portal – np. Google Maps, GoWork, Aleo</li>
          </ul>
        </li>
    
        {/* Krok 2 */}
        <li className="bg-white p-3">
          <p className="font-medium mb-1">2. Dodaj więcej profili (jeśli potrzebujesz)</p>
          <p className="text-gray-700">Kliknij <span  className="text-[#5FA054]">„Dodaj profil”</span>, aby dodać kolejne – każdy z osobna możesz edytować.</p>
        </li>
    
        {/* Krok 3 */}
        <li className="bg-white p-3">
          <p className="font-medium mb-1">3. Sprawdź cenę i przejdź dalej</p>
          <p className="text-gray-700">Cena pojawi się automatycznie. Kliknij <span  className="text-[#5FA054]">„Przejdź dalej”</span>, aby kontynuować.</p>
        </li>
      </ol>
    </section>
    );
  }
  