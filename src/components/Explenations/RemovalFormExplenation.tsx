export default function RemovalFormExplenation() {
    return (
      <section className="text-gray-800 p-4 rounded-xl max-w-2xl mx-auto text-sm">
      <div className="text-xl sm:text-md text-center font-semibold border-b border-gray-200 rounded p-4 mb-4">
        Usuwająć profil z negatywnymi opiniami poprawiasz wizerunek firmy i zwiększasz jej wiarygodność.  
      </div>
    
      <ol className="space-y-3">
        {/* Krok 1 */}
        <li className="bg-white p-3">
          <p className="font-medium mb-1">1. Wprowadź dane firmy </p>
          <ul className="list-disc list-inside space-y-0.5 text-gray-700">
            <li>Wpisz NIP firmy, której informacje chcesz usunąć - dane zaczytają się automatycznie</li>
         </ul>
        </li>
    
        {/* Krok 2 */}
        <li className="bg-white p-3">
          <p className="font-medium mb-1">2. Dokonaj wyboru portali</p>
          <p className="text-gray-700">Po wpisaniu poprawnego NIP pokaże się lista z portalami. Wybierz te, z których chcesz usunąć profil.</p>
        </li>
    
        {/* Krok 3 */}
        <li className="bg-white p-3">
          <p className="font-medium mb-1">3. Sprawdź cenę i przejdź dalej</p>
          <p className="text-gray-700">Cena podliczy się automatycznie. Kliknij <span  className="text-[#5FA054]">„Przejdź dalej”</span>, aby kontynuować.</p>
        </li>
      </ol>
    </section>
    );
  }
  