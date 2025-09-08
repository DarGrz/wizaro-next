//UsuniecieNegatywnychOpiniiPage.tsx

"use client";

import { useState } from "react";
import BusinessTypeSelector from "./BusinessTypeSelector";
import MobileActionButton from "./MobileActionButton";
import BusinessTypeSelectorNegativeReviews from "./BusinessTypeSelectorNegativeReviews";
import BusinessTypeSelectorCTA from "./BusinessTypeSelectorCTA";
import Link from "next/link";
import GuaranteeSection from "./GuaranteeSection";

export default function UsuniecieFalszywychOpiniiPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePlatformSelect = (platform: string) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedPlatform(platform);
      setIsAnimating(false);
    }, 300);
  };

  const handleBackToSelection = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedPlatform(null);
      setIsAnimating(false);
    }, 300);
  };
  return (
    <div className="min-h-screen mx-auto flex items-center justify-center px-2 flex-col max-w-4xl pt-10">
      {/* Przycisk mobilny */}
      <MobileActionButton />
      
      {/* Główna sekcja z nagłówkiem i selektorem */}
      <div className="gap-6 mb-4 lg:flex hidden md:block">
        <div className="md:p-10 p-4 w-full max-w-lg mt-4 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Usuwanie Negatywnych Opinii z Google, GoWork, Aleo i innych
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Zadbaj o wizerunek swojej firmy w sieci i przyciągaj nowych klientów.
          </p>
        </div>

        <BusinessTypeSelector />
      </div>

      {/* Mobilna wersja selektora */}
      <div className="md:gap-8 pt-5 w-full md:hidden block">
        <BusinessTypeSelectorNegativeReviews />
      </div>

      {/* Separator */}
      <div className="w-full max-w-4xl px-4">
        <hr className="border-t border-gray-300 my-8" />
      </div>

      {/* Dodatkowe usługi */}
      <div className="w-full max-w-4xl px-4 mb-8">
        <div className="grid md:grid-cols-1 gap-6">
          
          {/* Usuwanie firmy z Google */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Ikona Google */}
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>

              {/* Treść */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Usuwanie firmy z Google Maps
                </h3>
                <p className="text-gray-600 mb-4">
                  Pomożemy Ci usunąć profil Twojej firmy z Map Google i Google Moja Firma. 
                  Kompleksowe usunięcie zgodnie z procedurami Google.
                </p>
                <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Usunięcie profilu GMB</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Usunięcie Firmy z Map Google</span>
                </div>
                <Link href="/formularz-profil-google" className="inline-block">
                  <button className="px-6 py-3 bg-[#002a5c] text-white rounded-lg font-semibold hover:bg-[#001e47] transition duration-200 shadow-sm">
                    Usuń firmę z Google
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Resetowanie wizytówki Google */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Ikona Resetowania */}
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5BA155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                  <path d="M21 3v5h-5"/>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                  <path d="M3 21v-5h5"/>
                </svg>
              </div>

              {/* Treść */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Resetowanie Wizytówki Google
                </h3>
                <p className="text-gray-600 mb-4">
                  Wizytówka z negatywnymi opiniami? Zresetujemy ją całkowicie, 
                  zachowując pozycję w Google Maps i umożliwiając budowanie reputacji od nowa.
                </p>
                <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Usunięcie opinii</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Zachowanie pozycji</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Nowy start</span>
                </div>
                <Link href="/formularz-profil-google?reset=true" className="inline-block">
                  <button className="px-6 py-3 bg-[#5BA155] text-white rounded-lg font-semibold hover:bg-[#4a8c47] transition duration-200 shadow-sm">
                    Resetuj wizytówkę
                  </button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CTA telefoniczne */}
      {/* <div className="flex flex-col items-center gap-2 mt-6 mb-10 shadow-lg rounded-lg p-6">
        <p className="text-center text-gray-700 font-bold">
          Zadzwoń jeśli potrzebujesz pomocy prawnej w sprawach opinii
        </p>
        <Link href="tel:+48792861513" className="mx-auto mt-2">
          <button className="bg-[#5BA155] text-white px-6 py-2 rounded font-semibold hover:bg-[#5BA155] transition">
            +48 792 861 513
          </button>
        </Link>
      </div> */}

      <div className="md:flex  md:gap-8 pt-5 ">
              <GuaranteeSection />
            </div>

      {/* Główny artykuł edukacyjny */}
      <article className="w-full max-w-4xl px-4 py-8">
        <div className="prose prose-lg max-w-none">
          
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Dlaczego opinie w Google i na innych portalach mają tak duży wpływ na biznes?
          </h2>
          
          <div className="space-y-8 mb-12">
            <div>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                W dzisiejszym cyfrowym świecie opinie online stały się jednym z najważniejszych czynników wpływających na decyzje zakupowe konsumentów. 
                Badania pokazują, że aż 87% klientów sprawdza opinie przed podjęciem decyzji o współpracy z firmą.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Opinie wpływają nie tylko na percepcję marki, ale także na jej widoczność w wynikach wyszukiwania. Google traktuje recenzje jako ważny sygnał 
                rankingowy, co oznacza, że firmy z lepszymi ocenami częściej pojawiają się w górnych pozycjach wyników wyszukiwania.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Jak działa system ocen (algorytmy, widoczność wizytówek)?</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Algorytmy Google uwzględniają kilka kluczowych czynników przy określaniu pozycji wizytówki firmy:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li><strong>Średnia ocena:</strong> Firmy z oceną powyżej 4.0 gwiazdek mają znacznie lepszą widoczność</li>
                <li><strong>Liczba opinii:</strong> Większa liczba recenzji zwiększa wiarygodność i pozycję</li>
                <li><strong>Świeżość opinii:</strong> Regularne otrzymywanie nowych opinii sygnalizuje aktywność firmy</li>
                <li><strong>Odpowiedzi na opinie:</strong> Aktywne zarządzanie opiniami przez firmę wpływa pozytywnie na ranking</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                System uwzględnia również jakość opinii - szczegółowe recenzje z konkretnymi informacjami są bardziej wartościowe niż krótkie, ogólne komentarze.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Statystyki i badania dotyczące zachowań klientów</h3>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Kluczowe statystyki:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 87% sprawdza opinie przed wizytą</li>
                      <li>• 73% ufa opiniom jak rekomendacjom znajomych</li>
                      <li>• 68% spadek przychodów przy ocenie poniżej 4.0</li>
                      <li>• 12x większa szansa wyboru z oceną 4.5+ vs 3.5</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Zachowania konsumentów:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 60% czyta minimum 5 ostatnich opinii</li>
                      <li>• 45% sprawdza odpowiedzi firmy na recenzje</li>
                      <li>• 40% omija firmy z oceną poniżej 3.5</li>
                      <li>• 25% akceptuje firmę bez opinii</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Jak rozpoznać fałszywą opinię?
          </h2>

          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Typowe cechy fałszywych recenzji</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h4 className="font-semibold text-red-800 mb-3">⚠️ Sygnały ostrzegawcze:</h4>
                  <ul className="space-y-2 text-red-700">
                    <li>• Brak konkretnych szczegółów</li>
                    <li>• Powtarzające się frazy i schematy</li>
                    <li>• Nowe konta bez historii</li>
                    <li>• Skrajnie pozytywne lub negatywne</li>
                    <li>• Publikowane w krótkim czasie</li>
                    <li>• Podobny styl pisania</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-semibold text-green-800 mb-3">✅ Cechy prawdziwych opinii:</h4>
                  <ul className="space-y-2 text-green-700">
                    <li>• Konkretne szczegóły usługi</li>
                    <li>• Zróżnicowany język i styl</li>
                    <li>• Konta z historią aktywności</li>
                    <li>• Zbalansowane oceny</li>
                    <li>• Logiczna chronologia</li>
                    <li>• Indywidualny charakter</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Różnica między uczciwą krytyką a opinią naruszającą regulaminy</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-semibold text-green-800 mb-2">Uczciwa krytyka:</h4>
                  <p className="text-gray-700">
                    Oparta na faktach, konstruktywna, odnosząca się do konkretnego doświadczenia klienta. 
                    Może być negatywna, ale zawiera uzasadnione uwagi dotyczące jakości usługi.
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-6">
                  <h4 className="font-semibold text-red-800 mb-2">Opinia naruszająca regulaminy:</h4>
                  <p className="text-gray-700">
                    Zawiera nieprawdziwe informacje, wulgaryzmy, groźby, dyskryminację lub została napisana 
                    przez osobę, która nie korzystała z usług firmy.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Przykłady z różnych branż</h3>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">🏥 Ochrona zdrowia:</h4>
                  <p className="text-gray-700 mb-2"><strong>Fałszywa opinia:</strong> &ldquo;Lekarz jest niekompetentny, zepsuli mi zęby, unikajcie!&rdquo;</p>
                  <p className="text-gray-700"><strong>Problem:</strong> Brak konkretów, osoba mogła nie być pacjentem, generalizacja</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">🍽️ Gastronomia:</h4>
                  <p className="text-gray-700 mb-2"><strong>Fałszywa opinia:</strong> &ldquo;Jedzenie zimne, obsługa chamska, najgorsze miejsce w mieście&rdquo;</p>
                  <p className="text-gray-700"><strong>Problem:</strong> Brak szczegółów, emocjonalne stwierdzenia, ogólniki</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">🏨 Hotelarstwo:</h4>
                  <p className="text-gray-700 mb-2"><strong>Fałszywa opinia:</strong> &ldquo;Hotel brudny, pełno much, nie polecam nikomu&rdquo;</p>
                  <p className="text-gray-700"><strong>Problem:</strong> Przesadne stwierdzenia, brak konkretnej daty pobytu</p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Jak samodzielnie reagować na negatywne opinie?
          </h2>

          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Jak napisać odpowiedź do klienta, żeby zminimalizować szkody</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-blue-800 mb-3">🎯 Zasady skutecznej odpowiedzi:</h4>
                <ul className="space-y-2 text-blue-700">
                  <li>• <strong>Szybka reakcja:</strong> Odpowiedz w ciągu 24-48 godzin</li>
                  <li>• <strong>Profesjonalny ton:</strong> Zachowaj spokój i uprzejmość</li>
                  <li>• <strong>Personalizacja:</strong> Odnieś się do konkretnych zarzutów</li>
                  <li>• <strong>Prywatność:</strong> Zaproś do kontaktu bezpośredniego</li>
                  <li>• <strong>Konstruktywność:</strong> Pokaż chęć rozwiązania problemu</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                  <h4 className="font-semibold text-red-800 mb-3">❌ Błędne podejście:</h4>
                  <p className="text-red-700 text-sm italic mb-3">
                    &ldquo;Pan się myli, u nas zawsze jest czysto i profesjonalnie. 
                    Inne opinie tego dowodzą. Może Pan pomylił nas z innym miejscem.&rdquo;
                  </p>
                  <p className="text-red-700 text-sm">
                    <strong>Problem:</strong> Defensywne, kwestionuje doświadczenie klienta
                  </p>
                </div>
                <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                  <h4 className="font-semibold text-green-800 mb-3">✅ Prawidłowe podejście:</h4>
                  <p className="text-green-700 text-sm italic mb-3">
                    &ldquo;Dziękujemy za opinię. Przykro nam, że nie spełniliśmy Państwa oczekiwań. 
                    Prosimy o kontakt - chcielibyśmy wyjaśnić sytuację i poprawić nasze usługi.&rdquo;
                  </p>
                  <p className="text-green-700 text-sm">
                    <strong>Zaleta:</strong> Szanuje klienta, pokazuje zaangażowanie
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Jak zgłosić opinię do Google (instrukcja krok po kroku)</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 border-l-2 border-blue-400 pl-6">
                  <div className="text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0 text-sm" style={{backgroundColor: '#081D44'}}>
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Znajdź opinię na Google Maps</h4>
                    <p className="text-gray-700">Wejdź na Google Maps, znajdź swoją firmę i przejdź do sekcji z opiniami</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 border-l-2 border-blue-400 pl-6">
                  <div className="text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0 text-sm" style={{backgroundColor: '#081D44'}}>
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Kliknij trzy kropki przy opinii</h4>
                    <p className="text-gray-700">Przy każdej opinii znajdziesz menu z trzema kropkami (⋮) - kliknij w nie</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 border-l-2 border-blue-400 pl-6">
                  <div className="text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0 text-sm" style={{backgroundColor: '#081D44'}}>
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Wybierz &ldquo;Zgłoś recenzję&rdquo;</h4>
                    <p className="text-gray-700">Z rozwijanego menu wybierz opcję zgłoszenia opinii</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 border-l-2 border-blue-400 pl-6">
                  <div className="text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0 text-sm" style={{backgroundColor: '#081D44'}}>
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Wybierz powód zgłoszenia</h4>
                    <p className="text-gray-700">Dostępne opcje: spam, nieprawdziwe informacje, konflikt interesów, treści obraźliwe, nie na temat</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 border-l-2 border-blue-400 pl-6">
                  <div className="text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0 text-sm" style={{backgroundColor: '#081D44'}}>
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Wyślij zgłoszenie</h4>
                    <p className="text-gray-700">Google rozpatrzy zgłoszenie w ciągu 1-7 dni roboczych</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Jak dokumentować naruszenia (screenshoty, dane konta)</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-semibold text-yellow-800 mb-4">📋 Lista niezbędnej dokumentacji:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-yellow-800 mb-2">Screenshoty:</h5>
                    <ul className="space-y-1 text-yellow-700 text-sm">
                      <li>• Pełna opinia z datą publikacji</li>
                      <li>• Profil autora opinii</li>
                      <li>• Historia opinii użytkownika</li>
                      <li>• Ekran z opcjami zgłoszenia</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-yellow-800 mb-2">Dane do zebrania:</h5>
                    <ul className="space-y-1 text-yellow-700 text-sm">
                      <li>• Nazwa użytkownika</li>
                      <li>• Data utworzenia konta</li>
                      <li>• Liczba i rodzaj opinii</li>
                      <li>• Link do profilu</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-100 rounded">
                  <p className="text-yellow-800 text-sm">
                    <strong>Wskazówka:</strong> Rób screenshoty całych stron, nie tylko fragmentów. 
                    Używaj narzędzi systemowych (Windows + Shift + S) lub rozszerzeń przeglądarki.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Wpływ ocen na SEO i sprzedaż
          </h2>

          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Jak ocena &lt;4.0 wpływa na konwersje i ruch na stronie</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h4 className="font-semibold text-red-800 mb-3">📉 Negatywne skutki oceny &lt;4.0:</h4>
                  <ul className="space-y-2 text-red-700">
                    <li>• 68% spadek kliknięć w wizytówkę</li>
                    <li>• 45% mniej zapytań telefonicznych</li>
                    <li>• 52% spadek ruchu na stronę internetową</li>
                    <li>• 71% niższa konwersja z wizyt na stronie</li>
                    <li>• Utrata pozycji w &ldquo;map pack&rdquo; Google</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-3">🎯 Mechanizm działania:</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Google obniża pozycję w wynikach</li>
                    <li>• Klienci omijają firmę już na etapie przeglądu</li>
                    <li>• Spadek wskaźnika CTR (Click Through Rate)</li>
                    <li>• Niższa jakość ruchu na stronie</li>
                    <li>• Utrata zaufania potencjalnych klientów</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">📊 Przykład biznesowy - restauracja:</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">Przed (3.8⭐)</div>
                    <div className="text-gray-600">120 kliknięć/dzień</div>
                    <div className="text-gray-600">8 rezerwacji/dzień</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">→</div>
                    <div className="text-gray-600">Spadek</div>
                    <div className="text-gray-600">o 68%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">Po (4.4⭐)</div>
                    <div className="text-gray-600">38 kliknięć/dzień</div>
                    <div className="text-gray-600">2-3 rezerwacji/dzień</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Jak poprawa o 0.5 gwiazdki przekłada się na liczbę klientów</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-4">📈 Korzyści z poprawy oceny o 0.5 gwiazdki:</h4>
                <div className="grid md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white rounded-lg p-4 border border-green-300">
                    <div className="text-xl font-bold text-green-800">+18%</div>
                    <div className="text-green-700 text-sm">więcej kliknięć</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-300">
                    <div className="text-xl font-bold text-green-800">+13%</div>
                    <div className="text-green-700 text-sm">więcej telefonów</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-300">
                    <div className="text-xl font-bold text-green-800">+25%</div>
                    <div className="text-green-700 text-sm">lepsza konwersja</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-300">
                    <div className="text-xl font-bold text-green-800">+31%</div>
                    <div className="text-green-700 text-sm">przychody</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Przykład kalkulacji dla gabinetu dentystycznego:</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Ocena</th>
                        <th className="text-left py-2">Miesięczne wizyty</th>
                        <th className="text-left py-2">Średnia wartość</th>
                        <th className="text-left py-2">Miesięczny przychód</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b">
                        <td className="py-2">3.5⭐</td>
                        <td className="py-2">80 pacjentów</td>
                        <td className="py-2">350 zł</td>
                        <td className="py-2">28 000 zł</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">4.0⭐</td>
                        <td className="py-2">95 pacjentów</td>
                        <td className="py-2">350 zł</td>
                        <td className="py-2">33 250 zł</td>
                      </tr>
                      <tr className="border-b bg-green-50">
                        <td className="py-2 font-semibold">4.5⭐</td>
                        <td className="py-2 font-semibold">120 pacjentów</td>
                        <td className="py-2 font-semibold">350 zł</td>
                        <td className="py-2 font-semibold">42 000 zł</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-blue-800 text-sm">
                    <strong>Wniosek:</strong> Poprawa z 3.5 do 4.5 gwiazdek = +50% pacjentów = +14 000 zł miesięcznie
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Rola opinii w pozycjonowaniu w Google Maps</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">🗺️ Czynniki rankingowe w Google Maps:</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-2">Relevance (Trafność)</h5>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Słowa kluczowe w opiniach</li>
                        <li>• Kategorie biznesowe</li>
                        <li>• Kompletność profilu</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-2">Distance (Odległość)</h5>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Lokalizacja wyszukującego</li>
                        <li>• Adres firmy</li>
                        <li>• Obszar obsługi</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h5 className="font-semibold text-blue-900 mb-2">Prominence (Popularność)</h5>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• <strong>Liczba opinii</strong></li>
                        <li>• <strong>Średnia ocena</strong></li>
                        <li>• <strong>Częstotliwość opinii</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h4 className="font-semibold text-yellow-800 mb-3">💡 Wskazówki SEO dla Google Maps:</h4>
                  <ul className="space-y-2 text-yellow-700">
                    <li>• <strong>Regularne opinie:</strong> Minimum 1-2 nowe opinie miesięcznie</li>
                    <li>• <strong>Różnorodność:</strong> Opinie od różnych typów klientów</li>
                    <li>• <strong>Słowa kluczowe:</strong> Zachęcaj do używania nazw usług w opiniach</li>
                    <li>• <strong>Odpowiedzi:</strong> Odpowiadaj na wszystkie opinie (pozytywne i negatywne)</li>
                    <li>• <strong>Zdjęcia:</strong> Zachęcaj klientów do dodawania zdjęć</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Długofalowa strategia budowania reputacji
          </h2>

          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Jak zachęcać klientów do wystawiania prawdziwych, pozytywnych opinii</h3>
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-semibold text-green-800 mb-4">✅ Skuteczne metody pozyskiwania opinii:</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-green-800 mb-2">W trakcie obsługi:</h5>
                      <ul className="space-y-1 text-green-700 text-sm">
                        <li>• Informuj o znaczeniu opinii dla firmy</li>
                        <li>• Pokazuj, jak znaleźć firmę w Google</li>
                        <li>• Wyjaśnij, że opinia pomaga innym</li>
                        <li>• Proś o konkretne szczegóły w opinii</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-green-800 mb-2">Po zakończeniu usługi:</h5>
                      <ul className="space-y-1 text-green-700 text-sm">
                        <li>• Email z linkiem do opinii (24-48h później)</li>
                        <li>• SMS z prośbą o opinię</li>
                        <li>• QR kod na fakturze/paragonie</li>
                        <li>• Follow-up po tygodniu</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">📝 Przykłady skutecznych próśb o opinię:</h4>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h5 className="font-semibold text-blue-800 mb-1">Gabinet lekarski:</h5>
                      <p className="text-gray-700 text-sm italic">
                        &ldquo;Jeśli wizyta przebiegła pomyślnie, będziemy wdzięczni za opinię w Google. 
                        Pomaga nam to w dalszym rozwoju i ułatwia innym pacjentom znalezienie naszego gabinetu.&rdquo;
                      </p>
                    </div>
                    <div className="border-l-4 border-green-400 pl-4">
                      <h5 className="font-semibold text-green-800 mb-1">Restauracja:</h5>
                      <p className="text-gray-700 text-sm italic">
                        &ldquo;Czy smakowało Państwu jedzenie? Jeśli tak, podzielcie się wrażeniami z innymi - 
                        znajdziecie nas w Google Maps. Wasze opinie pomagają nam się rozwijać!&rdquo;
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-400 pl-4">
                      <h5 className="font-semibold text-purple-800 mb-1">Warsztat samochodowy:</h5>
                      <p className="text-gray-700 text-sm italic">
                        &ldquo;Zadowolony z naprawy? Podziel się opinią z innymi kierowcami - 
                        znajdziesz nas w Google. Twoja opinia pomoże nam lepiej służyć następnym klientom.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Czego unikać (kupowanie opinii, sztuczne oceny)</h3>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-semibold text-red-800 mb-4">🚫 Niedozwolone praktyki:</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-red-800 mb-2">Bezwzględnie unikaj:</h5>
                    <ul className="space-y-1 text-red-700 text-sm">
                      <li>• Kupowania opinii od firm zewnętrznych</li>
                      <li>• Tworzenia fałszywych kont</li>
                      <li>• Płacenia za pozytywne recenzje</li>
                      <li>• Wymuszania opinii (rabaty za 5⭐)</li>
                      <li>• Pisania opinii dla siebie</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-red-800 mb-2">Konsekwencje:</h5>
                    <ul className="space-y-1 text-red-700 text-sm">
                      <li>• Usunięcie profilu przez Google</li>
                      <li>• Kary w pozycjonowaniu</li>
                      <li>• Utrata zaufania klientów</li>
                      <li>• Możliwe kary prawne</li>
                      <li>• Długotrwała szkoda dla marki</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-semibold text-yellow-800 mb-3">⚠️ Rozpoznawanie sztucznych opinii przez Google:</h4>
                <ul className="space-y-2 text-yellow-700">
                  <li>• <strong>Analiza IP:</strong> Opinie z tych samych adresów IP</li>
                  <li>• <strong>Wzorce czasowe:</strong> Masowe publikowanie w krótkim czasie</li>
                  <li>• <strong>Analiza tekstu:</strong> Podobne frazy i struktury</li>
                  <li>• <strong>Historia kont:</strong> Nowe konta bez aktywności</li>
                  <li>• <strong>Geolokalizacja:</strong> Opinie spoza obszaru działania firmy</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Rekomendowane praktyki komunikacji z klientami</h3>
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-4">🎯 System zarządzania opiniami:</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-blue-300">
                      <h5 className="font-semibold text-blue-800 mb-2">Monitoring</h5>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Codzienne sprawdzanie</li>
                        <li>• Powiadomienia o nowych opiniach</li>
                        <li>• Śledzenie trendów</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-300">
                      <h5 className="font-semibold text-blue-800 mb-2">Odpowiedzi</h5>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Maksymalnie 24h na odpowiedź</li>
                        <li>• Profesjonalny ton</li>
                        <li>• Personalizowane wiadomości</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-300">
                      <h5 className="font-semibold text-blue-800 mb-2">Analiza</h5>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Miesięczne raporty</li>
                        <li>• Identyfikacja problemów</li>
                        <li>• Planowanie ulepszeń</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">📋 Szablon odpowiedzi na różne typy opinii:</h4>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-400 pl-4">
                      <h5 className="font-semibold text-green-800 mb-1">Pozytywna opinia:</h5>
                      <p className="text-gray-700 text-sm">
                        &ldquo;Dziękujemy za miłe słowa! Cieszymy się, że [konkretny element usługi] spełnił Państwa oczekiwania. 
                        Do zobaczenia ponownie!&rdquo;
                      </p>
                    </div>
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="font-semibold text-yellow-800 mb-1">Neutralna/krytyczna:</h5>
                      <p className="text-gray-700 text-sm">
                        &ldquo;Dziękujemy za szczerą opinię. Uwagi dotyczące [konkretny problem] są dla nas cenne. 
                        Prosimy o kontakt - chcielibyśmy przedyskutować jak możemy się poprawić.&rdquo;
                      </p>
                    </div>
                    <div className="border-l-4 border-red-400 pl-4">
                      <h5 className="font-semibold text-red-800 mb-1">Bardzo negatywna:</h5>
                      <p className="text-gray-700 text-sm">
                        &ldquo;Przykro nam z powodu [konkretny problem]. Każdy przypadek traktujemy indywidualnie. 
                        Prosimy o bezpośredni kontakt, abyśmy mogli omówić sytuację i znaleźć rozwiązanie.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 pt-6">
            Wsparcie w rozwiązaniu problemów z profilem firmowym
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Oferujemy pomoc prawną i doradztwo w zakresie zgłaszania treści lub danych w serwisach mapowych 
            i katalogach firmowych. Działamy zgodnie z przepisami prawa oraz regulaminami platform, 
            reprezentując klienta w procesie wnioskowania o usunięcie lub korektę informacji.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">Obszary naszego wsparcia:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Mapy internetowe i katalogi firm
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Serwisy opinii i recenzji
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Profile firmowe w platformach społecznościowych
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Przywracanie reputacji profilu firmowego
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Analizujemy treści i oceniamy, które naruszają przepisy lub regulaminy. Przygotowujemy formalne 
            zgłoszenia o ich usunięcie oraz doradzamy w strategii odbudowy reputacji w serwisach opinii, 
            zgodnie z zasadami platform.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Analiza prawna</h3>
              <p className="text-gray-700">Oceniamy, które treści naruszają regulaminy platform lub przepisy prawa, tworząc solidne podstawy do działania.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Strategia odbudowy</h3>
              <p className="text-gray-700">Doradzamy w zakresie długoterminowej strategii budowania pozytywnej reputacji online zgodnie z etyką biznesu.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Dlaczego my?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Łączymy doświadczenie prawne i techniczne, co pozwala skutecznie analizować sprawy wizerunkowe. 
            Mamy doświadczenie w ponad 2000 przypadkach. Zapewniamy pełną poufność i zgodność z obowiązującymi regulacjami.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Nasze zalety:</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Doświadczenie prawne i techniczne</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Doświadczenie w ponad 2000 przypadkach</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Pełna poufność działań</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Zgodność z obowiązującymi regulacjami</span>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Wybierz platformę, z którą potrzebujesz pomocy
          </h2>

          <div className="mb-8">
            <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              {!selectedPlatform ? (
                // Wybór platformy
                <div className="grid md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => handlePlatformSelect('google')}
                    className="w-full text-white px-6 py-4 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center"
                    style={{backgroundColor: '#081D44'}}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google Maps / Google Moja Firma
                  </button>
                  <button 
                    onClick={() => handlePlatformSelect('other')}
                    className="w-full text-white px-6 py-4 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center"
                    style={{backgroundColor: '#081D44'}}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
                    </svg>
                    GoWork, ALEO, Panorama Firm
                  </button>
                </div>
              ) : (
                // Opcje dla wybranej platformy
                <div className="space-y-4">
                  <div className="flex items-center mb-6">
                    <button 
                      onClick={handleBackToSelection}
                      className="flex items-center text-gray-600 hover:text-gray-800 transition mr-4"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Powrót
                    </button>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedPlatform === 'google' ? 'Google Maps / Google Moja Firma' : 'GoWork, ALEO, Panorama Firm'}
                    </h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link href={selectedPlatform === 'google' ? '/formularz-profil-google' : '/formularz-profil'}>
                      <button className="w-full text-white px-6 py-4 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center" style={{backgroundColor: '#081D44'}}>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Usuń profil firmy
                      </button>
                    </Link>
                    <Link href={selectedPlatform === 'google' ? '/formularz-opinie-google' : '/formularz-opinie'}>
                      <button className="w-full text-white px-6 py-4 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center" style={{backgroundColor: '#6C9F5D'}}>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Usuń negatywne opinie
                      </button>
                    </Link>
                  </div>

                  {selectedPlatform === 'google' && (
                    <div className="mt-4">
                      <Link href="formularz-profil-google?reset=true">
                        <button className="w-full text-white px-6 py-4 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center" style={{backgroundColor: '#5BA155'}}>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Resetuj wizytówkę Google
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Kiedy warto skorzystać z pomocy specjalistów
          </h2>

          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Jakie sytuacje wymagają wiedzy prawnej</h3>
              <div className="space-y-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">🚨 Sytuacje wymagające natychmiastowej pomocy prawnej:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Pomówienia i zniesławienia:</h5>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        <li>• Zarzuty o działalność przestępczą</li>
                        <li>• Fałszywe oskarżenia o oszustwa</li>
                        <li>• Nieprawdziwe informacje o jakości usług</li>
                        <li>• Ataki na osobę właściciela firmy</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Naruszenie dóbr osobistych:</h5>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        <li>• Ujawnienie danych osobowych</li>
                        <li>• Obraźliwe komentarze o wyglądzie</li>
                        <li>• Ataki na życie prywatne</li>
                        <li>• Dyskryminujące wypowiedzi</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 border border-gray-300 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">⚖️ Przypadki wymagające analizy prawnej:</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-gray-700 mr-3">•</span>
                      <div>
                        <strong className="text-gray-900">Systematyczne ataki konkurencji:</strong>
                        <span className="text-gray-700"> Regularne publikowanie negatywnych opinii przez te same osoby lub wzorce wskazujące na koordynowane działania.</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-700 mr-3">•</span>
                      <div>
                        <strong className="text-gray-900">Roszczenia odszkodowawcze:</strong>
                        <span className="text-gray-700"> Gdy fałszywe opinie spowodowały mierzalne straty finansowe (spadek sprzedaży, utrata klientów).</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-700 mr-3">•</span>
                      <div>
                        <strong className="text-gray-900">Złożone sprawy branżowe:</strong>
                        <span className="text-gray-700"> Medycyna, prawo, finanse - gdzie opinie mogą wpływać na bezpieczeństwo pacjentów/klientów.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Jakie są ograniczenia samodzielnego działania</h3>
              <div className="space-y-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">📋 Co możesz zrobić samodzielnie:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" style={{color: '#6C9F5D'}}>
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                          Zgłosić opinię przez formularz Google
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" style={{color: '#6C9F5D'}}>
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                          Odpowiedzieć profesjonalnie na opinie
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" style={{color: '#6C9F5D'}}>
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                          Dokumentować naruszenia (screenshoty)
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" style={{color: '#6C9F5D'}}>
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                          Zgłaszać oczywiste naruszenia regulaminów
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" style={{color: '#6C9F5D'}}>
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                          Budować strategię pozyskiwania opinii
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" style={{color: '#6C9F5D'}}>
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                          Poprawiać jakość obsługi klientów
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" style={{color: '#6C9F5D'}}>
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                          Monitorować reputację online
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 border border-gray-300 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">🚫 Czego NIE powinieneś robić samodzielnie:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm4.707-10.293a1 1 0 00-1.414-1.414L11 8.586 9.707 7.293a1 1 0 00-1.414 1.414L10.586 11l-2.293 2.293a1 1 0 101.414 1.414L11 13.414l2.293 2.293a1 1 0 001.414-1.414L12.414 11l2.293-2.293z" clipRule="evenodd"></path>
                          </svg>
                          Pisać agresywnych odpowiedzi
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm4.707-10.293a1 1 0 00-1.414-1.414L11 8.586 9.707 7.293a1 1 0 00-1.414 1.414L10.586 11l-2.293 2.293a1 1 0 101.414 1.414L11 13.414l2.293 2.293a1 1 0 001.414-1.414L12.414 11l2.293-2.293z" clipRule="evenodd"></path>
                          </svg>
                          Ujawniać dane osobowe klientów
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm4.707-10.293a1 1 0 00-1.414-1.414L11 8.586 9.707 7.293a1 1 0 00-1.414 1.414L10.586 11l-2.293 2.293a1 1 0 101.414 1.414L11 13.414l2.293 2.293a1 1 0 001.414-1.414L12.414 11l2.293-2.293z" clipRule="evenodd"></path>
                          </svg>
                          Kupować fałszywe pozytywne opinie
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm4.707-10.293a1 1 0 00-1.414-1.414L11 8.586 9.707 7.293a1 1 0 00-1.414 1.414L10.586 11l-2.293 2.293a1 1 0 101.414 1.414L11 13.414l2.293 2.293a1 1 0 001.414-1.414L12.414 11l2.293-2.293z" clipRule="evenodd"></path>
                          </svg>
                          Prowadzić wojny na opinie
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm4.707-10.293a1 1 0 00-1.414-1.414L11 8.586 9.707 7.293a1 1 0 00-1.414 1.414L10.586 11l-2.293 2.293a1 1 0 101.414 1.414L11 13.414l2.293 2.293a1 1 0 001.414-1.414L12.414 11l2.293-2.293z" clipRule="evenodd"></path>
                          </svg>
                          Ignorować prawdziwe problemy
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm4.707-10.293a1 1 0 00-1.414-1.414L11 8.586 9.707 7.293a1 1 0 00-1.414 1.414L10.586 11l-2.293 2.293a1 1 0 101.414 1.414L11 13.414l2.293 2.293a1 1 0 001.414-1.414L12.414 11l2.293-2.293z" clipRule="evenodd"></path>
                          </svg>
                          Próbować oszukać algorytmy
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Case study: przykłady spraw rozwiązanych prawnie</h3>
              <div className="space-y-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">📖 Przykład 1: Klinika medycyny estetycznej</h4>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Problem:</strong> Były pracownik opublikował serie opinii z fałszywymi zarzutami o powikłaniach po zabiegach, które nigdy nie miały miejsca.</p>
                    <p><strong>Działanie prawne:</strong> Złożyliśmy pozew o zniesławienie z żądaniem odszkodowania. Przedstawiliśmy dokumentację medyczną i zeznania pacjentów.</p>
                    <p><strong>Rezultat:</strong> Sąd przyznał 25 000 zł odszkodowania, wszystkie fałszywe opinie zostały usunięte, a sprawca zobowiązał się do zaprzestania działań.</p>
                  </div>
                </div>

                <div className="bg-gray-100 border border-gray-300 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">📖 Przykład 2: Warsztat samochodowy</h4>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Problem:</strong> Konkurencyjna firma systematycznie publikowała opinie o rzekomych uszkodzeniach samochodów i oszustwach finansowych.</p>
                    <p><strong>Działanie prawne:</strong> Analiza cyfrowa wykazała koordynację działań. Złożyliśmy zawiadomienie o czynie niedozwolonej konkurencji.</p>
                    <p><strong>Rezultat:</strong> Prokuratura wszczęła postępowanie, opinie zostały usunięte, a konkurencja zapłaciła 40 000 zł odszkodowania.</p>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">📖 Przykład 3: Gabinet dentystyczny</h4>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Problem:</strong> Pacjent opublikował opinię z danymi osobowymi innych pacjentów i fałszywymi informacjami o brudnych narzędziach.</p>
                    <p><strong>Działanie prawne:</strong> Sprawa została rozpatrywana w trybie naglącym ze względu na naruszenie danych medycznych (RODO).</p>
                    <p><strong>Rezultat:</strong> Opinia usunięta w 48 godzin, 15 000 zł zadośćuczynienia za naruszenie dóbr osobistych i danych osobowych.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            FAQ edukacyjne
          </h2>

          <div className="space-y-6 mb-12">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Czy Google usuwa każdą negatywną opinię?</h3>
              <div className="space-y-4 text-gray-700">
                <p><strong>Odpowiedź:</strong> Nie. Google usuwa tylko opinie, które naruszają ich wytyczne. Uczciwa krytyka jest dozwolona i ważna dla konsumentów.</p>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🔍 Google usuwa opinie, które:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Zawierają wulgarne lub obraźliwe słownictwo</li>
                    <li>• Są napisane przez boty lub fałszywe konta</li>
                    <li>• Zawierają dane osobowe (telefony, adresy)</li>
                    <li>• Nie dotyczą faktycznych doświadczeń z firmą</li>
                    <li>• Są publikowane przez konkurencję</li>
                    <li>• Zawierają groźby lub treści nielegalne</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">✅ Google NIE usuwa opinii, które:</h4>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>• Opisują rzeczywiste doświadczenia (nawet negatywne)</li>
                    <li>• Krytykują usługi w sposób konstruktywny</li>
                    <li>• Są napisane przez prawdziwych klientów</li>
                    <li>• Zawierają uzasadnione skargi</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Ile trwa proces zgłoszenia opinii?</h3>
              <div className="space-y-4 text-gray-700">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-800">2-7 dni</div>
                    <div className="text-green-700 text-sm">Oczywiste naruszenia regulaminu</div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-800">1-4 tygodnie</div>
                    <div className="text-yellow-700 text-sm">Złożone przypadki wymagające analizy</div>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-800">2-6 miesięcy</div>
                    <div className="text-red-700 text-sm">Sprawy sądowe i postępowania prawne</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">⏱️ Czynniki wpływające na czas:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• <strong>Typ platformy:</strong> Google zwykle szybszy niż inne serwisy</li>
                    <li>• <strong>Jakość dokumentacji:</strong> Kompletne zgłoszenia są szybciej rozpatrywane</li>
                    <li>• <strong>Jednoznaczność naruszenia:</strong> Oczywiste przypadki vs. sporne sytuacje</li>
                    <li>• <strong>Obciążenie zespołów moderacji:</strong> Szczególnie w okresach świątecznych</li>
                    <li>• <strong>Język treści:</strong> Opinie w języku polskim mogą czekać dłużej na moderację</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Co zrobić, gdy konkurencja wystawia fałszywe recenzje?</h3>
              <div className="space-y-4 text-gray-700">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">🕵️ Jak rozpoznać atak konkurencji:</h4>
                  <ul className="space-y-2 text-red-700 text-sm">
                    <li>• <strong>Czasowe skupiska:</strong> Wiele negatywnych opinii w krótkim czasie</li>
                    <li>• <strong>Podobny język:</strong> Powtarzające się zwroty, błędy ortograficzne</li>
                    <li>• <strong>Nowe konta:</strong> Autorzy mają mało opinii w historii</li>
                    <li>• <strong>Brak szczegółów:</strong> Ogólnikowe zarzuty bez konkretów</li>
                    <li>• <strong>Lokalizacja:</strong> Opinie z lokalizacji konkurencji</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">🛡️ Plan działania krok po kroku:</h4>
                  <ol className="space-y-2 text-blue-700 text-sm">
                    <li><strong>1. Dokumentacja:</strong> Rób screenshoty wszystkich podejrzanych opinii</li>
                    <li><strong>2. Analiza wzorców:</strong> Szukaj podobieństw między kontami</li>
                    <li><strong>3. Zgłoszenie grupowe:</strong> Zgłoś wszystkie podejrzane opinie jednocześnie</li>
                    <li><strong>4. Monitoring konkurencji:</strong> Sprawdź, czy mają wzrost pozytywnych opinii</li>
                    <li><strong>5. Zbieranie dowodów:</strong> IP, czasy publikacji, wzorce językowe</li>
                    <li><strong>6. Pomoc prawna:</strong> W poważnych przypadkach skontaktuj się z prawnikiem</li>
                  </ol>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">💡 Długofalowa ochrona:</h4>
                  <ul className="space-y-1 text-green-700 text-sm">
                    <li>• Regularne monitorowanie wszystkich platform</li>
                    <li>• Budowanie silnej bazy prawdziwych pozytywnych opinii</li>
                    <li>• Szybkie profesjonalne odpowiedzi na wszystkie recenzje</li>
                    <li>• Dokumentowanie działań konkurencji</li>
                    <li>• Współpraca z platformami w ramach programów dla biznesu</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Czy opinie znikają same po jakimś czasie?</h3>
              <div className="space-y-4 text-gray-700">
                <p><strong>Odpowiedź:</strong> Nie, opinie w Google nie znikają automatycznie po określonym czasie. Mogą być usunięte tylko przez platformę, autora lub właściciela konta.</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">❌ Opinie NIE znikają gdy:</h4>
                    <ul className="space-y-1 text-red-700 text-sm">
                      <li>• Mija rok, dwa lata czy więcej</li>
                      <li>• Firma zmienia nazwę</li>
                      <li>• Zmienia się właściciel biznesu</li>
                      <li>• Firma przenosi się w inne miejsce</li>
                      <li>• Konto autora staje się nieaktywne</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">✅ Opinie znikają gdy:</h4>
                    <ul className="space-y-1 text-green-700 text-sm">
                      <li>• Autor sam je usuwa</li>
                      <li>• Google wykryje naruszenie zasad</li>
                      <li>• Konto autora zostanie zablokowane</li>
                      <li>• Firma całkowicie zamknie wizytówkę</li>
                      <li>• W wyniku postępowania prawnego</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Ważne informacje:</h4>
                  <ul className="space-y-2 text-yellow-700 text-sm">
                    <li>• <strong>Długa pamięć internetu:</strong> Opinie mogą być archiwizowane w innych serwisach</li>
                    <li>• <strong>Wpływ na SEO:</strong> Stare negatywne opinie wciąż wpływają na pozycjonowanie</li>
                    <li>• <strong>Percepcja klientów:</strong> Ludzie czytają wszystkie opinie, nie tylko najnowsze</li>
                    <li>• <strong>Backup i kopie:</strong> Niektóre narzędzia robią kopie opinii do analizy konkurencji</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💭 Strategia zarządzania starymi opiniami:</h4>
                  <ul className="space-y-1 text-blue-700 text-sm">
                    <li>• <strong>&quot;Rozcieńczaj&quot; złe opinie:</strong> Regularnie zdobywaj nowe pozytywne</li>
                    <li>• <strong>Odpowiadaj na stare opinie:</strong> Pokaż, że się zmieniliście</li>
                    <li>• <strong>Aktualizuj informacje:</strong> Nowe zdjęcia, godziny, kontakt</li>
                    <li>• <strong>Buduj silną reputację:</strong> Im więcej dobr ych opinii, tym mniejszy wpływ złych</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sekcja z przykładami branżowymi */}
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Przykłady naszych sukcesów
          </h2>

          <div className="space-y-8 mb-8">
            {/* Przypadek Dentysty */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4" style={{backgroundColor: '#6C9F5D'}}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Gabinet Dentystyczny</h3>
                    <p className="text-gray-600 font-medium">Przychodnia w Warszawie</p>
                  </div>
                </div>
                <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                  Ochrona zdrowia
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="border-l-2 border-gray-300 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Wyzwanie</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Nieusatysfakcjonowany pacjent pozostawił opinię z nieprawdziwymi zarzutami 
                    o nieprofesjonalnym zachowaniu i nieudanym leczeniu wykonanym w innej placówce.
                  </p>
                </div>
                
                <div className="border-l-2 border-gray-300 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Akcja</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Wykazaliśmy fałszywość zarzutów poprzez dokumentację medyczną i udowodniliśmy 
                    naruszenie regulaminu platformy dotyczące nieprawdziwych informacji.
                  </p>
                </div>
                
                <div className="border-l-2 border-gray-300 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Rezultat</h4>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">⭐</span>
                      <span className="font-semibold text-gray-900">3.2 → 4.6 gwiazdek</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">📈</span>
                      <span className="font-semibold text-gray-900">+40% nowych pacjentów</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">�️</span>
                      <span className="font-semibold text-gray-900">Pełna odbudowa zaufania</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Przypadek Restauracji */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4" style={{backgroundColor: '#6C9F5D'}}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Restauracja Włoska</h3>
                    <p className="text-gray-600 font-medium">Lokalna gastronomia w Krakowie</p>
                  </div>
                </div>
                <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                  Gastronomia
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="border-l-2 border-gray-300 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Wyzwanie</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Konkurencyjna restauracja systematycznie publikowała fałszywe opinie 
                    o problemach sanitarnych, używając wulgaryzmów i obraźliwych komentarzy.
                  </p>
                </div>
                
                <div className="border-l-2 border-gray-300 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Akcja</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Przeprowadziliśmy analizę cyfrową wzorców publikacji, wykryliśmy fałszywe konta 
                    i udowodniliśmy manipulację systemami ocen przez konkurencję.
                  </p>
                </div>
                
                <div className="border-l-2 border-gray-300 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Rezultat</h4>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">⭐</span>
                      <span className="font-semibold text-gray-900">Przywrócenie oceny 4.3</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">📈</span>
                      <span className="font-semibold text-gray-900">+60% rezerwacji online</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🛡️</span>
                      <span className="font-semibold text-gray-900">Ochrona przed atakami</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Specjalizujemy się w branżach:</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Ochrona zdrowia (dentyści, lekarze)</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Gastronomia (restauracje, kawiarnie)</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Usługi kosmetyczne</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Hotele i noclegi</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Warsztaty samochodowe</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Sklepy i handel</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Usługi budowlane</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Usługi prawne</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">I wiele innych...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sekcja z linkami do powiązanych usług */}
          <div className="w-full max-w-4xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Sprawdź nasze inne usługi prawne
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/jak-usunac-firme-z-google-maps" className="text-gray-700 hover:text-gray-900 underline font-medium">
                  Wsparcie w rozwiązaniu problemów z profilem firmowym w Google Maps
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-opinie-z-aleo" className="text-gray-700 hover:text-gray-900 underline font-medium">
                  Pomoc prawna w sprawach opinii w serwisie Aleo
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-opinie-z-gowork" className="text-gray-700 hover:text-gray-900 underline font-medium">
                  Doradztwo w zakresie treści na platformie GoWork
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-opinie-z-panoramy-firm" className="text-gray-700 hover:text-gray-900 underline font-medium">
                  Reprezentacja w sprawach z katalogiem Panorama Firm
                </Link>
              </li>
            </ul>
          </div>

          {/* Zastrzeżenia prawne */}
          <div className="w-full max-w-4xl mx-auto mt-8 p-4 bg-gray-100 rounded-lg border border-gray-300">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Zastrzeżenia prawne:</h4>
            <p className="text-xs text-gray-600 leading-relaxed mb-2">
              * Statystyki i dane prezentowane na stronie mają charakter szacunkowy i mogą różnić się w zależności od branży, lokalizacji i innych czynników. 
              Nie stanowią gwarancji określonych rezultatów.
            </p>
            <p className="text-xs text-gray-600 leading-relaxed mb-2">
              Wszystkie nasze działania są prowadzone zgodnie z obowiązującym prawem polskim, regulaminami platform internetowych oraz zasadami etyki zawodowej. 
              Nie gwarantujemy skuteczności działań w każdym przypadku, gdyż zależy to od indywidualnych okoliczności sprawy.
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Oferujemy doradztwo prawne i reprezentację w granicach obowiązującego prawa. Każdy przypadek wymaga indywidualnej analizy prawnej.
            </p>
          </div>

        </div>
      </article>

      {/* Business Type Selector CTA */}
      <div className="w-full max-w-4xl px-4 py-8 mb-6">
        <BusinessTypeSelectorCTA />
      </div>

    

    </div>
  );
}
