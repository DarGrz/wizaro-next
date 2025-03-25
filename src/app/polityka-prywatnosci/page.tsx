'use client';

export default function PolitykaPrywatnosciPage() {
  return (
    <div className="max-w-3xl mx-auto py-20 px-6 text-gray-800">
      <h1 className="text-3xl font-semibold mb-6 text-[#002a5c]">Polityka prywatności</h1>

      <p className="mb-4">
        Administratorem danych osobowych jest Dariusz Grzegorczyk, NIP: 6782978644,
        z siedzibą w Krakowie, osiedle Oświecenia 57.
      </p>

      <ul className="list-disc list-inside space-y-2">
        <li>Dane zbierane za pośrednictwem formularzy (np. imię, nazwisko, e-mail, NIP, REGON, linki do profili) są wykorzystywane wyłącznie w celu realizacji usługi.</li>
        <li>Dane te nie są przekazywane osobom trzecim, ani wykorzystywane do celów marketingowych.</li>
        <li>Po zakończeniu realizacji usługi, dane są przechowywane przez maksymalnie 60 dni, a następnie bezpowrotnie usuwane.</li>
        <li>Użytkownik może zgłosić prośbę o wcześniejsze usunięcie danych kontaktując się pod adresem kontakt@wzorypism.io.</li>
        <li>Serwis nie profiluje użytkowników, nie wykorzystuje systemów reklamowych i nie analizuje aktywności użytkowników.</li>
        <li>Podanie danych jest dobrowolne, ale niezbędne do realizacji zamówienia.</li>
        <li>Strona może wykorzystywać pliki cookies wyłącznie w celach technicznych i niezbędnych do działania formularza.</li>
        <li>Użytkownik ma prawo do wglądu w swoje dane, ich poprawienia oraz żądania usunięcia.</li>
      </ul>
    </div>
  );
}