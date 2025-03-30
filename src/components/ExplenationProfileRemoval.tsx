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
          Wypełnij krótki formularz, podając link do profilu, który ma zostać usunięty, oraz podstawowe dane kontaktowe i rozliczeniowe.
          Gwarantujemy pełną poufność – wszystkie informacje wykorzystujemy wyłącznie w celu realizacji Twojego zlecenia.
        </p>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <h3 className="text-md font-semibold mb-2 text-[#0D2959]">
          2. Dokonujesz płatności
        </h3>
        <p className="text-sm text-[#0D2959]">
          Po uzupełnieniu formularza przechodzisz do płatności online za pośrednictwem Stripe. To szybkie, wygodne i w 100% bezpieczne.
          Natychmiast po otrzymaniu potwierdzenia płatności rozpoczynamy działania.
        </p>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <h3 className="text-md font-semibold mb-2 text-[#0D2959]">
          3. Realizujemy usługę
        </h3>
        <p className="text-sm text-[#0D2959]">
          Twoje zlecenie trafia bezpośrednio do realizacji. Standardowy czas usunięcia profilu nie przekracza{" "}
          <strong className="text-[#5FA054]">7 dni</strong>. W przypadku jakichkolwiek niejasności lub potrzeby dodatkowej weryfikacji – 
          skontaktujemy się z Tobą bezpośrednio. Naszym celem jest skuteczność i pełna transparentność na każdym etapie.
        </p>
      </div>
    </div>
  );
};

export default ExplenationProfileRemoval;
