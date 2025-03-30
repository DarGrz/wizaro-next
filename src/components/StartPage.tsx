//StartPage.tsx

"use client";

import BusinessTypeSelector from "./BusinessTypeSelector";
import BusinessTypeSelectorCTA from "./BusinessTypeSelectorCTA";
import ExplenationStartPage from "./ExplenationStartPage";
import FaqSection from "./FaqSection";
import GuaranteeSection from "./GuaranteeSection";
import SocialProof from "./SocialProof";

export default function StartPage() {
  return (
    <div className="min-h-screen mx-auto flex items-center justify-center px-4 flex-col max-w-4xl pt-20">
      <div className="gap-6 mb-6 lg:flex">
        <div className="md:p-10 p-4 w-full max-w-lg md:border-e border-gray-200 md:border-b ">
          <h1 className="text-3xl font-semibold text-center text-gray-900 mb-4">
            Pomagamy chronić wizerunek Twojej firmy
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Szybko pozbędziesz się informacji o swojej firmie. Bez zbędnych
            komplikacji, w pełni legalnie i dyskretnie. Wystarczy wypełnić
            prosty formularz, resztą zajmie się system.
          </p>
        </div>

        <BusinessTypeSelector />
      </div>

      

      <div className="md:flex py-10 md:gap-8 ">
        <ExplenationStartPage />
      </div>
      <div className="md:flex py-10 md:gap-8 ">
        <GuaranteeSection />
      </div>
      <div className="md:flex py-10 md:gap-8 ">
        <BusinessTypeSelectorCTA />
      </div>
      <div className="md:flex py-10 md:gap-8 ">
        <SocialProof />
      </div>
      <div className="md:flex py-10 md:gap-8 ">
        <FaqSection />
      </div>
    </div>
  );
}
