'use client';


export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10 bg-white">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-md p-10 flex flex-col gap-6">
        <h1 className="text-3xl font-semibold text-gray-900 text-center mb-8">O nas</h1>

       

        <div className="border-t border-gray-200 pt-6">
          <p className="text-gray-700 text-lg">
            Wizaro.pl to portal specjalizujący się w usuwaniu niechcianych opinii i danych firmowych z Internetu.
            Naszą misją jest ochrona wizerunku przedsiębiorstw w sieci — pomagamy firmom odzyskać kontrolę nad swoją reputacją online.
          </p>

          <p className="text-gray-700 text-lg mt-4">
            Działamy szybko, skutecznie i zgodnie z obowiązującym prawem. Nasz zespół składa się z ekspertów z zakresu prawa, marketingu
            oraz nowych technologii. Wspieramy zarówno małe firmy lokalne, jak i duże przedsiębiorstwa w zarządzaniu ich obecnością w sieci.
          </p>

          <p className="text-gray-700 text-lg mt-4">
            Korzystając z naszego narzędzia, możesz łatwo zgłosić profile do usunięcia, generować dokumenty prawne oraz kontaktować się z odpowiednimi serwisami – wszystko z jednego miejsca.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl mt-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Masz pytania? Zadzwoń do nas!</h3>
          <p className="text-gray-700">
            Jesteśmy dostępni od poniedziałku do piątku, w godzinach 9:00–17:00
          </p>
          <a href="tel:+48792861513" className="text-xl font-bold text-[#002a5c] hover:underline block mt-2">
            +48 792 861 513
          </a>
          <a href="mailto:kontakt@wizaro.pl" className="text-lg text-[#002a5c] hover:underline block mt-1">
            kontakt@wizaro.pl
          </a>
        </div>

        <div className="text-center text-gray-500 text-sm mt-6">
          NIP: 6782978644<br />
          Kraków, 31-636
        </div>
      </div>
    </div>
  );
}
