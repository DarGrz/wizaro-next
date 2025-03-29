'use client';

import { useEffect, useState } from 'react';

export default function SocialProof() {
  const reviews = [
    { name: "Klaudia Pawlik", text: "Super podejście do użytkownika, pełen profesjonalizm." },
    { name: "Bartosz Leśniak", text: "Po kilku dniach miałem potwierdzenie usunięcia danych. Działa!" },
    { name: "Anna Tomczak", text: "Dzięki Wizaro odzyskałam spokój – niechciane opinie zniknęły." },
    { name: "Tomasz Dębski", text: "Prowadzę warsztat – usunęli hejterskie komentarze z Goworka." },
    { name: "Monika Zawadzka", text: "Świetna obsługa i szybki kontakt. Warto!" },
    { name: "Karol Maj", text: "Jestem pod wrażeniem – profile z map Google zniknęły błyskawicznie." },
    { name: "Ewelina Borowska", text: "W końcu ktoś, kto wie, jak zadbać o wizerunek w sieci." },
    { name: "Piotr Malinowski", text: "Sklep internetowy odetchnął z ulgą. Dziękuję Wizaro!" },
    { name: "Marta Czajka", text: "Miałam problem z fałszywą opinią – pomogli natychmiastowo." },
    { name: "Andrzej Kowal", text: "Nie wierzyłem, że to możliwe, ale faktycznie usunęli profil z Aleo." },
    { name: "Natalia Kurek", text: "Dzięki nim uniknęłam kryzysu wizerunkowego. Polecam każdemu!" },
    { name: "Krzysztof Rojek", text: "Współpraca bez zastrzeżeń – konkretna robota." },
    { name: "Patrycja Kubik", text: "Dobrze przygotowany dokument, wszystko jasno opisane." },
    { name: "Elżbieta Król", text: "Prowadzę salon fryzjerski, nieprzyjemne komentarze zniknęły z dnia na dzień." },
    { name: "Mikołaj Walczak", text: "Profesjonalizm i skuteczność – tak w skrócie opisuję Wizaro." },
    { name: "Magdalena Nowicka", text: "Miła obsługa, szybkie efekty, pełna dyskrecja." },
    { name: "Wojciech Szymański", text: "Nie tylko usunęli dane, ale też doradzili, jak chronić się w przyszłości." },
    { name: "Agnieszka Żur", text: "Zaufanie do Wizaro to była jedna z lepszych decyzji biznesowych." },
    { name: "Jakub Gajos", text: "Widać, że znają się na rzeczy – zrobili wszystko, co obiecali." },
    { name: "Katarzyna Mielczarek", text: "Nie musiałam długo czekać – efekt natychmiastowy." },
    { name: "Marek Zieliński", text: "Z mojej strony – 100% satysfakcji. Polecam z czystym sumieniem." },
    { name: "Beata Grzelak", text: "Potrafią skutecznie działać w sieci – nie są nowicjuszami." },
    { name: "Rafał Twardowski", text: "Warto zainwestować – to się po prostu opłaca." },
    { name: "Joanna Duda", text: "Szybka reakcja, konkretne działania. Wizaro to specjaliści." },
    { name: "Damian Cichoń", text: "Zniknął mój profil z Goworka – i to w kilka dni." },
    { name: "Justyna Piotrowska", text: "Czułam się zaopiekowana przez cały proces." },
    { name: "Marcin Stasiak", text: "Usunęli dane firmy z kilku portali – jestem pod wrażeniem." },
    { name: "Renata Michalska", text: "Skuteczność i dobra komunikacja. Polecam!" },
    { name: "Grzegorz Wrona", text: "Zareagowali szybko – nie musiałem nic tłumaczyć po kilka razy." },
  { name: "Ilona Baran", text: "Bardzo profesjonalna pomoc, świetny kontakt mailowy." },
  { name: "Paweł Lis", text: "Dzięki nim opinie nie wpływają już na moje zlecenia." },
  { name: "Barbara Rutkowska", text: "Zespół zna się na rzeczy – działa skutecznie i dyskretnie." },
  { name: "Mariusz Brzeziński", text: "Nie sądziłem, że coś się da zrobić – a jednak!" },
  { name: "Sylwia Banaś", text: "Dzięki nim zaczęłam znów wierzyć w internetowy PR." },
  { name: "Artur Pająk", text: "Pełne zaangażowanie i świetna obsługa klienta." },
  { name: "Lidia Jędrzejczak", text: "Zamówienie zrealizowane sprawnie i profesjonalnie." },
  { name: "Adrian Grzyb", text: "Warto! W końcu ktoś wie, jak skutecznie dbać o reputację firmy." },
  { name: "Teresa Kubiak", text: "Mój mały biznes w końcu odzyskał dobre imię w sieci." },
  { name: "Łukasz Kania", text: "Szybko, konkretnie, profesjonalnie – dziękuję!" },
  { name: "Zofia Głowacka", text: "Wizaro to gwarancja spokoju – polecam każdemu przedsiębiorcy." },
  { name: "Sebastian Zięba", text: "Polecam każdemu, kto boryka się z fałszywymi opiniami." },
  { name: "Grażyna Domańska", text: "Doświadczenie i skuteczność – widać od razu." },
  { name: "Daniel Kruczek", text: "Zrobili więcej niż się spodziewałem – wow." },
  { name: "Mariola Sokołowska", text: "Jestem zachwycona obsługą i efektem końcowym." },
  { name: "Patryk Włodarczyk", text: "Super komunikacja, wszystko zrobione jak trzeba." },
  { name: "Natalia Leszczyńska", text: "Usunięcie danych poszło sprawnie i bezproblemowo." },
  { name: "Hubert Kozłowski", text: "Dzięki nim mój gabinet znów cieszy się dobrą opinią." },
  { name: "Jolanta Nowakowska", text: "Prawdziwi eksperci od reputacji online!" },
  { name: "Konrad Skalski", text: "Zdecydowanie warto – szybko i bezpiecznie." },
  { name: "Iwona Ptak", text: "Polecam każdemu, kto dba o wizerunek swojej firmy." },
  { name: "Emil Krupa", text: "Bez zbędnych formalności – efekt widoczny w kilka dni." },
  { name: "Alicja Górska", text: "Cenię ich za uczciwość i skuteczność." },
  { name: "Mateusz Żak", text: "Wizaro pomogło mi w trudnym momencie – dziękuję!" },
  { name: "Dorota Cichoń", text: "Sprawnie i skutecznie – polecam z całego serca." },
  { name: "Ryszard Urban", text: "Świetna firma, świetni ludzie – naprawdę wiedzą, co robią." },
  { name: "Oliwia Brzozowska", text: "Skontaktowali się od razu i działali błyskawicznie." },
  { name: "Jerzy Pawlak", text: "Jako właściciel hurtowni polecam – konkretna robota." },
  { name: "Kinga Wilk", text: "Nie mam żadnych zastrzeżeń – Wizaro to klasa sama w sobie." },
  { name: "Dawid Sikora", text: "To, co obiecali, zrealizowali w 100%." },
  ];

  const [randomReviews, setRandomReviews] = useState<typeof reviews>([]);

  useEffect(() => {
    const shuffled = [...reviews].sort(() => 0.5 - Math.random());
    setRandomReviews(shuffled.slice(0,6));
  }, []);

  if (randomReviews.length === 0) return null;

  return (
    <section className="mx-auto px-md-4 py-10">
      <h2 className="text-lg font-semibold text-center text-gray-800 mb-8">Opinie użytkowników</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {randomReviews.map((review, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-[#002a5c]">
                {review.name[0]}
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                <div className="flex text-yellow-500 text-xs">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-700">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
