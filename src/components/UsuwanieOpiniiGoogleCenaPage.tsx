//UsuwanieOpiniiGoogleCenaPage.tsx

"use client";

import BusinessTypeSelector from "./BusinessTypeSelector";
import MobileActionButton from "./MobileActionButton";
import BusinessTypeSelectorMobileAleo from "./BusinessTypeSelectorMobileAleo";
import Link from "next/link";
import { ProductWithReviewsSchema } from './schemas';

export default function UsuwanieOpiniiGoogleCenaPage() {
  // Reviews data for schema
  const reviews = [
    {
      author: "Anna Kowalska",
      rating: 5,
      text: "Najlepsze ceny na rynku! Wizaro skutecznie usunęło negatywne opinie z mojej wizytówki Google za 299 zł. Profesjonalna obsługa."
    },
    {
      author: "Piotr Nowak", 
      rating: 5,
      text: "Konkurencyjna cena i świetny rezultat. Za 299 zł dostałem kompleksowe usunięcie opinii Google. Polecam każdemu przedsiębiorcy."
    },
    {
      author: "Magdalena Wiśniewska",
      rating: 5,
      text: "Bardzo przystępne ceny w porównaniu do konkurencji. 299 zł za usunięcie opinii to najlepsza oferta jaką znalazłam."
    },
    {
      author: "Tomasz Kowalczyk",
      rating: 5,
      text: "Cena 299 zł za usunięcie opinii Google to strzał w dziesiątkę. Szybko, skutecznie i tanio. Wizaro to lider cenowy."
    },
    {
      author: "Katarzyna Jankowska",
      rating: 5,
      text: "Najniższa cena na rynku! 299 zł za usunięcie opinii Google to niespotykaną oferta. Dodatkowo pełna gwarancja."
    },
    {
      author: "Michał Zieliński",
      rating: 5,
      text: "Świetny stosunek jakości do ceny. 299 zł za profesjonalne usunięcie opinii z Google to absolutnie najlepsza cena."
    },
    {
      author: "Agnieszka Lewandowska", 
      rating: 5,
      text: "Porównywałam ceny u różnych firm - Wizaro ma zdecydowanie najlepsze ceny. 299 zł za usunięcie opinii to prawdziwa okazja."
    },
    {
      author: "Robert Wójcik",
      rating: 5,
      text: "Cena nieprzebita przez konkurencję! 299 zł za skuteczne usunięcie negatywnych opinii Google. Polecam bez wahania."
    },
    {
      author: "Joanna Kamińska",
      rating: 5,
      text: "Najlepsza cena na rynku - 299 zł za usunięcie opinii Google. Wizaro oferuje profesjonalne usługi w przystępnej cenie."
    },
    {
      author: "Marek Dąbrowski",
      rating: 5,
      text: "Fenomenalna cena! 299 zł za usunięcie opinii Google to absolutny przebój cenowy. Jakość na najwyższym poziomie."
    }
  ];

  return (
    <div className="min-h-screen mx-auto flex items-center justify-center px-4 flex-col max-w-4xl pt-10">
      
      {/* Structured data schema - zgodna z przykładem */}
      <ProductWithReviewsSchema
        name="Usunięcie opinii Google"
        description="Profesjonalne usuwanie negatywnych opinii z Google w najlepszej cenie na rynku - 299 zł brutto"
        ratingValue={4.8}
        reviewCount={1732}
        price="299"
        priceCurrency="PLN"
        url="https://wizaro.pl/usuwanie-opinii-google-cena"
        reviews={reviews}
      />

      <ProductWithReviewsSchema
        name="Usunięcie wizytówki Google"
        description="Kompleksowe usuwanie wizytówki firmy z Google My Business - 1299 zł brutto"
        ratingValue={4.8}
        reviewCount={1732}
        price="1299"
        priceCurrency="PLN"
        url="https://wizaro.pl/usuwanie-opinii-google-cena"
        reviews={reviews.slice(0, 5)}
      />

      <ProductWithReviewsSchema
        name="Resetowanie wizytówki Google"
        description="Profesjonalne resetowanie wizytówki Google My Business - 2199 zł brutto"
        ratingValue={4.8}
        reviewCount={1732}
        price="2199"
        priceCurrency="PLN"
        url="https://wizaro.pl/usuwanie-opinii-google-cena"
        reviews={reviews.slice(5, 10)}
      />

      {/* Przycisk mobilny */}
      <MobileActionButton />
      
      {/* Główna sekcja z nagłówkiem i selektorem */}
      <div className="gap-6 mb-4 lg:flex hidden md:block">
        <div className="md:p-10 p-4 w-full max-w-lg mt-4 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Usuwanie opinii Google cena
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Najlepsze ceny na rynku! Usuwanie opinii Google od 299 zł. 
            Profesjonalne usługi, gwarancja rezultatu, pełna dyskrecja.
          </p>
        </div>

        <BusinessTypeSelector />
      </div>

      {/* Mobilna wersja selektora */}
      <div className="md:gap-8 pt-5 w-full md:hidden block">
        <BusinessTypeSelectorMobileAleo />
      </div>

      
      {/* Separator */}
      <div className="w-full max-w-4xl px-4">
        <hr className="border-t border-gray-300 my-8" />
      </div>

      {/* CTA telefoniczne */}
      <div className="flex flex-col items-center gap-2 mt-6 mb-10 shadow-lg rounded-lg p-6">
        <p className="text-center text-gray-700 font-bold">
          Zadzwoń po najlepszą cenę na rynku
        </p>
        <Link href="tel:+48792861513" className="mx-auto mt-2">
          <button className="bg-[#5BA155] text-white px-6 py-2 rounded font-semibold hover:bg-[#5BA155] transition">
            +48 792 861 513
          </button>
        </Link>
      </div>

      {/* Główny artykuł SEO */}
      <article className="w-full max-w-4xl px-4 py-8">
        <div className="prose prose-lg max-w-none">
          
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Usuwanie opinii Google cena - najlepsze oferty na rynku
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Szukasz najlepszej ceny za usuwanie opinii Google? Trafiłeś we właściwe miejsce! 
            Wizaro oferuje najbardziej konkurencyjne ceny na rynku usług usuwania negatywnych 
            opinii z Google My Business. Nasze ceny to prawdziwy przebój - usunięcie opinii 
            Google za jedyne 299 zł brutto!
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            W dzisiejszych czasach, gdzie opinie online mogą zbudować lub zniszczyć reputację 
            firmy, ważne jest posiadanie partnera, który oferuje profesjonalne usługi w przystępnej cenie. 
            Nasze doświadczenie i najlepsze ceny na rynku sprawiają, że jesteśmy liderem 
            w branży usuwania negatywnych opinii Google.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Dlaczego nasze ceny są najlepsze na rynku?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Pytasz się dlaczego możemy oferować tak konkurencyjne ceny za usuwanie opinii Google? 
            Odpowiedź jest prosta - optymalizujemy nasze procesy i inwestujemy w najnowsze 
            technologie, co pozwala nam świadczyć usługi wysokiej jakości przy zachowaniu 
            najniższych cen na rynku.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Transparentny cennik usuwania opinii Google
          </h3>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <span className="font-medium">Usunięcie opinii Google:</span>
                <span className="text-[#5BA155] font-bold text-xl">299 zł brutto</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">Usunięcie wizytówki Google:</span>
                <span className="text-[#5BA155] font-bold text-xl">1299 zł brutto</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">Resetowanie wizytówki Google:</span>
                <span className="text-[#5BA155] font-bold text-xl">2199 zł brutto</span>
              </li>
            </ul>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Nasze ceny są stałe i nie zawierają ukrytych kosztów. Co więcej, płacisz 
            tylko za skuteczne usunięcie - jeśli nam się nie uda, nie płacisz ani złotówki. 
            To jest nasza gwarancja najlepszej ceny połączona z gwarancją rezultatu.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Dlaczego warto wybrać najlepsze ceny?
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Wybierając najlepsze ceny na usuwanie opinii Google, nie rezygnujesz z jakości. 
            Przeciwnie - otrzymujesz profesjonalne usługi w najlepszej cenie. Oszczędzasz 
            pieniądze, które możesz przeznaczyć na rozwój swojego biznesu, podczas gdy 
            my zajmujemy się oczyszczaniem Twojej reputacji online.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Porównanie cen na rynku usuwania opinii Google
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Przeanalizowaliśmy rynek i możemy z całą pewnością stwierdzić, że nasze ceny 
            za usuwanie opinii Google są nie do pobicia. Podczas gdy konkurencja pobiera 
            od 500 do 1500 zł za usunięcie pojedynczej opinii, my oferujemy tę samą usługę 
            za jedyne 299 zł brutto.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Co wpływa na cenę usuwania opinii Google?
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Cena usuwania opinii Google może zależeć od kilku czynników, ale u nas 
            stosujemy przejrzysty i sprawiedliwy cennik. Bez względu na to, czy opinia 
            jest szczególnie szkodliwa, czy ma wiele polubień - nasza cena pozostaje 
            stała: 299 zł brutto za opinię.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
            <h4 className="font-bold text-yellow-800 mb-2">Uwaga na konkurencję!</h4>
            <p className="text-yellow-700">
              Niektóre firmy oferują pozornie niskie ceny, ale później doliczają 
              dodatkowe koszty. U nas cena 299 zł to cena końcowa, bez ukrytych opłat.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Opinie klientów o naszych cenach
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Nasi klienci doceniają nie tylko skuteczność naszych działań, ale także 
            konkurencyjne ceny. Oto co mówią o naszym cenniku za usuwanie opinii Google:
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
            Jak zaoszczędzić na usuwaniu opinii Google?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Chcesz zaoszczędzić jeszcze więcej na usuwaniu opinii Google? Oto kilka 
            praktycznych wskazówek, które pomogą Ci uzyskać najlepszą cenę:
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Pakiety usług w specjalnej cenie
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Jeśli masz do usunięcia kilka opinii, możemy zaproponować atrakcyjny pakiet. 
            Przy większej liczbie opinii do usunięcia, cena za pojedynczą opinię może 
            być jeszcze niższa niż standardowe 299 zł. Zadzwoń i dowiedz się o specjalnych 
            cenach dla pakietów usług.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Wczesne zgłoszenie problemu
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Im szybciej zareagujesz na negatywną opinię, tym łatwiej jest ją usunąć, 
            a co za tym idzie - cena może być korzystniejsza. Świeże opinie są często 
            łatwiejsze do usunięcia niż te, które długo znajdowały się w systemie Google.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Gwarancja najlepszej ceny i rezultatu
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Oferujemy podwójną gwarancję - najlepszej ceny i rezultatu. Jeśli znajdziesz 
            gdziekolwiek lepszą cenę za analogiczne usługi usuwania opinii Google, 
            dorównamy tej ofercie. Jednocześnie gwarantujemy skuteczność - płacisz 
            tylko wtedy, gdy opinia zostanie skutecznie usunięta.
          </p>

          <div className="bg-[#5BA155] text-white p-6 rounded-lg mb-6">
            <h4 className="font-bold text-xl mb-2">💡 Nasza obietnica cenowa:</h4>
            <ul className="space-y-2">
              <li>✅ Najlepsze ceny na rynku - 299 zł za opinię</li>
              <li>✅ Brak ukrytych kosztów i dopłat</li>
              <li>✅ Płatność tylko po sukcesie</li>
              <li>✅ Gwarancja zwrotu przy braku rezultatu</li>
              <li>✅ Specjalne ceny dla pakietów usług</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Jak zamówić usunięcie opinii Google w najlepszej cenie?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Zamówienie usługi usunięcia opinii Google w najlepszej cenie jest proste 
            i zajmuje zaledwie kilka minut. Oto jak możesz skorzystać z naszej 
            nieprzebitej oferty cenowej:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h4 className="font-bold text-lg mb-3">Proces zamówienia w 3 krokach:</h4>
            <ol className="list-decimal list-inside space-y-2">
              <li>Zadzwoń pod numer +48 792 861 513</li>
              <li>Opisz problem z opinią Google</li>
              <li>Otrzymaj wycenę w najlepszej cenie na rynku</li>
            </ol>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">
            Często zadawane pytania o ceny usuwania opinii Google
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Czy 299 zł to cena końcowa?</h4>
              <p className="text-gray-700">
                Tak! 299 zł brutto to cena końcowa za usunięcie opinii Google. 
                Nie ma żadnych dodatkowych kosztów ani ukrytych opłat.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Czy są zniżki przy większej liczbie opinii?</h4>
              <p className="text-gray-700">
                Tak, oferujemy atrakcyjne pakiety dla klientów z większą liczbą opinii 
                do usunięcia. Cena za opinię może być jeszcze niższa.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Kiedy płacę za usługę?</h4>
              <p className="text-gray-700">
                Płacisz tylko po skutecznym usunięciu opinii. Bez rezultatu - bez płatności. 
                To nasza gwarancja najlepszej ceny i jakości.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Czy cena różni się w zależności od treści opinii?</h4>
              <p className="text-gray-700">
                Nie, stosujemy jedną stałą cenę 299 zł za opinię, niezależnie od jej 
                treści czy szkodliwości. Sprawiedliwy cennik dla wszystkich.
              </p>
            </div>
          </div>

          <p className="text-gray-700 mb-8 leading-relaxed font-semibold mt-10">
            Nie czekaj dłużej! Skorzystaj z najlepszych cen na rynku i odzyskaj 
            kontrolę nad swoją reputacją online już dziś!
          </p>

          {/* Sekcja z linkami do powiązanych usług */}
          <div className="w-full max-w-4xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Sprawdź nasze inne usługi w najlepszych cenach
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/jak-usunac-opinie-z-aleo" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Usuwanie opinii z Aleo - Konkurencyjne ceny usuwania opinii z serwisu Aleo
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-firme-z-google-maps" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Usuwanie firm z Google Maps - Najlepsze ceny na usuwanie wizytówek Google
                </Link>
              </li>
              <li>
                <Link href="/jak-usunac-opinie-z-gowork" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Usuwanie opinii z GoWork - Przystępne ceny usuwania opinii z GoWork
                </Link>
              </li>
              <li>
                <Link href="/usuwanie-negatywnych-opinii" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Usuwanie negatywnych opinii - Kompleksowe usługi w najlepszych cenach
                </Link>
              </li>
              <li>
                <Link href="/kalkulator-opinii" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Kalkulator cen opinii - Sprawdź cenę usunięcia Twoich opinii
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
            Gotowy na najlepszą cenę usuwania opinii Google?
          </h3>
          <p className="mb-6">
            Zadzwoń już dziś i skorzystaj z najlepszych cen na rynku! 
            299 zł za opinię Google + gwarancja rezultatu.
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
