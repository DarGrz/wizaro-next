"use client";


export default function UseCaseSectionClean() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12">
      <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6 md:mb-10">
        Historie naszych klientów
      </h2>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          
          <div className="p-6 md:w-2/3">
            <div className="flex items-center mb-4">
              <div className="text-[#0D2959] mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Problem w restauracji</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
             &quot;Prowadzę restaurację w centrum Warszawy. Po konflikcie z byłym pracownikiem, w ciągu kilku dni otrzymaliśmy 15 negatywnych recenzji, które zaniżyły naszą ocenę z 4.8 do 3.2. Pomimo zgłoszeń do Google, recenzje nie zostały usunięte.&quot;
            </p>
            
            <div className="border-l-4 border-[#5DA157] pl-4 py-1 mb-4 bg-[#5DA157]/5">
              <p className="text-gray-700 font-medium">
                Wizaro usunęło profil w ciągu 6 dni roboczych, co pozwoliło mi utworzyć nowy, czysty profil Google.
              </p>
            </div>
            
            <div className="flex items-center justify-between">              <div className="flex items-center">
                <span className="text-sm text-gray-500">Adam Nowak, Właściciel</span>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#5DA157]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
