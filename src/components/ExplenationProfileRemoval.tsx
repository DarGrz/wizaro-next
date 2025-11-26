"use client";

const ExplenationProfileRemoval = () => {
  return (
    <div className="w-full grid gap-6 text-left mt-20 px-4 text-[#0D2959]">
      <h2 className="text-lg font-semibold text-center text-[#0D2959]">
        Jak wygląda proces usunięcia profilu?
      </h2>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <h3 className="text-md font-semibold mb-2 text-[#0D2959]">
          1. Przekazujesz nam dane
        </h3>
        <p className="text-sm text-[#0D2959]">
          Wypełnij krótki formularz, podając link do profilu, który ma zostać
          usunięty, oraz podstawowe dane kontaktowe i rozliczeniowe.
          Gwarantujemy pełną poufność – wszystkie informacje wykorzystujemy
          wyłącznie w celu realizacji Twojego zlecenia.
        </p>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <h3 className="text-md font-semibold mb-2 text-[#0D2959]">
          2. Bezpieczna płatność online
        </h3>
        <p className="text-sm text-[#0D2959]">
          Po wypełnieniu formularza przechodzisz do bezpiecznej płatności przez Stripe. 
          Dzięki szybkim i bezpiecznym płatnościom możemy natychmiast rozpocząć 
          realizację Twojego zlecenia. Twoje dane są w pełni chronione.
        </p>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <h3 className="text-md font-semibold mb-2 text-[#0D2959]">
          3. Szybka realizacja
        </h3>
        <p className="text-sm text-[#0D2959]">
          Standardowy czas usunięcia profilu to maksymalnie{" "}
          <strong className="text-[#5FA054]">7 dni roboczych</strong>. Na
          bieżąco informujemy Cię o postępach. Po zakończeniu zlecenia 
          otrzymasz potwierdzenie oraz fakturę VAT na podane dane.
        </p>
      </div>
    </div>
  );
};

export default ExplenationProfileRemoval;
