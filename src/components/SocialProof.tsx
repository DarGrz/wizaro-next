'use client';

import { useEffect, useState } from 'react';

export default function SocialProof() {
  const reviews = [
    {
      name: "Jacek Borowiec",
      text: "Jako właściciel niewielkiej firmy transportowej wiem, jak opinie w internecie potrafią zniszczyć reputację budowaną latami. Trafiłem na Wizaro z polecenia znajomego – i nie zawiodłem się. Profesjonalne podejście, jasna komunikacja i przede wszystkim – skuteczność. Wszystko załatwili bez komplikacji."
    },
    {
      name: "Urszula Nitek",
      text: "Jestem nauczycielką, która prowadzi też korepetycje online. Niestety ktoś podszył się pod moje dane i zamieścił nieprawdziwe informacje na jednym z portali. Dzięki Wizaro udało się szybko zareagować. Cały proces był dla mnie klarowny, a zespół zachował pełną empatię i dyskrecję."
    },
    {
      name: "Tomasz Kasperski",
      text: "Jestem informatykiem z ponad 20-letnim doświadczeniem. Zlecenie dla Wizaro dotyczyło usunięcia profilu z map Google i kilku fałszywych opinii. Mimo mojego technicznego podejścia nie byłbym w stanie poradzić sobie z tym samodzielnie. Ekipa Wizaro wie, co robi – wszystko zgodnie z prawem i skutecznie."
    },
    {
      name: "Beata Sokołowska",
      text: "Mam 54 lata i prowadzę mały pensjonat w górach. Przez sezon miałam trudnych gości, którzy zostawili nieprzyjemne i nieprawdziwe opinie. Próbowałam sama coś z tym zrobić, ale bez skutku. Dzięki Wizaro w ciągu kilku dni zniknęły z sieci nieprawdziwe komentarze, a mój obiekt znów wygląda dobrze w oczach klientów."
    },
    {
      name: "Adam Górniak",
      text: "Nie jestem ekspertem od internetu, ale wiem jedno – złe opinie mogą zabić biznes. Mam warsztat samochodowy i przez konflikt z byłym pracownikiem ktoś regularnie wystawiał mi fałszywe komentarze. Dzięki Wizaro pozbyłem się tego problemu raz na zawsze. Świetny kontakt i konkretne efekty."
    },
    {
      name: "Renata Majchrzak",
      text: "Z zawodu jestem kosmetolożką i prowadzę własny salon. Po nieprzyjemnym incydencie z konkurencją zaczęły pojawiać się krzywdzące opinie na kilku portalach. Trafiłam na Wizaro z reklamy – i naprawdę warto było zaufać. Dostałam jasne instrukcje, co będzie robione i kiedy. Efekt? Wszystko zostało usunięte."
    },
    {
      name: "Marek Urban",
      text: "Jako emerytowany prawnik nie jestem łatwym klientem – wymagam konkretów. Wizaro przedstawiło przejrzysty plan działania i go zrealizowało. Z map Google zniknął stary, nieaktualny profil mojej kancelarii, a ja w końcu mam spokój. Polecam każdemu, kto ceni sobie porządek w sieci i profesjonalną obsługę."
    },
    {
      name: "Karolina Walentowicz",
      text: "Prowadzę sklep internetowy z rękodziełem i kilka nieprawdziwych komentarzy mocno uderzyło w moją sprzedaż. Wizaro nie tylko pomogło mi usunąć te opinie, ale też zaproponowało kilka kroków, jak lepiej chronić markę w przyszłości. To nie tylko firma, która działa, ale też edukuje i wspiera."
    },
    {
      name: "Zbigniew Rutka",
      text: "Mam 58 lat, jestem technikiem budowlanym. Z internetu korzystam raczej sporadycznie, ale kiedy ktoś wystawił fałszywą opinię o mojej działalności gospodarczej, musiałem działać. Córka znalazła Wizaro i to był strzał w dziesiątkę. Spokojnie, rzeczowo i bardzo skutecznie zajęli się wszystkim."
    },
    {
      name: "Danuta Kamińska",
      text: "Prowadzę biuro rachunkowe i bardzo dbam o swoją reputację. Niestety pewien anonimowy klient zostawił kłamliwe komentarze, co zaszkodziło mi w relacjach z nowymi firmami. Wizaro bardzo pomogło – wszystko odbyło się profesjonalnie, a kontakt z zespołem był szybki i rzetelny. Polecam z całego serca."
    },
    {
      name: "Kamil Mazurek",
      text: "Jestem freelancem, robię strony internetowe. Zdarzyło się, że ktoś opublikował mój numer telefonu i nazwę działalności na portalu, którego nie znałem – a potem poleciały opinie, jakich nie wystawił żaden z moich klientów. Wizaro zadziałało błyskawicznie. Po tygodniu nie było śladu po tej stronie."
    },
    {
      name: "Ewa Sawicka",
      text: "Mam 38 lat, prowadzę studio jogi w małym mieście. Gdy zaczęły pojawiać się nieprzychylne opinie, pomyślałam, że to może zniechęcić nowe osoby. Na szczęście trafiłam na Wizaro. W ciągu kilku dni komentarze zniknęły, a ja poczułam ogromną ulgę. Polecam każdemu właścicielowi małego biznesu."
    },
    {
      name: "Józef Baran",
      text: "Po 60-tce trudno nadążyć za internetem, ale dzięki Wizaro udało mi się pozbyć fałszywego profilu mojej firmy z Aleo. Szczerze mówiąc, nie wiedziałem nawet, że coś takiego tam istnieje. Na szczęście oni się wszystkim zajęli, wyjaśnili mi, jak działa ten proces i doprowadzili sprawę do końca."
    },
    {
      name: "Aleksandra Kruczek",
      text: "Jako dietetyczka buduję swoją markę w oparciu o zaufanie. Kiedy pojawiła się obraźliwa i nieprawdziwa opinia w serwisie Gowork, poczułam się bezradna. Wizaro nie tylko usunęło wpis, ale też doradziło, jak reagować na takie sytuacje. Cała współpraca przebiegła wzorowo, z pełną empatią i kulturą."
    },
    {
      name: "Wiktor Śliwa",
      text: "Mam 42 lata, wykształcenie zawodowe, prowadzę serwis AGD. Jakiś czas temu konkurencja zaczęła publikować negatywne opinie na różnych stronach. Zgłosiłem się do Wizaro i nie żałuję. Przez cały czas byłem informowany o postępach, a ekipa zna się na rzeczy – wiedzą, gdzie i jak działać, żeby to usunąć."
    },
    {
      name: "Natalia Bednarska",
      text: "Jako młoda przedsiębiorczyni buduję swoją markę od podstaw i każde nieuczciwe działanie w sieci bardzo mnie boli. Wizaro stanęło na wysokości zadania. Usunęli mój profil z map Google, który był tworzony bez mojej zgody, i zajęli się także kilkoma opiniami, które mogły wpłynąć negatywnie na moją działalność."
    },
    {
      name: "Zdzisław Wójtowicz",
      text: "Jestem stolarzem z 30-letnim doświadczeniem. Nigdy nie przypuszczałem, że będę musiał walczyć z fałszywymi opiniami w internecie. Syn znalazł Wizaro i załatwili sprawę za mnie. Kontakt świetny, wszystko wyjaśnione krok po kroku, a po kilkunastu dniach negatywy zniknęły. Takich firm potrzeba więcej."
    },
    {
      name: "Grażyna Opolska",
      text: "Mam małą cukiernię i każda opinia w internecie jest dla mnie na wagę złota. Kiedy pojawiły się nieprawdziwe komentarze, wiedziałam, że muszę działać szybko. Zgłosiłam się do Wizaro i zostałam potraktowana bardzo profesjonalnie. Obsługa była cierpliwa, wszystko mi tłumaczyli i osiągnęli świetny rezultat."
    },
    {
      name: "Andrzej Pasiak",
      text: "Jestem elektrykiem z wykształcenia i przez wiele lat pracowałem na własną markę. Niestety padłem ofiarą hejtu, co odbiło się na zleceniach. Dzięki Wizaro udało się usunąć wpisy z Goworka i Aleo. Teraz moja firma wróciła na właściwe tory. Polecam każdemu fachowcowi, który nie wie, jak walczyć z tym samemu."
    },
    {
      name: "Maria Kubicka",
      text: "Mam 61 lat i prowadzę kwiaciarnię. Jakiś czas temu pojawiły się w internecie nieprawdziwe opinie o moim sklepie. Nie wiedziałam, co z tym zrobić. Córka poleciła mi Wizaro i jestem im bardzo wdzięczna. Wszystko odbyło się spokojnie, profesjonalnie i skutecznie. Czułam się zaopiekowana na każdym kroku."
    }
  ];

  const [randomReviews, setRandomReviews] = useState<typeof reviews>([]);

  useEffect(() => {
    const shuffled = [...reviews].sort(() => 0.5 - Math.random());
    setRandomReviews(shuffled.slice(0, 2));
  }, []); // ← cleaned up

  if (randomReviews.length === 0) return null;

  return (
    <section className="mx-auto w-full px-4 md:px-6 py-10">
      <h2 className="text-lg font-semibold text-center text-gray-800 mb-8">Opinie użytkowników</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {randomReviews.map((review, idx) => (
          <div key={idx} className="border w-full border-gray-200 rounded-lg p-4 bg-white shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-sm font-bold text-[#002a5c]">
                {review.name?.[0] || "?"}
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
