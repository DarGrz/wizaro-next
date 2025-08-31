//StartPage.tsx

"use client";

import BusinessTypeSelector from "./BusinessTypeSelector";
import CaseStudies from "./CaseStudies";
import ExplenationStartPage from "./ExplenationStartPage";
import FaqSection from "./FaqSection";
import ForWhom from "./ForWhom";
import GoogleBusinessRemoval from "./GoogleBusinessRemoval";
import GoogleBusinessReset from "./GoogleBusinessReset";
import GuaranteeSection from "./GuaranteeSection";
import ServiceComparisonTable from "./ServiceComparisonTable";
import SocialProof from "./SocialProof";
import WhyTrustUs from "./WhyTrustUs";
import WhyRemoveProfilesAndReviews from "./WhyRemoveProfilesAndReviews";
import Link from "next/link";
import MobileActionButton from "./MobileActionButton";
import NegativeReviewRemoval from "./NegativeReviewRemoval";
import BusinessTypeSelectorMobile from "./BusinessTypeSelectorMobile";



export default function StartPage() {
  return (
    <div className="min-h-screen mx-auto flex items-center justify-center px-4 flex-col max-w-4xl pt-10 ">
      {/* Przycisk mobilny */}
      <MobileActionButton />
      
      <div className="gap-6 mb-4 lg:flex hidden md:block">
        <div className="md:p-10 p-4 w-full max-w-lg mt-4 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4 ">
          Ochrona Wizerunku Online
          </h1>
          <p className="text-gray-600 text-center mb-8">
                 Skutecznie usuwamy szkodliwe informacje z Map Google, GoWork, Aleo i innych serwisów. Płatność następuje dopiero po wykonaniu usługi.
          </p>
          
        </div>

        <BusinessTypeSelector />
      </div>

      

      <div className=" md:gap-8 pt-5 w-full md:hidden block">
        <BusinessTypeSelectorMobile />
      </div>

      <div className="md:flex  md:gap-8 pt-5 ">
        <GuaranteeSection />
      </div>
   

      {/* Sekcja usuwania firmy z Google */}
      <div className="md:flex py-5 mb-15 md:gap-8">
        <GoogleBusinessRemoval />
      </div>

      {/* Sekcja resetowania wizytówki Google */}
      <div className="md:flex py-5 md:gap-8 mb-10">
        <GoogleBusinessReset />
      </div>

         <div className="md:flex py-5 mb-15 md:gap-8 ">
        <NegativeReviewRemoval />
      </div>

      {/* Separator */}
      <div className="w-full flex items-center justify-center py-4">
        <div className="w-1/4 h-px bg-gray-200"></div>
        <div className="mx-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#002a5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 16v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h2m9-4h-9a2 2 0 0 0-2 2v9" />
            <circle cx="17" cy="5" r="3" />
            <path d="M12 12.5l3.5 3.5l6.5-6.5" />
          </svg>
        </div>
        <div className="w-1/4 h-px bg-gray-200"></div>
      </div>

    

      {/* CTA telefoniczne */}
          <div className="flex flex-col items-center gap-2 mt-6">
            <p className="text-center text-gray-700 font-bold">
              Zadzwoń jeśli masz pytania lub potrzebujesz pomocy
            </p>
            <Link href="tel:+48792861513" className="mx-auto mt-2">
              <button className="bg-[#5BA155] text-white px-6 py-2 rounded font-semibold hover:bg-[#5BA155] transition">
                +48 792 861 513
              </button>
            </Link>
          </div>

      <div className="md:flex py-10 md:gap-8 ">
        <ExplenationStartPage />
      </div>

       <div className="md:flex py-10 md:gap-8 w-full ">
        <BusinessTypeSelector />
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
      
      <div className="md:flex py-10 md:gap-8 w-full ">
        <BusinessTypeSelector />
      </div>
      <div className="md:flex py-10 md:gap-8 ">
        <SocialProof />
      </div>
      <div className="md:flex py-10 md:gap-8 ">
        <ForWhom />
      </div>
     
            <div className="md:flex py-10 md:gap-8 ">
        <WhyRemoveProfilesAndReviews />
      </div>

       <div className="md:flex py-10 md:gap-8  w-full">
        <BusinessTypeSelector/>
      </div>
      
      <div className="md:flex py-10 md:gap-8 ">
        <FaqSection />
      </div>
    </div>
  );
}