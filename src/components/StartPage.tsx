//StartPage.tsx

"use client";

import BusinessTypeSelector from "./BusinessTypeSelector";
import BusinessTypeSelectorCTA from "./BusinessTypeSelectorCTA";
import CaseStudies from "./CaseStudies";
import ExplenationStartPage from "./ExplenationStartPage";
import FaqSection from "./FaqSection";
import ForWhom from "./ForWhom";
import GuaranteeSection from "./GuaranteeSection";
import ServiceComparisonTable from "./ServiceComparisonTable";
import SocialProof from "./SocialProof";
import WhyTrustUs from "./WhyTrustUs";
import Link from "next/link";




export default function StartPage() {
  return (
    <div className="min-h-screen mx-auto flex items-center justify-center px-4 flex-col max-w-4xl pt-20">
      <div className="gap-6 mb-6 lg:flex">
        <div className="md:p-10 p-4 w-full max-w-lg md:border-e border-gray-200 md:border-b ">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-4 ">
            Pomagamy chronić wizerunek Twojej firmy
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Szybko i dyskretnie usuniemy informacje o Twojej firmie – legalnie i bez zbędnych komplikacji. Wystarczy, że wypełnisz prosty formularz. Płatność następuje dopiero po wykonaniu usługi.
          </p>
          
        </div>

        <BusinessTypeSelector />
      </div>

      

      <div className="md:flex py-10 md:gap-8 ">
        <GuaranteeSection />
      </div>

      {/* CTA telefoniczne */}
          <div className="flex flex-col items-center gap-2 mt-6">
            <p className="text-center text-gray-700 font-bold">
              Zadzwoń jeśli masz pytania lub potrzebujesz pomocy
            </p>
            <Link href="tel:+48792861513" className="mx-auto mt-2">
              <button className="bg-[#3EA34B] text-white px-6 py-2 rounded font-semibold hover:bg-[#3EA34B] transition">
                792 861 513
              </button>
            </Link>
          </div>

      <div className="md:flex py-10 md:gap-8 ">
        <ExplenationStartPage />
      </div>
      
      <div className="md:flex py-10 md:gap-8 ">
        <WhyTrustUs />
      </div>
      
      <div className="md:flex py-10 md:gap-8 ">
        <ServiceComparisonTable />
      </div>
      
      <div className="md:flex py-10 md:gap-8 ">
        <CaseStudies />
      </div>
      
      <div className="md:flex py-10 md:gap-8 ">
        <BusinessTypeSelectorCTA />
      </div>
      <div className="md:flex py-10 md:gap-8 ">
        <SocialProof />
      </div>
      <div className="md:flex py-10 md:gap-8 ">
        <ForWhom />
      </div>
      <div className="md:flex py-10 md:gap-8 ">
        <BusinessTypeSelectorCTA />
      </div>
      <div className="md:flex py-10 md:gap-8 ">
        <FaqSection />
      </div>
    </div>
  );
}
