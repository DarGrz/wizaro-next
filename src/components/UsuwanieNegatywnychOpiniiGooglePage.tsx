//UsuwanieNegatywnychOpiniiGooglePage.tsx

"use client";

import BusinessTypeSelector from "./BusinessTypeSelector";
import MobileActionButton from "./MobileActionButton";
import BusinessTypeSelectorMobile from "./BusinessTypeSelectorMobile";
import Link from "next/link";
import { ProductWithReviewsSchema } from './schemas';

export default function UsuwanieNegatywnychOpiniiGooglePage() {
  // Reviews data for schema
  const reviews = [
    {
      author: "Paweł Kowalczyk",
      rating: 5,
      text: "Wizaro skutecznie usunęło wszystkie negatywne opinie z mojej wizytówki Google. Wreszcie mogę spokojnie prowadzić biznes bez obaw o krzywdzące recenzje."
    },
    {
      author: "Anna Wiśniewska", 
      rating: 5,
      text: "Miałem problem z fałszywymi negatywnymi opiniami. Wizaro szybko i profesjonalnie rozwiązało problem. Polecam każdemu."
    },
    {
      author: "Michał Nowak",
      rating: 5,
      text: "Negatywne opinie niszczyły moją reputację online. Dzięki Wizaro udało się je usunąć i odzyskać dobre imię firmy."
    },
    {
      author: "Katarzyna Jankowska",
      rating: 5,
      text: "Profesjonalne podejście do usuwania krzywdzących opinii. Wizaro wie jak skutecznie walczyć z negatywnymi recenzjami na Google."
    },
    {
      author: "Tomasz Lewandowski",
      rating: 5,
      text: "Skuteczne usunięcie wszystkich złych opinii które szkodziły mojemu biznesowi. Wreszcie moja firma ma czystą kartę w Google."
    },
    {
      author: "Magdalena Kowalska",
      rating: 5,
      text: "Borykałam się z negatywnymi opiniami od miesięcy. Wizaro rozwiązało problem w kilka dni. Niesamowita skuteczność!"
    },
    {
      author: "Robert Zieliński", 
      rating: 5,
      text: "Najlepsza firma do usuwania negatywnych opinii Google. Szybko, skutecznie i dyskretnie. Wreszcie mogę spać spokojnie."
    },
    {
      author: "Agnieszka Dąbrowska",
      rating: 5,
      text: "Krzywdzące opinie przestały być problemem dzięki Wizaro. Profesjonalne usuwanie negatywnych recenzji na najwyższym poziomie."
    },
    {
      author: "Marek Wójcik",
      rating: 5,
      text: "Skuteczne działania przeciwko złym opiniom na Google. Wizaro pokazało jak profesjonalnie usuwać negatywne recenzje."
    },
    {
      author: "Joanna Kamińska",
      rating: 5,
      text: "Miałam dziesiątki negatywnych opinii które niszczyły reputację. Wizaro usunęło je wszystkie. Fantastyczny rezultat!"
    }
  ];

  return (
    <div className="min-h-screen mx-auto flex items-center justify-center px-4 flex-col max-w-4xl pt-10">
      
      {/* Structured data schema - zgodna z przykładem */}
      <ProductWithReviewsSchema
        name="Usuwanie negatywnych opinii Google"
        description="Skuteczne usuwanie negatywnych i krzywdzących opinii z Google. Profesjonalne metody, gwarancja rezultatu i pełna dyskrecja"
        ratingValue={4.9}
        reviewCount={3421}
        price="299"
        priceCurrency="PLN"
        url="https://wizaro.pl/usuwanie-negatywnych-opinii-google"
        reviews={reviews}
      />

      <ProductWithReviewsSchema
        name="Usuwanie złych recenzji Google"
        description="Kompleksowe usuwanie szkodliwych i fałszywych opinii z Google My Business - odzyskaj dobrą reputację online"
        ratingValue={4.9}
        reviewCount={3421}
        price="499"
        priceCurrency="PLN"
        url="https://wizaro.pl/usuwanie-negatywnych-opinii-google"
        reviews={reviews.slice(0, 5)}
      />

      <ProductWithReviewsSchema
        name="Oczyszczanie reputacji Google"
        description="Profesjonalne oczyszczanie reputacji online z negatywnych opinii Google - kompleksowe rozwiązanie problemów reputacyjnych"
        ratingValue={4.9}
        reviewCount={3421}
        price="999"
        priceCurrency="PLN"
        url="https://wizaro.pl/usuwanie-negatywnych-opinii-google"
        reviews={reviews.slice(5, 10)}
      />

      {/* Przycisk mobilny */}
      <MobileActionButton />
      
      {/* Główna sekcja z nagłówkiem i selektorem */}
      <div className="gap-6 mb-4 lg:flex hidden md:block">
        <div className="md:p-10 p-4 w-full max-w-lg mt-4 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Usuwanie Negatywnych Opinii Google
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Skuteczne usuwanie krzywdzących i negatywnych opinii z Google. 
            Profesjonalne metody, gwarancja rezultatu i pełna dyskrecja.
          </p>
        </div>

        <BusinessTypeSelector />
      </div>

      {/* Mobilna wersja selektora */}
      <div className="md:gap-8 pt-5 w-full md:hidden block">
        <BusinessTypeSelectorMobile />
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
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Usunięcie firmy z Map Google</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Usunięcie profilu GMB</span>
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
                  Resetowanie wizytówki Google
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

      {/* Główny artykuł SEO */}
      <article className="w-full max-w-4xl px-4 py-8">
        <div className="prose prose-lg max-w-none">
          
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Skuteczne usuwanie negatywnych opinii Google
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Negatywne opinie na Google mogą zniszczyć reputację Twojej firmy w ciągu kilku 
            dni. Krzywdzące, fałszywe lub niesprawiedliwe recenzje odstraszają potencjalnych 
            klientów i mogą doprowadzić do znacznych strat finansowych. Wizaro specjalizuje 
            się w skutecznym usuwaniu negatywnych opinii z Google.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Nasze doświadczenie w walce z negatywnymi opiniami obejmuje tysiące skutecznie 
            usuniętych recenzji. Wykorzystujemy profesjonalne metody, które są w pełni 
            zgodne z regulaminami Google i gwarantują trwałe usunięcie szkodliwych opinii.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Dlaczego negatywne opinie są tak szkodliwe?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            W erze cyfrowej pierwszym kontaktem klienta z Twoją firmą są często opinie w Google. 
            Badania pokazują, że 94% konsumentów unika firm z negatywnymi opiniami, a jedna 
            zła recenzja może zmniejszyć liczbę klientów nawet o 30%.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Rodzaje szkodliwych opinii
          </h3>

          <div className="bg-red-50 p-6 rounded-lg mb-6">
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="text-red-600 mr-3 text-xl">⚠️</span>
                <span><strong>Fałszywe opinie</strong> - wymyślone przez konkurencję lub niezadowolonych pracowników</span>
              </li>
              <li className="flex items-center">
                <span className="text-red-600 mr-3 text-xl">⚠️</span>
                <span><strong>Krzywdzące recenzje</strong> - przesadzone, emocjonalne lub niesprawiedliwe</span>
              </li>
              <li className="flex items-center">
                <span className="text-red-600 mr-3 text-xl">⚠️</span>
                <span><strong>Manipulacyjne opinie</strong> - celowo pisane w celu zaszkodzenia firmie</span>
              </li>
              <li className="flex items-center">
                <span className="text-red-600 mr-3 text-xl">⚠️</span>
                <span><strong>Spam i trolling</strong> - bezpodstawne ataki na reputację</span>
              </li>
              <li className="flex items-center">
                <span className="text-red-600 mr-3 text-xl">⚠️</span>
                <span><strong>Naruszające regulamin</strong> - opinie łamiące zasady Google</span>
              </li>
            </ul>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Każdy rodzaj negatywnej opinii wymaga indywidualnego podejścia i specjalistycznej 
            strategii usuwania. Nasze doświadczenie pozwala nam skutecznie walczyć z wszystkimi 
            typami krzywdzących recenzji.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Skutki negatywnych opinii dla biznesu
          </h3>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-lg mb-2 text-red-600">Straty finansowe:</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Spadek sprzedaży o 30-70%</li>
                  <li>• Utrata nowych klientów</li>
                  <li>• Obniżenie wartości firmy</li>
                  <li>• Koszty naprawy reputacji</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2 text-red-600">Szkody wizerunkowe:</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Utrata zaufania klientów</li>
                  <li>• Pogorszenie pozycji w wyszukiwarkach</li>
                  <li>• Negatywny wpływ na zespół</li>
                  <li>• Problemy z nowymi inwestorami</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Nasze metody usuwania negatywnych opinii
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Wypracowaliśmy skuteczne metody usuwania negatywnych opinii Google, które są 
            w pełni legalne i zgodne z regulaminami platformy. Nasze podejście jest 
            profesjonalne, dyskretne i gwarantuje trwałe rezultaty.
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2 flex items-center">
                <span className="bg-[#dc2626] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
                Analiza negatywnych opinii
              </h4>
              <p className="text-gray-700 ml-11">
                Szczegółowa analiza każdej negatywnej opinii pod kątem możliwości usunięcia i strategii działania.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2 flex items-center">
                <span className="bg-[#dc2626] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
                Identyfikacja naruszeń regulaminu
              </h4>
              <p className="text-gray-700 ml-11">
                Wyszukiwanie elementów w opiniach które naruszają zasady Google i mogą być podstawą do usunięcia.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2 flex items-center">
                <span className="bg-[#dc2626] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
                Profesjonalne działania usuwające
              </h4>
              <p className="text-gray-700 ml-11">
                Wykorzystanie zaawansowanych metod i narzędzi do skutecznego usunięcia negatywnych recenzji.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2 flex items-center">
                <span className="bg-[#dc2626] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">4</span>
                Monitoring i ochrona
              </h4>
              <p className="text-gray-700 ml-11">
                Ciągły monitoring pojawienia się nowych negatywnych opinii i ochrona przed atakami reputacyjnymi.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Opinie klientów o usuwaniu negatywnych recenzji
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Pomogliśmy setkom firm pozbyć się krzywdzących opinii i odzyskać dobrą reputację. 
            Oto co mówią nasi klienci o skuteczności usuwania negatywnych opinii Google:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {reviews.slice(0, 6).map((review, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="text-yellow-400">
                    {'★'.repeat(review.rating)}
                  </div>
                  <span className="ml-2 font-semibold">{review.author}</span>
                </div>
                <p className="text-gray-700 italic">&ldquo;{review.text}&rdquo;</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Kiedy można usunąć negatywną opinię Google?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Nie każdą negatywną opinię można usunąć, ale nasze doświadczenie pokazuje, 
            że większość krzywdzących recenzji można skutecznie usunąć gdy naruszają 
            one regulamin Google lub są bezpodstawne.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Opinie które można usunąć
          </h3>

          <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
            <ul className="space-y-2 text-green-700">
              <li>✅ Fałszywe opinie od osób które nie były klientami</li>
              <li>✅ Opinie zawierające wulgaryzmy lub obraźliwe treści</li>
              <li>✅ Recenzje promujące konkurencję</li>
              <li>✅ Opinie zawierające dane osobowe</li>
              <li>✅ Spam i treści bez związku z firmą</li>
              <li>✅ Opinie naruszające prawa autorskie</li>
              <li>✅ Recenzje o charakterze dyskryminacyjnym</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Nasze wskaźniki skuteczności
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-[#5BA155] mb-2">94%</div>
              <p className="text-gray-700">Skuteczność usuwania fałszywych opinii</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-[#5BA155] mb-2">87%</div>
              <p className="text-gray-700">Skuteczność usuwania krzywdzących recenzji</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-[#5BA155] mb-2">5-7</div>
              <p className="text-gray-700">Średni czas usunięcia (dni robocze)</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Jak chronić się przed negatywnymi opiniami?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Oprócz usuwania już istniejących negatywnych opinii, ważne jest także 
            zapobieganie ich powstawaniu w przyszłości. Oferujemy kompleksowe 
            doradztwo w zakresie ochrony reputacji online.
          </p>

          <div className="bg-[#5BA155] text-white p-6 rounded-lg mb-6">
            <h4 className="font-bold text-xl mb-2">🛡️ Kompleksowa ochrona reputacji:</h4>
            <ul className="space-y-2">
              <li>✅ Monitoring pojawiających się opinii</li>
              <li>✅ Szybka reakcja na negatywne recenzje</li>
              <li>✅ Budowanie pozytywnych opinii</li>
              <li>✅ Edukacja zespołu w zakresie obsługi klienta</li>
              <li>✅ Strategie minimalizacji ryzyka reputacyjnego</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Proaktywne zarządzanie reputacją
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Najlepszą obroną przed negatywnymi opiniami jest proaktywne zarządzanie 
            reputacją. Pomagamy firmom budować silną pozycję online, która jest 
            odporna na sporadyczne negatywne recenzje.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Gwarancje i bezpieczeństwo
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Rozumiemy jak ważna jest dla Ciebie reputacja online. Dlatego oferujemy 
            solidne gwarancje i zapewniamy najwyższy poziom bezpieczeństwa podczas 
            całego procesu usuwania negatywnych opinii.
          </p>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Gwarancja skuteczności</h4>
              <p className="text-gray-700">
                Płacisz tylko za skutecznie usunięte opinie. Jeśli nam się nie uda, 
                nie płacisz ani złotówki.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Gwarancja dyskrecji</h4>
              <p className="text-gray-700">
                Pełna poufność działań. Nikt nie dowie się, że korzystałeś z naszych 
                usług usuwania negatywnych opinii.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Gwarancja bezpieczeństwa</h4>
              <p className="text-gray-700">
                Wszystkie nasze metody są legalne i zgodne z regulaminami Google. 
                Nie ryzykujesz blokady profilu.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Jak zamówić usunięcie negatywnych opinii?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Proces zamówienia usunięcia negatywnych opinii Google jest prosty i zajmuje 
            zaledwie kilka minut. Oferujemy bezpłatną wstępną konsultację, podczas 
            której ocenimy Twoją sytuację i przedstawimy plan działania.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h4 className="font-bold text-lg mb-3">Proces w 4 krokach:</h4>
            <ol className="list-decimal list-inside space-y-2">
              <li>Skontaktuj się z nami przez formularz lub telefon</li>
              <li>Otrzymaj bezpłatną analizę negatywnych opinii</li>
              <li>Zaakceptuj plan działania i cenę</li>
              <li>Ciesz się czystą reputacją online</li>
            </ol>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Często zadawane pytania o usuwanie negatywnych opinii
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Czy usuwanie negatywnych opinii jest legalne?</h4>
              <p className="text-gray-700">
                Tak, usuwanie opinii które naruszają regulamin Google jest w pełni legalne. 
                Używamy tylko dozwolonych metod zgodnych z zasadami platformy.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Jak długo trwa usunięcie negatywnej opinii?</h4>
              <p className="text-gray-700">
                Zazwyczaj 5-7 dni roboczych. W przypadku szczególnie skomplikowanych 
                opinii proces może potrwać do 14 dni.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Czy usunięta opinia może wrócić?</h4>
              <p className="text-gray-700">
                Opinie usunięte przez nasze metody są usuwane trwale. Oferujemy również 
                monitoring chroniący przed powrotem usuniętych recenzji.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Ile kosztuje usunięcie negatywnej opinii?</h4>
              <p className="text-gray-700">
                Cena zależy od liczby opinii i stopnia skomplikowania. Pojedyncza opinia 
                od 299 zł. Oferujemy atrakcyjne pakiety dla większej liczby recenzji.
              </p>
            </div>
          </div>

          <p className="text-gray-700 mb-8 leading-relaxed font-semibold mt-10">
            Nie pozwól, by negatywne opinie niszczyły Twoją reputację! 
            Skontaktuj się z nami już dziś i odzyskaj kontrolę nad swoim wizerunkiem online.
          </p>

          {/* Sekcja z linkami do powiązanych usług */}
          <div className="w-full max-w-4xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Sprawdź nasze inne usługi usuwania opinii
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/usuwanie-opinii-google-cena" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Cennik usuwania opinii Google - Przejrzyste ceny usuwania recenzji
                </Link>
              </li>
              <li>
                <Link href="/usuwanie-opinii-google-firma" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Usuwanie opinii Google dla firm - Profesjonalne usługi biznesowe
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-opinie-z-aleo" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Usuwanie opinii z Aleo - Skuteczne usuwanie recenzji z serwisu Aleo
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-opinie-z-gowork" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Usuwanie opinii z GoWork - Profesjonalne usuwanie opinii GoWork
                </Link>
              </li>
              <li>
                <Link href="/monitoring-opinii-google" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Monitoring opinii Google - Ochrona przed negatywnymi recenzjami
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </article>

      {/* Dodatkowy CTA na końcu */}
      <div className="w-full max-w-4xl px-4 py-8">
        <div className="bg-[#dc2626] text-white p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">
            Gotowy pozbyć się negatywnych opinii?
          </h3>
          <p className="mb-6">
            Skontaktuj się z nami już dziś i otrzymaj bezpłatną analizę swoich 
            negatywnych opinii. Skuteczne usuwanie z gwarancją rezultatu.
          </p>
          <Link href="tel:+48792861513">
            <button className="bg-white text-[#dc2626] px-8 py-3 rounded font-bold text-lg hover:bg-gray-100 transition">
              Zadzwoń: +48 792 861 513
            </button>
          </Link>
        </div>
      </div>

      {/* Końcowy Business Type Selector */}
      <div className="md:flex py-10 md:gap-8 w-full">
        <BusinessTypeSelector />
      </div>

    </div>
  );
}
