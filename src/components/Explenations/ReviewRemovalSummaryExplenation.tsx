"use client";

export default function ReviewRemovalSummaryExplenation() {
  return (
    <section className="text-gray-800 p-4 rounded-xl max-w-2xl mx-auto text-sm">
      <div className="text-xl sm:text-md text-center font-semibold border-b border-gray-200 rounded p-4 mb-4">
        Sprawdź wszystkie dane przed finalizacją – po kliknięciu „Przejdź do płatności” zostaniesz przekierowany do bezpiecznej strony płatności.
      </div>

      <ol className="space-y-3">
        {/* Krok 1 */}
        <li className="bg-white p-3">
          <p className="font-medium mb-1">1. Zweryfikuj dane firmy i płatnika</p>
          <p className="text-gray-700">
            Upewnij się, że dane firmy i – jeśli dotyczy – dane płatnika są poprawne. Zostaną one wykorzystane do wystawienia faktury i przygotowania dokumentów.
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
          <p className="font-medium mb-1">3. Przejdź do płatności</p>
          <p className="text-gray-700">
            Klikając „Przejdź do płatności”, rozpoczniesz finalizację zamówienia. Płatność odbywa się w bezpiecznym systemie płatniczym online.
          </p>
        </li>
      </ol>
    </section>
  );
}
