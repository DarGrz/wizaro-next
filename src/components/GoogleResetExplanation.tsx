"use client";

const GoogleResetExplanation = () => {
  return (
    <div className="w-full grid gap-6 text-left mt-20 px-4 text-[#0D2959]">
      <h2 className="text-lg font-semibold text-center text-[#0D2959]">
        Jak wygląda proces resetowania wizytówki Google?
      </h2>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <h3 className="text-md font-semibold mb-2 text-[#0D2959]">
          1. Przekazujesz nam dane
        </h3>
        <p className="text-sm text-[#0D2959]">
          Wypełnij krótki formularz, podając link do wizytówki Google, która ma zostać
          zresetowana, oraz podstawowe dane kontaktowe i rozliczeniowe.
          Gwarantujemy pełną poufność – wszystkie informacje wykorzystujemy
          wyłącznie w celu realizacji Twojego zlecenia.
        </p>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <h3 className="text-md font-semibold mb-2 text-[#0D2959]">
          2. Rozpoczynamy procedurę resetowania
        </h3>
        <p className="text-sm text-[#0D2959]">
          Po wypełnieniu formularza Twoje zlecenie trafia do realizacji. Wykorzystujemy 
          oficjalne API Google oraz specjalistyczne narzędzia, aby całkowicie zresetować 
          wizytówkę. Nie wymagamy żadnej przedpłaty — działamy od razu, a płatność 
          następuje dopiero po zakończeniu usługi.
        </p>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <h3 className="text-md font-semibold mb-2 text-[#0D2959]">
          3. Płatność po realizacji
        </h3>
        <p className="text-sm text-[#0D2959]">
          Standardowy czas resetowania wizytówki Google to maksymalnie{" "}
          <strong className="text-[#5FA054]">14 dni roboczych</strong>. Na
          bieżąco informujemy Cię o postępach. Po skutecznym zakończeniu
          zlecenia, otrzymasz link do płatności. Możesz wybrać dogodną
          metodę płatności, a my wystawimy fakturę VAT na Twoje dane.
        </p>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <h3 className="text-md font-semibold mb-2 text-[#0D2959]">
          4. Odzyskujesz kontrolę nad wizytówką
        </h3>
        <p className="text-sm text-[#0D2959]">
          Po zresetowaniu, Twoja wizytówka Google jest całkowicie oczyszczona ze wszystkich 
          negatywnych opinii i historii. Otrzymasz instrukcje, jak ponownie przejąć nad nią 
          kontrolę i rozpocząć budowanie pozytywnego wizerunku firmy od nowa.
        </p>
      </div>
    </div>
  );
};

export default GoogleResetExplanation;
