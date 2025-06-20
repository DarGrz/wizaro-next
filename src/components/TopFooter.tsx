'use client';

import Image from 'next/image';

export default function TopFooter() {
    return (
      <div className="w-full text-gray-900 border-t bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-5">            
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
              <Image
                src="/images/profilowe-png-1.webp"
                alt="Dariusz Grzegorczyk – właściciel"
                width={80}
                height={80}
                className="object-cover w-full h-full object-[center_-10%]"
              />
            </div>
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-base mb-1">Dariusz Grzegorczyk</h4>
              <p className="text-sm text-gray-600">Właściciel Wizaro.pl</p>
              <p className="text-sm text-gray-600 mt-1">NIP: 678-297-86-44</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
            <div>
              <p className="font-medium text-gray-900 mb-1">Dostępność:</p>
              <p className="text-gray-600">Przyjmujemy zlecenia<br/>przez całą dobę</p>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">Kontakt:</p>
              <a href="tel:+48792861513" className="text-[#002a5c] hover:underline block">
                +48 792 861 513
              </a>
              <a href="mailto:kontakt@wizaro.pl" className="text-[#002a5c] hover:underline">
                kontakt@wizaro.pl
              </a>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">Adres:</p>
              <p className="text-gray-600">Mistrzejowice<br/>Kraków 31-636</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  