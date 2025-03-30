"use client";

const ExplenationReviewRemoval = () => {
  return (
    <div className="w-full grid gap-6 text-left mt-20 px-4 text-[#0D2959]">
      <h2 className="text-lg font-semibold text-center text-[#0D2959]">
        Jak wygląda proces usunięcia opinii?
      </h2>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <h3 className="text-md font-semibold mb-2 text-[#0D2959]">
          1. Wprowadzasz dane opinii
        </h3>
        <p className="text-sm text-[#0D2959]">
          W formularzu podajesz treść opinii, autora, link i datę dodania. Im więcej informacji, tym większa skuteczność. 
          Możesz dodać kilka opinii naraz – wszystkie trafiają do realizacji.
        </p>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <h3 className="text-md font-semibold mb-2 text-[#0D2959]">
          2. Wypełniasz dane firmy i dokonujesz płatności
        </h3>
        <p className="text-sm text-[#0D2959]">
          Po dodaniu opinii, podajesz dane firmy oraz dane do faktury, jeśli są inne. 
          Następnie przechodzisz do płatności online – szybko, wygodnie i bezpiecznie.
        </p>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <h3 className="text-md font-semibold mb-2 text-[#0D2959]">
          3. Zajmujemy się usunięciem
        </h3>
        <p className="text-sm text-[#0D2959]">
          Po zaksięgowaniu płatności rozpoczynamy działania. Każda sprawa jest traktowana indywidualnie, a większość opinii 
          usuwamy w ciągu <strong className="text-[#5FA054]">21 dni roboczych</strong>. Na bieżąco informujemy Cię o postępach.
        </p>
      </div>
    </div>
  );
};

export default ExplenationReviewRemoval;
