'use client';

import Script from "next/script";

export default function PolitykaPrywatnosciPage() {
  return (
    <div className="max-w-5xl mx-auto min-h-[70vh] py-20 px-6 text-gray-800">
      <h1 className="text-3xl font-semibold mb-6 text-[#002a5c]">Polityka prywatności</h1>

      <p className="mb-4">
        Administratorem danych osobowych jest Dariusz Grzegorczyk, NIP: 6782978644,
        z siedzibą w Krakowie, osiedle Oświecenia 57.
      </p>

      <ul className="list-disc list-inside space-y-2">
        <li>Dane zbierane za pośrednictwem formularzy (np. imię, nazwisko, e-mail, NIP, REGON, linki do profili) są wykorzystywane wyłącznie w celu realizacji usługi.</li>
        <li>Po zakończeniu realizacji usługi, dane są przechowywane przez maksymalnie 60 dni, a następnie bezpowrotnie usuwane.</li>
        <li>Użytkownik może zgłosić prośbę o wcześniejsze usunięcie danych kontaktując się pod adresem kontakt@wizaro.pl.</li>
        <li>Podanie danych jest dobrowolne, ale niezbędne do realizacji zamówienia.</li>
        <li>Strona może wykorzystywać pliki cookies wyłącznie w celach technicznych, reklamowych i niezbędnych do działania formularza.</li>
        <li>Użytkownik ma prawo do wglądu w swoje dane, ich poprawienia oraz żądania usunięcia.</li>
      </ul>

      {/* Cookiebot deklaracja */}
      <div className="mt-8">
        <Script
          id="CookieDeclaration"
          src="https://consent.cookiebot.com/39c85a43-3ea8-4832-b299-aadec8adf0fc/cd.js"
          type="text/javascript"
          async
        />
        <div id="CookieDeclaration"></div>
      </div>
    </div>
  );
}