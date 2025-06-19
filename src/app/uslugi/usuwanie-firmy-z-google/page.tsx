'use client';

import React from "react";
import Link from "next/link";

export default function UsuwanieProfiluGooglePage() {
  return (
    <main className="max-w-5xl mx-auto px-2 md:px-8 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#002a5c] mb-8 text-center">
        Usuwanie Firmy z Google Maps
      </h1>

      {/* Sekcja wstępna */}
      <section className="bg-white rounded-xl shadow p-6 md:p-14 border border-gray-100 mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-[#002a5c] mb-4">
          Dlaczego warto usunąć nieaktualny profil firmowy z Google Maps?
        </h2>
        <p className="text-gray-800 leading-relaxed mb-4">
          Nieaktualne profile firmowe w Google Maps to poważny problem dla wielu przedsiębiorców. Może to być stara lokalizacja biznesu, profil stworzony przez osobę trzecią bez Twojej wiedzy, czy też zduplikowana wizytówka konkurująca z Twoim głównym profilem. Wszystkie te sytuacje negatywnie wpływają na Twoją widoczność online, dezorientują klientów i mogą powodować utratę zaufania do Twojej marki.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Kiedy potencjalny klient trafia na nieaktualny profil Twojej firmy, może to prowadzić do wielu problemów: próby kontaktu pod nieaktualnym numerem telefonu, podróży pod nieistniejący adres, czy też zniechęcenia się przez negatywne opinie, które zdążyły się zgromadzić na starym profilu. Nieaktualne dane mogą także wpływać na pozycjonowanie Twojej firmy w wynikach wyszukiwania Google, co bezpośrednio przekłada się na mniejszą liczbę klientów.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Usunięcie nieaktualnego profilu z Google Maps to krok w kierunku uporządkowania obecności Twojej firmy w internecie. To także szansa na nowy start i skupienie uwagi klientów na jednym, aktualnym profilu, którym możesz skutecznie zarządzać. W Wizaro.pl specjalizujemy się w kompleksowym usuwaniu niepożądanych wizytówek Google i resetowaniu profili firmowych, by pomóc Ci odzyskać kontrolę nad wizerunkiem marki.
        </p>

        <div className="flex justify-center mt-8">
          <Link href="/formularz-profil-google" className="bg-[#002a5c] hover:bg-[#004a8c] text-white font-bold py-3 px-6 rounded-full transition-colors duration-300">
            Zamów usunięcie profilu z Google Maps
          </Link>
        </div>
      </section>

      {/* Sekcja o problemach */}
      <section className="bg-white rounded-xl shadow p-6 md:p-14 border border-gray-100 mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-[#002a5c] mb-4">
          5 najczęstszych problemów z profilami w Google Maps
        </h2>
        
        <div className="space-y-8 mt-6">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] font-bold text-xl shrink-0">1</div>
            <div>
              <h3 className="text-lg font-semibold text-[#002a5c]">Zduplikowane profile firmy</h3>
              <p className="text-gray-700 mt-2">
                Duplikaty profili firmy w Google Maps dezorientują klientów i rozpraszają Twoją markę. Klienci mogą trafiać na różne wersje Twojego biznesu, z różnymi opiniami, godzinami otwarcia i danymi kontaktowymi. To utrudnia zarządzanie wizerunkiem i może prowadzić do utraty klientów.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] font-bold text-xl shrink-0">2</div>
            <div>
              <h3 className="text-lg font-semibold text-[#002a5c]">Nieaktualne dane lokalizacyjne</h3>
              <p className="text-gray-700 mt-2">
                Stare adresy, numery telefonów czy godziny otwarcia mogą prowadzić do frustrujących sytuacji dla klientów. Wyobraź sobie osobę, która przyjeżdża pod wskazany w Google Maps adres, tylko po to, by odkryć, że firma przeniosła się w inne miejsce. Takie doświadczenia mogą skutecznie zniechęcić klienta do ponownej próby kontaktu.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] font-bold text-xl shrink-0">3</div>
            <div>
              <h3 className="text-lg font-semibold text-[#002a5c]">Negatywne opinie na starych profilach</h3>
              <p className="text-gray-700 mt-2">
                Stare, nieaktualne profile często gromadzą negatywne opinie, którymi nie możesz zarządzać. Jeśli nie masz do nich dostępu, nie możesz odpowiadać na krytykę ani prosić zadowolonych klientów o dodanie pozytywnych recenzji. Taka sytuacja może poważnie szkodzić reputacji Twojej firmy.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] font-bold text-xl shrink-0">4</div>
            <div>
              <h3 className="text-lg font-semibold text-[#002a5c]">Profile utworzone przez osoby trzecie</h3>
              <p className="text-gray-700 mt-2">
                Zdarza się, że profil Twojej firmy został utworzony przez kogoś innego - klienta, byłego pracownika, a nawet konkurencję. Taki profil może zawierać błędne informacje i nie daje Ci kontroli nad tym, jak Twoja firma jest prezentowana w internecie. Google pozwala na zgłaszanie takich sytuacji, ale proces może być skomplikowany.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="bg-[#eef2f7] p-3 rounded-full h-12 w-12 flex items-center justify-center text-[#002a5c] font-bold text-xl shrink-0">5</div>
            <div>
              <h3 className="text-lg font-semibold text-[#002a5c]">Spadek pozycji w wyszukiwarce</h3>
              <p className="text-gray-700 mt-2">
                Wiele zduplikowanych lub nieaktualnych profili tej samej firmy może wpływać negatywnie na SEO i pozycjonowanie w Google. Wyszukiwarka preferuje spójne i aktualne informacje. Jeśli Google wykrywa sprzeczne dane o Twojej firmie, może to obniżyć pozycję wszystkich Twoich profili w wynikach wyszukiwania.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja o resetowaniu wizytówki */}
      <section className="bg-white rounded-xl shadow p-6 md:p-14 border border-gray-100 mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-[#002a5c] mb-4">
          Resetowanie wizytówki Google - nowy start dla Twojej firmy
        </h2>
        <p className="text-gray-800 leading-relaxed mb-4">
          Czasami sama edycja profilu czy próby usunięcia negatywnych opinii nie wystarczają. W takich przypadkach najlepszym rozwiązaniem może być kompletne resetowanie wizytówki Google. Jest to proces, w którym usuwamy istniejący profil i tworzymy nowy, czysty, bez historii negatywnych opinii.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          Resetowanie wizytówki to optymalne rozwiązanie, gdy:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 text-gray-800 mb-4">
          <li>Twój profil zgromadził wiele negatywnych opinii, których nie da się usunąć</li>
          <li>Straciłeś dostęp do swojej wizytówki Google i nie możesz nią zarządzać</li>
          <li>Chcesz rozpocząć budowanie wizerunku online od nowa, pod nową marką lub po rebrandingu</li>
          <li>Twoja firma zmienia lokalizację lub charakter działalności</li>
        </ul>
        
        <p className="text-gray-800 leading-relaxed mb-4">
          W Wizaro.pl przeprowadzamy proces resetowania wizytówki zgodnie z wytycznymi Google, aby nowy profil był stabilny i nie został automatycznie połączony ze starym. Nasza usługa obejmuje:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 text-gray-800 mb-6">
          <li>Analizę istniejących profili i wykrycie wszystkich duplikatów</li>
          <li>Usunięcie starego profilu z Google Maps</li>
          <li>Stworzenie nowej, zoptymalizowanej wizytówki Google</li>
          <li>Weryfikację nowego profilu i przekazanie do niego dostępu</li>
          <li>Doradztwo w zakresie zbierania pozytywnych opinii dla nowego profilu</li>
        </ul>

        <div className="flex justify-center mt-6">
          <Link href="/formularz-profil-google?reset=true" className="bg-[#002a5c] hover:bg-[#004a8c] text-white font-bold py-3 px-6 rounded-full transition-colors duration-300">
            Zamów resetowanie wizytówki Google
          </Link>
        </div>
      </section>

      {/* Sekcja FAQ */}
      <section className="bg-white rounded-xl shadow p-6 md:p-14 border border-gray-100 mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-[#002a5c] mb-6">
          Najczęściej zadawane pytania
        </h2>
        
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-[#002a5c] mb-2">Czy każdą wizytówkę Google można usunąć?</h3>
            <p className="text-gray-700">
              Tak, każdą wizytówkę można usunąć, ale proces zależy od tego, kto jest jej właścicielem. Jeśli masz pełen dostęp do profilu, możesz go usunąć samodzielnie. W przypadku profili utworzonych przez osoby trzecie lub gdy straciłeś dostęp, konieczna jest interwencja przez specjalne formularze Google i udowodnienie swojego związku z firmą.
            </p>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-[#002a5c] mb-2">Jak długo trwa usunięcie profilu z Google Maps?</h3>
            <p className="text-gray-700">
              Standardowy czas usunięcia profilu to 3-14 dni, w zależności od specyfiki przypadku. Gdy wizytówka jest własnością klienta, proces jest najszybszy. W przypadku profili utworzonych przez inne osoby, Google musi zweryfikować zgłoszenie, co wydłuża czas oczekiwania.
            </p>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-[#002a5c] mb-2">Czy po usunięciu profilu można stworzyć nowy dla tej samej firmy?</h3>
            <p className="text-gray-700">
              Tak, ale wymaga to odpowiedniego podejścia. Google może automatycznie powiązać nowy profil ze starym, jeśli dane są zbyt podobne. W Wizaro.pl wiemy, jak przeprowadzić proces resetowania wizytówki tak, aby nowy profil nie &quot;dziedziczył&quot; historii starego.
            </p>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-[#002a5c] mb-2">Czy po usunięciu profilu znikają wszystkie opinie?</h3>
            <p className="text-gray-700">
              Tak, wraz z usunięciem profilu wszystkie zgromadzone na nim opinie (zarówno pozytywne, jak i negatywne) zostają usunięte z Google. Jest to jeden z głównych powodów, dla których firmy decydują się na resetowanie wizytówki w przypadku nagromadzenia zbyt wielu negatywnych opinii.
            </p>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-[#002a5c] mb-2">Czy usunięcie profilu wpłynie na SEO mojej strony internetowej?</h3>
            <p className="text-gray-700">
              Usunięcie profilu może tymczasowo wpłynąć na widoczność Twojej firmy w Google, ale przy prawidłowym procesie resetowania i szybkim utworzeniu nowego, zoptymalizowanego profilu, efekt ten jest minimalizowany. W dłuższej perspektywie, uporządkowanie obecności w Google Maps zwykle pozytywnie wpływa na SEO.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-[#002a5c] mb-2">Jak długo trzeba czekać, zanim można utworzyć nowy profil po usunięciu starego?</h3>
            <p className="text-gray-700">
              Zalecamy odczekanie minimum 48-72 godzin od potwierdzenia usunięcia starego profilu przed utworzeniem nowego. W przypadku profili z dużą ilością opinii lub aktywności, ten okres może być dłuższy. W Wizaro.pl monitorujemy cały proces i doradzamy najlepszy moment na utworzenie nowej wizytówki.
            </p>
          </div>
        </div>
      </section>

      {/* Sekcja dlaczego warto nam zaufać */}
      <section className="bg-white rounded-xl shadow p-6 md:p-14 border border-gray-100 mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-[#002a5c] mb-6">
          Dlaczego warto nam zaufać?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#f8fafc] p-6 rounded-lg">
            <div className="w-12 h-12 bg-[#e6eef7] rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#002a5c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#002a5c] mb-2">Doświadczenie</h3>
            <p className="text-gray-700">
              Posiadamy wieloletnie doświadczenie w zarządzaniu profilami Google i skutecznie usunęliśmy setki nieaktualnych wizytówek dla naszych klientów. Nasza wiedza pozwala nam przewidzieć potencjalne problemy i je wyprzedzić.
            </p>
          </div>
          
          <div className="bg-[#f8fafc] p-6 rounded-lg">
            <div className="w-12 h-12 bg-[#e6eef7] rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#002a5c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#002a5c] mb-2">Skuteczność</h3>
            <p className="text-gray-700">
              Nasze metody są zgodne z wytycznymi Google, co zapewnia trwałe rezultaty. Nie stosujemy ryzykownych obejść, które mogłyby zaszkodzić Twojej firmie w przyszłości. Działamy transparentnie i zawsze informujemy o postępach.
            </p>
          </div>
          
          <div className="bg-[#f8fafc] p-6 rounded-lg">
            <div className="w-12 h-12 bg-[#e6eef7] rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#002a5c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#002a5c] mb-2">Bezpieczeństwo</h3>
            <p className="text-gray-700">
              Wszystkie dane naszych klientów są chronione zgodnie z RODO. Nie wymagamy dostępu do Twojego konta Google, a po zakończeniu usługi przekazujemy Ci pełną kontrolę nad nowym profilem.
            </p>
          </div>
          
          <div className="bg-[#f8fafc] p-6 rounded-lg">
            <div className="w-12 h-12 bg-[#e6eef7] rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#002a5c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#002a5c] mb-2">Wsparcie</h3>
            <p className="text-gray-700">
              Przez cały proces jesteśmy do Twojej dyspozycji. Odpowiadamy na pytania, informujemy o postępach i służymy radą w kwestii dalszego zarządzania profilem. Nasze wsparcie nie kończy się w momencie usunięcia starej wizytówki.
            </p>
          </div>
        </div>
      </section>

      {/* Sekcja wezwania do działania */}
      <section className="bg-[#002a5c] text-white rounded-xl shadow p-6 md:p-14 mb-10">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
          Odzyskaj kontrolę nad wizerunkiem swojej firmy w Google
        </h2>
        <p className="text-center mb-8 max-w-3xl mx-auto">
          Nie pozwól, aby nieaktualne profile i negatywne opinie wpływały na postrzeganie Twojej firmy. Skorzystaj z naszej usługi usuwania i resetowania wizytówek Google i zacznij budować swoją reputację online od nowa.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/formularz-profil" className="bg-white text-[#002a5c] hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors duration-300 text-center">
            Usuń profil z Google Maps
          </Link>
          <Link href="/kontakt" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#002a5c] font-bold py-3 px-8 rounded-full transition-colors duration-300 text-center">
            Skontaktuj się z nami
          </Link>
        </div>
      </section>
    </main>
  );
}
