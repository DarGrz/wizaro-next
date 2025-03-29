// components/ExplenationProfileRemoval.tsx

const ExplenationProfileRemoval = () => {
    return (
      <div className="w-full grid gap-6 text-left text-gray-700 mt-20">
        <h2 className="text-lg font-semibold text-gray-800 text-center">Jak wygląda proces usunięcia profilu?</h2>
  
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h3 className="text-md font-semibold mb-1">1. Przekazujesz nam dane</h3>
          <p>
            Wypełnij krótki formularz, podając link do profilu, który ma zostać usunięty, oraz podstawowe dane kontaktowe i rozliczeniowe.
            Gwarantujemy pełną poufność – wszystkie informacje wykorzystujemy wyłącznie w celu realizacji Twojego zlecenia.
          </p>
        </div>
  
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h3 className="text-md font-semibold mb-1">2. Dokonujesz płatności</h3>
          <p>
            Po uzupełnieniu formularza przechodzisz do płatności online za pośrednictwem Stripe. To szybkie, wygodne i w 100% bezpieczne.
            Natychmiast po otrzymaniu potwierdzenia płatności rozpoczynamy działania.
          </p>
        </div>
  
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h3 className="text-md font-semibold mb-1">3. Realizujemy usługę</h3>
          <p>
            Twoje zlecenie trafia bezpośrednio do realizacji. Standardowy czas usunięcia profilu nie przekracza <strong>7 dni</strong>.
            W przypadku jakichkolwiek niejasności lub potrzeby dodatkowej weryfikacji – skontaktujemy się z Tobą bezpośrednio.
            Naszym celem jest skuteczność i pełna transparentność na każdym etapie.
          </p>
        </div>
      </div>
    );
  };
  
  export default ExplenationProfileRemoval;
  