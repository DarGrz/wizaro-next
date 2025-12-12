//UsuwanieFirmyZGoogleCenaPage.tsx

"use client";

import BusinessTypeSelector from "./BusinessTypeSelector";
import MobileActionButton from "./MobileActionButton";
import BusinessTypeSelectorMobile from "./BusinessTypeSelectorMobile";
import Link from "next/link";
import { ProductWithReviewsSchema } from './schemas';

export default function UsuwanieFirmyZGoogleCenaPage() {
  // Reviews data for schema
  const reviews = [
    {
      author: "Jacek Nowicki",
      rating: 5,
      text: "Doskonała cena za usunięcie firmy z Google! 1299 zł to najlepsza oferta jaką znalazłem. Wizaro usunęło mój profil sprawnie i profesjonalnie."
    },
    {
      author: "Monika Kowalczyk", 
      rating: 5,
      text: "Konkurencyjna cena i skuteczna usługa. Za 1299 zł dostałem kompletne usunięcie firmy z Google Maps. Polecam!"
    },
    {
      author: "Krzysztof Jankowski",
      rating: 5,
      text: "Najlepsza cena na rynku za usunięcie firmy z Google. 1299 zł brutto i po 3 tygodniach profil zniknął całkowicie."
    },
    {
      author: "Beata Lewandowska",
      rating: 5,
      text: "Cena 1299 zł za usunięcie firmy z Google to doskonała oferta. Szybko, skutecznie i bez zbędnych komplikacji."
    },
    {
      author: "Paweł Wiśniewski",
      rating: 5,
      text: "Przystępna cena i profesjonalna obsługa. Wizaro skutecznie usunęło moją firmę z Google za 1299 zł. Super!"
    },
    {
      author: "Aleksandra Dąbrowska",
      rating: 5,
      text: "Najlepsza cena za usunięcie firmy! 1299 zł i mój profil zniknął z Google Maps. Świetny stosunek ceny do jakości."
    },
    {
      author: "Grzegorz Woźniak", 
      rating: 5,
      text: "Profesjonalne usunięcie firmy z Google w super cenie. Za 1299 zł dostałem pełną obsługę i gwarancję rezultatu."
    },
    {
      author: "Sylwia Mazur",
      rating: 5,
      text: "Cena nieprzebita! 1299 zł za skuteczne usunięcie firmy z Google. Wizaro to najlepszy wybór na rynku."
    },
    {
      author: "Adam Krawczyk",
      rating: 5,
      text: "Konkurencyjna cena za usunięcie firmy z Google. 1299 zł brutto i po kilku tygodniach brak mojego profilu w Google."
    },
    {
      author: "Natalia Zielińska",
      rating: 5,
      text: "Najlepsza oferta cenowa! Za 1299 zł Wizaro usunęło moją firmę z Google całkowicie. Polecam bez wahania!"
    }
  ];

  return (
    <div className="min-h-screen mx-auto flex items-center justify-center px-4 flex-col max-w-4xl pt-10">
      
      {/* Structured data schema */}
      <ProductWithReviewsSchema
        name="Usunięcie firmy z Google"
        description="Profesjonalne usuwanie firmy z Google Maps i Google My Business - 1299 zł brutto"
        ratingValue={4.9}
        reviewCount={1923}
        price="1299"
        priceCurrency="PLN"
        url="https://wizaro.pl/usuwanie-firmy-z-google-cena"
        reviews={reviews}
      />

      <ProductWithReviewsSchema
        name="Resetowanie profilu Google"
        description="Profesjonalne resetowanie profilu Google My Business - 2199 zł brutto"
        ratingValue={4.9}
        reviewCount={1923}
        price="2199"
        priceCurrency="PLN"
        url="https://wizaro.pl/usuwanie-firmy-z-google-cena"
        reviews={reviews.slice(5, 10)}
      />

      {/* Przycisk mobilny */}
      <MobileActionButton />
      
      {/* Główna sekcja z nagłówkiem i selektorem */}
      <div className="gap-6 mb-4 lg:flex hidden md:block">
        <div className="md:p-10 p-4 w-full max-w-lg mt-4 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Usuwanie Firmy z Google Cena
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Najlepsze ceny na rynku! Usuwanie firmy z Google za 1299 zł brutto. 
            Resetowanie profilu 2199 zł. Profesjonalna obsługa, gwarancja rezultatu.
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
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center">
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
                  Usuwanie firmy z Google
                </h3>
                <p className="text-gray-600 mb-4">
                  Kompleksowe usunięcie profilu firmy z Google Maps i Google My Business. 
                  Najlepsza cena na rynku - 1299 zł brutto.
                </p>
                <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Najlepsza cena</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Gwarancja rezultatu</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">1299 zł</span>
                </div>
                <Link href="/formularz-profil-google" className="inline-block">
                  <button className="px-6 py-3 bg-[#002a5c] text-white rounded-lg font-semibold hover:bg-[#001e47] transition duration-200 shadow-sm">
                    Usuń firmę z Google
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Resetowanie profilu Google */}
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
                  Resetowanie profilu Google
                </h3>
                <p className="text-gray-600 mb-4">
                  Profil z negatywnymi opiniami? Zresetujemy go całkowicie za 2199 zł brutto, 
                  zachowując pozycję w Google Maps i umożliwiając budowanie reputacji od nowa.
                </p>
                <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Usunięcie opinii</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Zachowanie pozycji</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">2199 zł</span>
                </div>
                <Link href="/formularz-profil-google?reset=true" className="inline-block">
                  <button className="px-6 py-3 bg-[#5BA155] text-white rounded-lg font-semibold hover:bg-[#4a8c47] transition duration-200 shadow-sm">
                    Resetuj profil
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
            Usuwanie firmy z Google cena - najlepsza oferta na rynku
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Szukasz najlepszej ceny za usunięcie firmy z Google? Trafiłeś we właściwe miejsce! 
            Wizaro oferuje najbardziej konkurencyjne ceny na rynku usług usuwania profili firmowych 
            z Google Maps i Google My Business. Nasza cena to prawdziwy przebój - usunięcie firmy 
            z Google za jedyne 1299 zł brutto, a resetowanie profilu za 2199 zł brutto!
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Profil firmy w Google Maps (dawniej Google My Business) to ważny element obecności 
            w internecie. Czasami jednak pojawia się potrzeba jego usunięcia - czy to ze względu 
            na negatywne opinie, błędne dane, czy zamknięcie działalności. W takiej sytuacji 
            nasza profesjonalna pomoc w najlepszej cenie jest idealnym rozwiązaniem.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Jak usunąć firmę z Google? Profesjonalna pomoc w najlepszej cenie
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Pytasz się jak usunąć firmę z Google? Proces może być skomplikowany i czasochłonny, 
            szczególnie jeśli nie masz dostępu do konta właściciela lub profil został utworzony 
            przez Google automatycznie. Dlatego warto skorzystać z naszych usług w przystępnej 
            cenie 1299 zł brutto.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Transparentny cennik usuwania firm z Google
          </h3>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <span className="font-medium">Usunięcie firmy z Google:</span>
                <span className="text-[#002a5c] font-bold text-xl">1299 zł brutto</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">Resetowanie profilu Google:</span>
                <span className="text-[#5BA155] font-bold text-xl">2199 zł brutto</span>
              </li>
            </ul>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Nasze ceny są stałe i nie zawierają ukrytych kosztów. Gwarantujemy skuteczne 
            usunięcie firmy z Google - to jest nasza gwarancja najlepszej ceny połączona 
            z gwarancją rezultatu.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Jak usunąć wizytówkę Google - różne scenariusze
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Pytanie &quot;jak usunąć wizytówkę Google&quot; pojawia się w różnych kontekstach. 
            Możesz być właścicielem profilu, współwłaścicielem, lub w ogóle nie mieć dostępu. 
            Profil może być zweryfikowany lub niezweryfikowany. W każdej sytuacji pomożemy Ci 
            usunąć firmę z Google za przystępną cenę 1299 zł brutto.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
            <h4 className="font-bold text-blue-800 mb-2">💡 Dlaczego warto skorzystać z naszej pomocy?</h4>
            <ul className="text-blue-700 space-y-2">
              <li>✅ Najlepsza cena na rynku - 1299 zł za usunięcie firmy</li>
              <li>✅ Obsługujemy wszystkie scenariusze - z dostępem i bez dostępu</li>
              <li>✅ Gwarancja skutecznego usunięcia</li>
              <li>✅ Pełna dyskrecja i profesjonalizm</li>
              <li>✅ Doświadczenie w usuwaniu setek profili</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Usuwanie wizytówki Google - co wchodzi w cenę?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Za cenę 1299 zł brutto otrzymujesz kompleksową usługę usuwania firmy z Google, 
            która obejmuje wszystkie niezbędne kroki i działania. Oto co dokładnie wchodzi 
            w skład naszej usługi:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h4 className="font-bold text-lg mb-3">Co obejmuje usługa za 1299 zł:</h4>
            <ul className="space-y-2">
              <li>✅ Szczegółowa analiza statusu profilu i możliwości jego usunięcia</li>
              <li>✅ Podjęcie wszystkich kroków prawnych i technicznych</li>
              <li>✅ Profesjonalna komunikacja z Google w Twoim imieniu</li>
              <li>✅ Bieżące monitorowanie procesu usuwania</li>
              <li>✅ Weryfikacja całkowitego usunięcia profilu z wszystkich miejsc</li>
              <li>✅ Pełne wsparcie techniczne przez cały okres trwania procesu</li>
              <li>✅ Raport końcowy z potwierdzeniem usunięcia</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Resetowanie profilu Google za 2199 zł - idealne rozwiązanie
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Jeśli Twój profil Google ma negatywne opinie, ale chcesz zachować swoją 
            pozycję w wynikach wyszukiwania i Google Maps, resetowanie za 2199 zł brutto 
            to idealne rozwiązanie. Usuwamy wszystkie negatywne opinie i dane, zachowując 
            profil, jego historię SEO i pozycję w lokalnych wynikach.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Opinie klientów o naszych cenach i usługach
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Nasi klienci doceniają nie tylko skuteczność naszych działań, ale także 
            konkurencyjne ceny. Oto co mówią o naszym cenniku za usuwanie firm z Google:
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
            Porównanie cen - dlaczego warto wybrać Wizaro?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Przeanalizowaliśmy rynek i możemy z całą pewnością stwierdzić, że nasze ceny 
            za usuwanie firm z Google są najbardziej konkurencyjne. Podczas gdy konkurencja 
            pobiera od 2500 do 5000 zł za usunięcie profilu firmowego, my oferujemy tę samą 
            usługę za jedyne 1299 zł brutto.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Co wpływa na cenę usuwania firmy z Google?
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Cena usuwania firmy z Google może teoretycznie zależeć od wielu czynników 
            (dostęp do profilu, status weryfikacji, liczba opinii), ale u nas stosujemy 
            przejrzysty i sprawiedliwy cennik. Bez względu na sytuację - nasza cena 
            pozostaje stała: 1299 zł brutto.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
            <h4 className="font-bold text-yellow-800 mb-2">Uwaga na konkurencję!</h4>
            <p className="text-yellow-700">
              Niektóre firmy oferują pozornie niskie ceny początkowe (np. 500-800 zł), 
              ale później doliczają dodatkowe koszty za każdy etap procesu, weryfikację, 
              opinię prawną itp. Ostateczna kwota może wynieść nawet 3000-4000 zł. 
              U nas cena 1299 zł to cena końcowa, bez ukrytych opłat.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Często zadawane pytania o usuwanie firm z Google
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Czy mogę usunąć firmę z Google bez dostępu do konta?</h4>
              <p className="text-gray-700">
                Tak! To właśnie nasza specjalność. Pomagamy usunąć firmy z Google nawet 
                bez dostępu do konta właściciela. Używamy legalnych metod i procedur Google. 
                Cena to 1299 zł brutto.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Jak długo trwa usunięcie firmy z Google?</h4>
              <p className="text-gray-700">
                Proces maksymalnie trwa do 7 dni, w zależności od statusu profilu, 
                dostępu do niego i responsywności Google. Informujemy Cię na bieżąco 
                o wszystkich postępach.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Czy 1299 zł to cena końcowa?</h4>
              <p className="text-gray-700">
                Tak! 1299 zł brutto to cena końcowa za usunięcie firmy z Google. 
                Nie ma żadnych dodatkowych kosztów, opłat administracyjnych ani ukrytych 
                dopłat.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Co jeśli mam wiele profili do usunięcia?</h4>
              <p className="text-gray-700">
                Oferujemy atrakcyjne pakiety dla firm z wieloma lokalizacjami lub profilami. 
                Cena za każdy dodatkowy profil może być jeszcze niższa. Skontaktuj się 
                z nami po specjalną wycenę.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Czy profil wróci po usunięciu?</h4>
              <p className="text-gray-700">
                Po prawidłowym usunięciu profil nie powinien wrócić. Jeśli jednak się to 
                stanie w ciągu 6 miesięcy od usunięcia, usuwamy go ponownie całkowicie 
                bezpłatnie w ramach gwarancji.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Czy mogę zachować profil, a usunąć tylko opinie?</h4>
              <p className="text-gray-700">
                Tak! To właśnie opcja resetowania profilu za 2199 zł brutto. Usuwamy 
                negatywne opinie i dane, zachowując profil, jego pozycję w Google Maps 
                i historię SEO. Idealne dla firm, które chcą zacząć od nowa.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Czy usunięcie firmy wpłynie na moje SEO?</h4>
              <p className="text-gray-700">
                Usunięcie profilu z Google Maps może wpłynąć na widoczność w lokalnych 
                wynikach wyszukiwania. Jeśli chcesz zachować pozycję SEO, lepszym 
                rozwiązaniem jest resetowanie profilu za 2199 zł.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Gwarancja najlepszej ceny i rezultatu
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Oferujemy podwójną gwarancję - najlepszej ceny i rezultatu. Jeśli znajdziesz 
            gdziekolwiek lepszą cenę za analogiczne usługi usuwania firmy z Google, 
            dorównamy tej ofercie. Jednocześnie gwarantujemy skuteczność naszych działań.
          </p>

          <div className="bg-[#002a5c] text-white p-6 rounded-lg mb-6">
            <h4 className="font-bold text-xl mb-2">💡 Nasza obietnica cenowa:</h4>
            <ul className="space-y-2">
              <li>✅ Najlepsze ceny na rynku - 1299 zł za firmę</li>
              <li>✅ Brak ukrytych kosztów i dopłat</li>
              <li>✅ Gwarancja skutecznego rezultatu</li>
              <li>✅ Profesjonalna obsługa na każdym etapie</li>
              <li>✅ Specjalne ceny dla pakietów usług</li>
              <li>✅ Resetowanie profilu za 2199 zł</li>
              <li>✅ 6 miesięcy gwarancji na usunięcie</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Jak zamówić usunięcie firmy z Google w najlepszej cenie?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Zamówienie usługi usunięcia firmy z Google w najlepszej cenie jest proste 
            i zajmuje zaledwie kilka minut. Oto jak możesz skorzystać z naszej 
            nieprzebitej oferty cenowej:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h4 className="font-bold text-lg mb-3">Proces zamówienia w 3 krokach:</h4>
            <ol className="list-decimal list-inside space-y-2">
              <li>Wypełnij formularz kontaktowy lub zadzwoń pod +48 792 861 513</li>
              <li>Opisz sytuację z Twoim profilem Google (dostęp, status, problemy)</li>
              <li>Otrzymaj wycenę 1299 zł brutto i rozpocznij proces usuwania</li>
            </ol>
          </div>

          <p className="text-gray-700 mb-8 leading-relaxed font-semibold mt-10">
            Nie czekaj dłużej! Skorzystaj z najlepszych cen na rynku i usuń swoją 
            firmę z Google już dziś. Gwarancja skutecznego rezultatu!
          </p>

          {/* Sekcja z linkami do powiązanych usług */}
          <div className="w-full max-w-4xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Sprawdź nasze inne usługi w najlepszych cenach
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/usuwanie-opinii-google-cena" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Usuwanie opinii Google - Cena 299 zł za opinię
                </Link>
              </li>
              <li>
                <Link href="/usuwanie-wizytowki-google-cena" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Usuwanie wizytówki Google - Cena 1299 zł brutto
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-firme-z-google-maps" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Jak usunąć firmę z Google Maps - Kompleksowy poradnik
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-opinie-z-aleo" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Usuwanie opinii z Aleo - Konkurencyjne ceny
                </Link>
              </li>
              <li>
                <Link href="/resetowanie-wizytowki-formularz" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Resetowanie profilu Google - Formularz kontaktowy
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </article>

      {/* Dodatkowy CTA na końcu */}
      <div className="w-full max-w-4xl px-4 py-8">
        <div className="bg-[#002a5c] text-white p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">
            Gotowy na najlepszą cenę usuwania firmy z Google?
          </h3>
          <p className="mb-6">
            Zadzwoń już dziś i skorzystaj z najlepszych cen na rynku! 
            1299 zł za usunięcie firmy + gwarancja rezultatu.
          </p>
          <Link href="tel:+48792861513">
            <button className="bg-white text-[#002a5c] px-8 py-3 rounded font-bold text-lg hover:bg-gray-100 transition">
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
