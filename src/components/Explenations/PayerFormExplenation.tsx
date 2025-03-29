"use client";

export default function PayerFormExplenation() {
  return (
    <section className="text-gray-800 p-4 rounded-xl max-w-2xl mx-auto text-sm">
      <div className="text-xl sm:text-md text-center font-semibold border-b border-gray-200 rounded p-4 mb-4">
        Podaj dane płatnika – osobę lub firmę, która opłaci usługę. Informacje te zostaną użyte do wystawienia faktury.
      </div>

      <ol className="space-y-3">
        {/* Krok 1 */}
        <li className="bg-white p-3">
          <p className="font-medium mb-1">1. Wprowadź dane osobowe</p>
          <ul className="list-disc list-inside text-gray-700 space-y-0.5">
            <li>Imię i nazwisko osoby opłacającej usługę</li>
            <li>Adres e-mail – otrzymasz na niego fakturę i potwierdzenie</li>
          </ul>
        </li>

        {/* Krok 2 */}
        <li className="bg-white p-3">
          <p className="font-medium mb-1">2. Uzupełnij dane firmowe (jeśli dotyczy)</p>
          <ul className="list-disc list-inside text-gray-700 space-y-0.5">
            <li>Nazwa firmy – jeśli płatnikiem jest firma</li>
            <li>NIP – jeśli chcesz, aby pojawił się na fakturze</li>
          </ul>
        </li>

        {/* Krok 3 */}
        <li className="bg-white p-3">
          <p className="font-medium mb-1">3. Adres płatnika</p>
          <p className="text-gray-700">
            Wpisz ulicę, kod pocztowy i miasto – dane te zostaną umieszczone na fakturze.
          </p>
        </li>
      </ol>
    </section>
  );
}
