const ExplenationStartPage = () => {
  return (
    <div className="w-full grid gap-6 text-left text-gray-700 mt-20">
      <h2 className="text-lg font-semibold text-gray-800 text-center">
        Jak to działa?
      </h2>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="text-md font-semibold mb-1">1. Wskazujesz, co chcesz usunąć</h3>
        <p>
          Podajesz linki do miejsc w internecie, z których chcesz usunąć dane o swojej firmie lub niechciane opinie. 
          Im więcej informacji przekażesz, tym szybciej możemy działać.
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="text-md font-semibold mb-1">2. Korzystamy ze sprawdzonych metod</h3>
        <p>
          Mamy doświadczenie, wypracowane procedury i rozwiązania techniczne, które pozwalają skutecznie rozwiązywać takie problemy. 
          Wiemy, jak działać, aby osiągnąć efekty – legalnie i dyskretnie.
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="text-md font-semibold mb-1">3. Szybko realizujemy zgłoszenie</h3>
        <p>
          Działamy od razu po otrzymaniu zgłoszenia. Większość spraw rozwiązujemy w ciągu <strong>kilku dni roboczych</strong>. 
          Informujemy Cię o postępach i finalnym usunięciu danych lub opinii.
        </p>
      </div>
    </div>
  );
};

export default ExplenationStartPage;