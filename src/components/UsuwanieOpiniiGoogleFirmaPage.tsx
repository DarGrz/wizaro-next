//UsuwanieOpiniiGoogleFirmaPage.tsx

"use client";

import BusinessTypeSelector from "./BusinessTypeSelector";
import MobileActionButton from "./MobileActionButton";
import BusinessTypeSelectorMobile from "./BusinessTypeSelectorMobile";
import Link from "next/link";
import { ProductWithReviewsSchema } from './schemas';

export default function UsuwanieOpiniiGoogleFirmaPage() {
  // Reviews data for schema
  const reviews = [
    {
      author: "Marcin Kowalski",
      rating: 5,
      text: "Wizaro skutecznie pomogło naszej firmie usunąć krzywdzące opinie z Google. Profesjonalne podejście do biznesu i pełna dyskrecja."
    },
    {
      author: "Anna Nowak", 
      rating: 5,
      text: "Jako właściciel firmy doceniam profesjonalizm Wizaro. Skutecznie usunęli negatywne opinie które szkodziły naszej reputacji."
    },
    {
      author: "Piotr Wiśniewski",
      rating: 5,
      text: "Kompleksowa obsługa dla firm. Wizaro nie tylko usunęło opinie, ale też doradził jak chronić reputację w przyszłości."
    },
    {
      author: "Katarzyna Kowalczyk",
      rating: 5,
      text: "Firma godna zaufania. Diskretnie i skutecznie zajęli się naszym problemem z negatywnymi opiniami na Google."
    },
    {
      author: "Robert Jankowski",
      rating: 5,
      text: "Profesjonalne usługi dla biznesu. Szybko i skutecznie usunęli wszystkie krzywdzące opinie z naszej wizytówki Google."
    },
    {
      author: "Magdalena Zielińska",
      rating: 5,
      text: "Polecam każdej firmie. Wizaro wie jak podejść do problemów biznesowych i skutecznie usuwać negatywne opinie."
    },
    {
      author: "Tomasz Lewandowski", 
      rating: 5,
      text: "Najlepsza firma na rynku usuwania opinii. Profesjonalne podejście do każdego przypadku biznesowego."
    },
    {
      author: "Agnieszka Wójcik",
      rating: 5,
      text: "Wizaro pomogło naszej firmie odzyskać dobrą reputację online. Profesjonalna obsługa i gwarancja rezultatu."
    },
    {
      author: "Marek Kamiński",
      rating: 5,
      text: "Skuteczne usuwanie opinii Google dla firm. Diskretnie i profesjonalnie rozwiązali nasz problem z reputacją."
    },
    {
      author: "Joanna Dąbrowska",
      rating: 5,
      text: "Kompleksowe wsparcie dla biznesu. Wizaro nie tylko usunęło opinie, ale też pomogło w budowaniu pozytywnej reputacji."
    }
  ];

  return (
    <div className="min-h-screen mx-auto flex items-center justify-center px-4 flex-col max-w-4xl pt-10">
      
      {/* Structured data schema - zgodna z przykładem */}
      <ProductWithReviewsSchema
        name="Usuwanie opinii Google dla firm"
        description="Profesjonalne usuwanie negatywnych opinii z Google dla firm i biznesów. Specjalistyczne podejście, dyskrecja i gwarancja rezultatu"
        ratingValue={4.9}
        reviewCount={2156}
        price="299"
        priceCurrency="PLN"
        url="https://wizaro.pl/usuwanie-opinii-google-firma"
        reviews={reviews}
      />

      <ProductWithReviewsSchema
        name="Zarządzanie reputacją firmy online"
        description="Kompleksowe zarządzanie reputacją firm w internecie - usuwanie negatywnych opinii i budowanie pozytywnego wizerunku"
        ratingValue={4.9}
        reviewCount={2156}
        price="1299"
        priceCurrency="PLN"
        url="https://wizaro.pl/usuwanie-opinii-google-firma"
        reviews={reviews.slice(0, 5)}
      />

      <ProductWithReviewsSchema
        name="Profesjonalne usuwanie wizytówki Google dla firm"
        description="Specjalistyczne usuwanie wizytówek Google My Business dla firm - profesjonalne podejście do biznesu"
        ratingValue={4.9}
        reviewCount={2156}
        price="2199"
        priceCurrency="PLN"
        url="https://wizaro.pl/usuwanie-opinii-google-firma"
        reviews={reviews.slice(5, 10)}
      />

      {/* Przycisk mobilny */}
      <MobileActionButton />
      
      {/* Główna sekcja z nagłówkiem i selektorem */}
      <div className="gap-6 mb-4 lg:flex hidden md:block">
        <div className="md:p-10 p-4 w-full max-w-lg mt-4 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Usuwanie opinii Google dla firm
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Profesjonalne usługi usuwania negatywnych opinii Google dla firm. 
            Specjalistyczne podejście do biznesu, dyskrecja i gwarancja rezultatu.
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

      {/* CTA telefoniczne */}
      {/* <div className="flex flex-col items-center gap-2 mt-6 mb-10 shadow-lg rounded-lg p-6">
        <p className="text-center text-gray-700 font-bold">
          Profesjonalne wsparcie dla Twojej firmy
        </p>
        <Link href="tel:+48792861513" className="mx-auto mt-2">
          <button className="bg-[#5BA155] text-white px-6 py-2 rounded font-semibold hover:bg-[#5BA155] transition">
            +48 792 861 513
          </button>
        </Link>
      </div> */}

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
            Profesjonalne usuwanie opinii Google dla firm
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Prowadzisz firmę i borykasz się z negatywnymi opiniami na Google? Wizaro oferuje 
            profesjonalne usługi usuwania krzywdzących opinii specjalnie dostosowane do potrzeb 
            biznesowych. Rozumiemy, jak ważna dla firmy jest pozytywna reputacja online i jak 
            negatywne opinie mogą wpływać na rozwój biznesu.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Nasze doświadczenie w pracy z firmami z różnych branż pozwala nam skutecznie 
            rozwiązywać problemy reputacyjne. Oferujemy nie tylko usuwanie opinii, ale także 
            kompleksowe doradztwo w zakresie zarządzania reputacją online dla biznesu.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Dlaczego firmy wybierają nasze usługi?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            W dzisiejszym świecie cyfrowym reputacja online może zadecydować o sukcesie lub 
            porażce firmy. Negatywne opinie na Google są często pierwszym, co widzą potencjalni 
            klienci szukając informacji o Twojej firmie. Dlatego tak ważne jest profesjonalne 
            podejście do zarządzania reputacją biznesową.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Specjalistyczne podejście do biznesu
          </h3>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="text-[#5BA155] mr-3 text-xl">✓</span>
                <span>Analiza wpływu negatywnych opinii na biznes</span>
              </li>
              <li className="flex items-center">
                <span className="text-[#5BA155] mr-3 text-xl">✓</span>
                <span>Strategia usuwania dostosowana do branży</span>
              </li>
              <li className="flex items-center">
                <span className="text-[#5BA155] mr-3 text-xl">✓</span>
                <span>Pełna dyskrecja i poufność</span>
              </li>
              <li className="flex items-center">
                <span className="text-[#5BA155] mr-3 text-xl">✓</span>
                <span>Monitoring reputacji online</span>
              </li>
              <li className="flex items-center">
                <span className="text-[#5BA155] mr-3 text-xl">✓</span>
                <span>Doradztwo w budowaniu pozytywnej reputacji</span>
              </li>
            </ul>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Każda firma ma unikalne potrzeby i wyzwania. Dlatego nasze podejście jest zawsze 
            indywidualne - analizujemy specyfikę Twojego biznesu, branży i konkretne problemy 
            reputacyjne, aby zapewnić najskuteczniejsze rozwiązanie.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Branże, którym pomagamy
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Nasze doświadczenie obejmuje firmy z różnych sektorów gospodarki. Rozumiemy 
            specyfikę poszczególnych branż i dostosowujemy nasze strategie do ich unikalnych 
            potrzeb i wyzwań reputacyjnych.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-3">Gastronomia i HoReCa</h4>
              <p className="text-gray-700">Restauracje, hotele, bary - branże szczególnie narażone na negatywne opinie.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-3">Usługi medyczne</h4>
              <p className="text-gray-700">Kliniki, gabinety lekarskie, gdzie reputacja to podstawa zaufania pacjentów.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-3">Handel i e-commerce</h4>
              <p className="text-gray-700">Sklepy online i stacjonarne, gdzie opinie wpływają bezpośrednio na sprzedaż.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-3">Usługi profesjonalne</h4>
              <p className="text-gray-700">Kancelarie prawne, biura rachunkowe, firmy konsultingowe.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Jak negatywne opinie wpływają na Twoją firmę?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Badania pokazują, że 90% konsumentów czyta opinie online przed podjęciem decyzji 
            o zakupie. Negatywne opinie na Google mogą znacząco wpłynąć na percepcję Twojej 
            firmy i zmniejszyć liczbę potencjalnych klientów.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Skutki negatywnych opinii dla biznesu
          </h3>

          <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
            <ul className="space-y-2 text-red-700">
              <li>• Spadek zaufania potencjalnych klientów</li>
              <li>• Obniżenie konwersji i sprzedaży</li>
              <li>• Pogorszenie pozycjonowania w wynikach wyszukiwania</li>
              <li>• Utrata przewagi konkurencyjnej</li>
              <li>• Negatywny wpływ na wartość marki</li>
            </ul>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Jedna negatywna opinia może zniweczyć lata budowania reputacji firmy. Dlatego tak 
            ważne jest szybkie i profesjonalne reagowanie na krzywdzące opinie, które mogą 
            zaszkodzić Twojemu biznesowi.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Nasz proces usuwania opinii dla firm
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Wypracowaliśmy skuteczny proces usuwania negatywnych opinii Google, który jest 
            specjalnie dostosowany do potrzeb firm. Każdy etap jest przeprowadzany z najwyższą 
            starannością i pełną dyskrecją.
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2 flex items-center">
                <span className="bg-[#5BA155] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
                Analiza sytuacji biznesowej
              </h4>
              <p className="text-gray-700 ml-11">
                Szczegółowa analiza negatywnych opinii i ich wpływu na reputację firmy.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2 flex items-center">
                <span className="bg-[#5BA155] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
                Strategia usuwania
              </h4>
              <p className="text-gray-700 ml-11">
                Opracowanie indywidualnej strategii usuwania dostosowanej do specyfiki biznesu.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2 flex items-center">
                <span className="bg-[#5BA155] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
                Realizacja działań
              </h4>
              <p className="text-gray-700 ml-11">
                Profesjonalne wykonanie procesu usuwania z zachowaniem pełnej dyskrecji.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2 flex items-center">
                <span className="bg-[#5BA155] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">4</span>
                Monitoring i ochrona
              </h4>
              <p className="text-gray-700 ml-11">
                Ciągły monitoring reputacji i doradztwo w zakresie jej ochrony.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Opinie firm o naszych usługach
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Nasze doświadczenie w pracy z firmami potwierdza skuteczność naszych metod. 
            Oto co mówią przedsiębiorcy, którym pomogliśmy odzyskać pozytywną reputację online:
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
            Zarządzanie reputacją firm - kompleksowe podejście
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Usuwanie negatywnych opinii to tylko część kompleksowego zarządzania reputacją 
            firmy. Oferujemy również doradztwo w zakresie budowania pozytywnego wizerunku 
            online i ochrony przed przyszłymi atakami reputacyjnymi.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Dodatkowe usługi dla firm
          </h3>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <span className="font-medium">Monitoring reputacji online:</span>
                <span className="text-[#5BA155] font-bold">Ciągły nadzór</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">Budowanie pozytywnych opinii:</span>
                <span className="text-[#5BA155] font-bold">Strategia PR</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">Analiza konkurencji:</span>
                <span className="text-[#5BA155] font-bold">Benchmarking</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">Szkolenia dla zespołu:</span>
                <span className="text-[#5BA155] font-bold">Edukacja</span>
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Proaktywna ochrona reputacji
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Najlepszą strategią jest zapobieganie problemom reputacyjnym zanim się pojawią. 
            Pomagamy firmom budować silną, pozytywną reputację online, która jest odporna 
            na sporadyczne negatywne opinie.
          </p>

          <div className="bg-[#5BA155] text-white p-6 rounded-lg mb-6">
            <h4 className="font-bold text-xl mb-2">💼 Kompleksowe wsparcie dla biznesu:</h4>
            <ul className="space-y-2">
              <li>✅ Profesjonalne usuwanie negatywnych opinii</li>
              <li>✅ Strategia budowania pozytywnej reputacji</li>
              <li>✅ Monitoring konkurencji i branży</li>
              <li>✅ Doradztwo w zakresie PR online</li>
              <li>✅ Pełna dyskrecja i poufność</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Kiedy warto skorzystać z naszych usług?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Jeśli Twoja firma boryka się z negatywnymi opiniami na Google, nie czekaj aż 
            problem się pogłębi. Szybka reakcja może uratować reputację i zapobiec dalszym 
            stratom biznesowym.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
            <h4 className="font-bold text-yellow-800 mb-2">Sygnały ostrzegawcze:</h4>
            <ul className="text-yellow-700 space-y-1">
              <li>• Spadek liczby klientów bez wyraźnej przyczyny</li>
              <li>• Negatywne komentarze w mediach społecznościowych</li>
              <li>• Pogorszenie pozycji w wynikach wyszukiwania Google</li>
              <li>• Konkurencja wykorzystuje Twoją słabą reputację</li>
              <li>• Klienci pytają o negatywne opinie</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Gwarancje dla firm
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Rozumiemy, że dla firm każda inwestycja musi przynosić wymierne rezultaty. 
            Dlatego oferujemy solidne gwarancje, które chronią Twój biznes i zapewniają 
            pewność osiągnięcia założonych celów.
          </p>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Gwarancja skuteczności</h4>
              <p className="text-gray-700">
                Płacisz tylko za skutecznie usunięte opinie. Bez rezultatu - bez płatności.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Gwarancja dyskrecji</h4>
              <p className="text-gray-700">
                Pełna poufność działań. Twoja firma i jej reputacja są w bezpiecznych rękach.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Gwarancja wsparcia</h4>
              <p className="text-gray-700">
                Kompleksowe wsparcie przez cały proces i doradztwo po jego zakończeniu.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Jak rozpocząć współpracę?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Rozpoczęcie współpracy z Wizaro jest proste i nie zobowiązuje do niczego. 
            Oferujemy bezpłatną konsultację, podczas której omówimy specyfikę Twojej 
            firmy i zaproponujemy najlepsze rozwiązanie.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h4 className="font-bold text-lg mb-3">Proces współpracy:</h4>
            <ol className="list-decimal list-inside space-y-2">
              <li>Bezpłatna konsultacja telefoniczna</li>
              <li>Analiza sytuacji reputacyjnej firmy</li>
              <li>Przedstawienie strategii i wyceny</li>
              <li>Realizacja uzgodnionych działań</li>
              <li>Monitoring rezultatów i wsparcie</li>
            </ol>
          </div>

          <p className="text-gray-700 mb-8 leading-relaxed font-semibold mt-10">
            Nie pozwól, by negatywne opinie hamowały rozwój Twojej firmy. 
            Skontaktuj się z nami już dziś i odzyskaj kontrolę nad reputacją biznesową!
          </p>

          {/* Sekcja z linkami do powiązanych usług */}
          <div className="w-full max-w-4xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Sprawdź nasze inne usługi dla firm
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/usuwanie-opinii-google-cena" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Cennik usuwania opinii Google - Przejrzyste ceny dla firm
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-firme-z-google-maps" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Usuwanie firm z Google Maps - Kompleksowe usuwanie wizytówek
                </Link>
              </li>
              <li>
                <Link href="/zarządzanie-reputacją-online" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Zarządzanie reputacją online - Profesjonalne usługi dla biznesu
                </Link>
              </li>
              <li>
                <Link href="/monitoring-opinii-google" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Monitoring opinii Google - Ochrona reputacji firmy
                </Link>
              </li>
              <li>
                <Link href="/budowanie-pozytywnych-opinii" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Budowanie pozytywnych opinii - Strategia PR dla firm
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </article>

      {/* Dodatkowy CTA na końcu */}
      <div className="w-full max-w-4xl px-4 py-8">
        <div className="bg-[#5BA155] text-white p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">
            Gotowy odzyskać reputację swojej firmy?
          </h3>
          <p className="mb-6">
            Skontaktuj się z nami już dziś i otrzymaj bezpłatną konsultację. 
            Profesjonalne podejście do biznesu i gwarancja rezultatu.
          </p>
          <Link href="tel:+48792861513">
            <button className="bg-white text-[#5BA155] px-8 py-3 rounded font-bold text-lg hover:bg-gray-100 transition">
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
