'use client';

import Image from 'next/image';

export default function WhoWeAre() {
  return (
    <section className="text-gray-800 p-6 rounded-xl max-w-2xl mx-auto text-sm bg-white shadow">
      <div className="text-xl sm:text-md text-center font-semibold border-b border-gray-200 rounded p-4 mb-6">
        Usuwając profil z negatywnymi opiniami poprawiasz wizerunek firmy i zwiększasz jej wiarygodność.
      </div>

      <div className="flex flex-col flex-row items-center gap-4 mb-6">
        <div className=" overflow-hidden  ">
          <Image
            src="/images/profilowe-png-1.webp"
            alt="Darek – właściciel"
            width={200}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="text-md text-gray-700">
          <p><strong>Cześć! Mam na imię Darek.</strong></p>
          <p>
            Dopilnuję, aby Twoje zlecenie zostało zrealizowane szybko i bezproblemowo.
            Działamy legalnie, zgodnie z przepisami RODO, i wystawiamy faktury VAT.
          </p>
        </div>
      </div>

      <div className="text-center text-gray-700 text-sm mt-4 mb-6">
        <p className="mb-2">
          Masz pytania przed zakupem lub potrzebujesz wyjaśnienia jak działa usługa?
        </p>
        <p className="font-semibold">
          Zadzwoń: <a href="tel:+48792861513" className="text-[#002a5c] hover:underline">+48 792 861 513</a>
        </p>
        <p className="text-xs text-gray-500 mt-1">Dostępny od poniedziałku do piątku, 9:00–17:00</p>
      </div>

      <div className="text-center text-gray-500 text-xs border-t pt-4 mt-6">
        NIP: 6782978644<br />
        Kraków, 31-636
      </div>
    </section>
  );
}
