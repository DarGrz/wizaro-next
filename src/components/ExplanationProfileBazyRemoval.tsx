import React from 'react';

const ExplanationProfileBazyRemoval = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Jak usuwamy wizytówki z baz danych?</h2>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0">
            <span className="w-8 h-8 flex items-center justify-center font-bold text-blue-800">1</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Zbieramy niezbędne informacje</h3>
            <p className="text-gray-700">
              Potrzebujemy podstawowych danych firmy oraz informacji o bazach, z których chcesz usunąć wizytówkę.
              Dzięki integracji z rejestrem REGON możemy automatycznie pobrać część danych po podaniu NIP.
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0">
            <span className="w-8 h-8 flex items-center justify-center font-bold text-blue-800">2</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Przygotowujemy formalny wniosek</h3>
            <p className="text-gray-700">
              Na podstawie zebranych informacji przygotowujemy formalny wniosek o usunięcie danych, 
              powołując się na odpowiednie przepisy RODO oraz inne regulacje prawne.
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0">
            <span className="w-8 h-8 flex items-center justify-center font-bold text-blue-800">3</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Wysyłamy wniosek do administratora bazy</h3>
            <p className="text-gray-700">
              Kierujemy wniosek bezpośrednio do administratora bazy danych, wykorzystując sprawdzone kanały 
              komunikacji, które zwiększają skuteczność procesu.
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0">
            <span className="w-8 h-8 flex items-center justify-center font-bold text-blue-800">4</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Monitorujemy proces</h3>
            <p className="text-gray-700">
              Śledzimy postępy w realizacji wniosku i w razie potrzeby wysyłamy ponaglenia. Informujemy Cię 
              na bieżąco o statusie sprawy.
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0">
            <span className="w-8 h-8 flex items-center justify-center font-bold text-blue-800">5</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Potwierdzamy usunięcie</h3>
            <p className="text-gray-700">
              Po usunięciu wizytówki dostarczamy potwierdzenie zakończenia procesu oraz, jeśli to możliwe, 
              dokumentację potwierdzającą usunięcie danych.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-yellow-800 font-medium">
          Pamiętaj: Proces usuwania wizytówek może być czasochłonny i wymagać kilkukrotnej komunikacji 
          z administratorem bazy. Dzięki naszemu doświadczeniu i formalnej ścieżce znacznie zwiększamy 
          szanse na skuteczne usunięcie niechcianej wizytówki.
        </p>
      </div>
    </div>
  );
};

export default ExplanationProfileBazyRemoval;
