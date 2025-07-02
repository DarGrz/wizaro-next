"use client";

import React from "react";
import Image from "next/image";

export default function CaseStudies() {
  const caseStudies = [
    {
      id: 1,
      title: "Restauracja „Bella Italia",
      problem: "Negatywne recenzje i fałszywy profil wpływały na spadek rezerwacji",
      solution: "Usunięcie fałszywego profilu i 4 negatywnych opinii",
      results: [
        "Wzrost liczby telefonicznych rezerwacji o 45%",
        "Zwiększenie liczby odwiedzających restaurację o 32%",
        "Poprawa ogólnej oceny z 3.2 na 4.7 gwiazdki"
      ],
      timeline: "14 dni",
      icon: "/window.svg"
    },
    {
      id: 2,
      title: "Salon Kosmetyczny „Beauty Expert",
      problem: "Konkurencja zamieszczała fałszywe negatywne opinie o salonie",
      solution: "Usunięcie 7 nieprawdziwych opinii i pomoc w budowaniu pozytywnego wizerunku",
      results: [
        "Zwiększenie liczby nowych klientów o 38%",
        "Wzrost rezerwacji online o 52%",
        "Powrót klientów, którzy wcześniej zrezygnowali z usług"
      ],
      timeline: "21 dni",
      icon: "/globe.svg"
    }
  ];

  return (
    <div className="w-full py-8 px-4">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Historie sukcesu naszych klientów
      </h2>
      
      <div className="space-y-6">
        {caseStudies.map((caseStudy) => (
          <div 
            key={caseStudy.id} 
            className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-3">
              <div className="bg-[#002a5c] p-2 rounded-full mr-3 flex-shrink-0">
                <Image src={caseStudy.icon} alt="Icon" width={20} height={20} className="invert" />
              </div>
              <h3 className="text-lg font-semibold leading-tight">{caseStudy.title}</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Problem</h4>
                <p className="mt-1 text-sm">{caseStudy.problem}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Rozwiązanie</h4>
                <p className="mt-1 text-sm">{caseStudy.solution}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Rezultaty</h4>
                <ul className="mt-1 space-y-1">
                  {caseStudy.results.map((result, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="text-[#5BA155] mr-2 flex-shrink-0">✓</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-500">Czas realizacji:</span>
                <span className="font-medium text-[#002a5c] text-sm">{caseStudy.timeline}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm px-2">
          Skontaktuj się z nami, aby dowiedzieć się, jak możemy pomóc w ochronie reputacji Twojej firmy
        </p>
      </div>
    </div>
  );
}
