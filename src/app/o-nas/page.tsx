'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10 bg-white">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-md p-10 flex flex-col gap-6">
        <h1 className="text-3xl font-semibold text-gray-900 text-center">O nas</h1>

        <p className="text-gray-700 text-lg">
          Wizaro.pl to portal specjalizujący się w usuwaniu niechcianych opinii i danych firmowych z Internetu.
          Naszą misją jest ochrona wizerunku przedsiębiorstw w sieci — pomagamy firmom odzyskać kontrolę nad swoją reputacją online.
        </p>

        <p className="text-gray-700 text-lg">
          Działamy szybko, skutecznie i zgodnie z obowiązującym prawem. Nasz zespół składa się z ekspertów z zakresu prawa, marketingu
          oraz nowych technologii. Wspieramy zarówno małe firmy lokalne, jak i duże przedsiębiorstwa w zarządzaniu ich obecnością w sieci.
        </p>

        <p className="text-gray-700 text-lg">
          Korzystając z naszego narzędzia, możesz łatwo zgłosić profile do usunięcia, generować dokumenty prawne oraz kontaktować się z odpowiednimi serwisami – wszystko z jednego miejsca.
        </p>

        <div className="mt-6 text-center">
          <a
            href="/kontakt"
            className="inline-block bg-[#002a5c] text-white py-2 px-6 rounded hover:bg-[#001e47] transition"
          >
            Skontaktuj się z nami
          </a>
        </div>
      </div>
    </div>
  );
}
