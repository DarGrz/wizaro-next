"use client";

export default function ReviewRemovalSummaryExplenation() {
  return (
    <section className="text-gray-800 p-4 rounded-xl max-w-2xl mx-auto text-sm">
      <div className="text-xl sm:text-md text-center font-semibold border-b border-gray-200 rounded p-4 mb-4">
        Sprawdź wszystkie informacje przed finalizacją zlecenia.
      </div>

      <ol className="space-y-3">
        {/* Krok 1 */}
        <li className="bg-white p-3">
          <p className="font-medium mb-1">1. Zweryfikuj dane firmy</p>
          <p className="text-gray-700">
            Upewnij się, że dane firmy są poprawne. Zostaną one wykorzystane do wystawienia faktury i przygotowania dokumentów.
          </p>
        </li>

        {/* Krok 2 */}
        <li className="bg-white p-3">
          <p className="font-medium mb-1">2. Sprawdź zgłoszone opinie</p>
          <p className="text-gray-700">
            Na liście widnieją wszystkie opinie zgłoszone do usunięcia. W razie potrzeby możesz wrócić i edytować dane.
          </p>
        </li>

        {/* Krok 3 */}
        <li className="bg-white p-3">
          <p className="font-medium mb-1">3. Wyślij zlecenie</p>
          <p className="text-gray-700">
           Opinie zgłoszone do usunięcie od razu trafiają do realizacji, Ty już nic nie musisz robić. 
          </p>
        </li>
      </ol>
    </section>
  );
}
