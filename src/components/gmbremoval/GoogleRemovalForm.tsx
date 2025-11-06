"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

import GoogleRemovalFormStepOne from "@/components/gmbremoval/GoogleRemovalFormStepOne";
import CompanyProfileFormStep from "@/components/formSteps/CompanyProfileFormStep";
import PayerFormStep from "@/components/formSteps/PayerFormStep";
import SummaryStepGoogleProfile from "@/components/formSteps/SummaryStepGoogleProfile"; // Nowy komponent
import SocialProof from "../SocialProof";
import CompanyProfileFormExplenation from "../Explenations/CompanyProfileFormStepExplenation";
import GoogleRemovalFormStepExplenation from "../Explenations/GoogleRemovalFormStepExplenation";
import GoogleResetFormExplanation from "../Explenations/GoogleResetFormExplanation";
import PaymentExplanation from "../Explenations/PaymentExplanation";
import ExplenationProfileRemoval from "../ExplenationProfileRemoval";
import GuaranteeSection from "../GuaranteeSection";
import UseCaseSection from "../UseCaseSection";

interface Removal {
  companyName: string;
  nip: string;
  url: string;
  // Additional PlaceDetails data for the summary
  address?: string;
  phoneNumber?: string;
  website?: string;
  photos?: string[];
  rating?: number;
  businessStatus?: string;
  types?: string[];
}

interface CompanyData {
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  nip: string;
  phone: string;
  url: string;
  street: string;
  city: string;
  zip: string;
  different_payer: boolean;
}

interface PayerData {
  name: string;
  company_name?: string;
  email: string;
  nip?: string;
  street: string;
  zip: string;
  city: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function GoogleRemovalForm() {
  const searchParams = useSearchParams();
  
  const defaultCompany: CompanyData = {
    name: "",
    first_name: "",
    last_name: "",
    email: "",
    nip: "",
    phone: "",
    url: "",
    street: "",
    city: "",
    zip: "",
    different_payer: false,
  };

  const [removals, setRemovals] = useState<Removal[]>([
    { 
      companyName: "", 
      nip: "", 
      url: "",
      address: undefined,
      phoneNumber: undefined,
      website: undefined,
      photos: undefined,
      rating: undefined,
      businessStatus: undefined,
      types: undefined
    },
  ]);

  const [company, setCompany] = useState<CompanyData>(defaultCompany);
  const [payer, setPayer] = useState<PayerData | undefined>(undefined);
  const [payerId, setPayerId] = useState<string | undefined>(undefined);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [step, setStep] = useState<"removal" | "company" | "payer" | "summary">("removal");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollArrow, setShowScrollArrow] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  
  // Intersection observer to detect when explanation section is visible
  const { ref: explanationRef, inView: explanationInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Show scroll arrow on mobile devices only when explanation is not in view
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Show arrow after a short delay to allow page to load
      const timer = setTimeout(() => {
        setShowScrollArrow(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Process URL parameters if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      
      const businessName = params.get('businessName');
      const googleMapsUrl = params.get('googleMapsUrl');
      const address = params.get('address');
      const phone = params.get('phone');
      // Pobranie dodatkowych parametrów (nie są używane bezpośrednio tutaj, ale są przekazywane przez URL)
      // const website = params.get('website');
      // const rating = params.get('rating');
      // const userRatingsTotal = params.get('userRatingsTotal');
      
      if (businessName && googleMapsUrl) {
        // Update the removals array with data from URL
        setRemovals([
          { 
            companyName: businessName, 
            nip: "", 
            url: googleMapsUrl,
            address: address || undefined,
            phoneNumber: phone || undefined,
            website: undefined,
            photos: undefined,
            rating: undefined,
            businessStatus: undefined,
            types: undefined
          }
        ]);
        
        // Update company information
        setCompany(prevCompany => ({
          ...prevCompany,
          name: businessName,
          url: googleMapsUrl,
          street: address || "",
          phone: phone || ""
        }));
      }
    }
  }, []);
  
  // Hide arrow when explanation is in view
  useEffect(() => {
    if (explanationInView) {
      setShowScrollArrow(false);
    }
  }, [explanationInView]);

  // Check for reset parameter in URL and set the mode accordingly
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const resetParam = searchParams.get('reset');
      if (resetParam === 'true') {
        localStorage.setItem("profileOperationMode", "reset");
        localStorage.setItem("serviceDescription", "Resetowanie wizytówki Google Business");
        setIsResetMode(true);
      } else {
        // If no reset parameter, check if we should set removal mode
        const currentMode = localStorage.getItem("profileOperationMode");
        if (!currentMode) {
          localStorage.setItem("profileOperationMode", "removal");
          localStorage.setItem("serviceDescription", "Usuwanie wizytówki Google Business");
        }
      }
    }
  }, [searchParams]);

  useEffect(() => {
    // Check if window is defined (client-side only)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("companyFormRemovalData");
      if (saved) setCompany(JSON.parse(saved));
      
      // Check if there's a stored mode (reset or removal)
      const storedMode = localStorage.getItem("profileOperationMode");
      const serviceDescription = localStorage.getItem("serviceDescription");
      
      if (storedMode) {
        // This data will be used by the summary and other components
        console.log("Service mode:", storedMode);
        console.log("Service description:", serviceDescription);
      }
    }
  }, []);

  useEffect(() => {
    // Check if window is defined (client-side only)
    if (typeof window !== 'undefined') {
      localStorage.setItem("companyFormRemovalData", JSON.stringify(company));
    }
  }, [company]);

  // USUNIĘTO: beforeunload listener, który usuwał dane przy opuszczaniu strony
  // useEffect(() => {
  //   // Check if window is defined (client-side only)
  //   if (typeof window !== 'undefined') {
  //     const cleanup = () => localStorage.removeItem("companyFormRemovalData");
  //     window.addEventListener("beforeunload", cleanup);
  //     return () => window.removeEventListener("beforeunload", cleanup);
  //   }
  // }, []);

  // Monitor localStorage for reset mode changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkResetMode = () => {
        const resetMode = localStorage.getItem("profileOperationMode") === "reset";
        setIsResetMode(resetMode);
      };
      
      // Check initially
      checkResetMode();
      
      // Listen for storage changes
      window.addEventListener("storage", checkResetMode);
      
      // Also check periodically since storage event doesn't fire on same window
      const interval = setInterval(checkResetMode, 500);
      
      return () => {
        window.removeEventListener("storage", checkResetMode);
        clearInterval(interval);
      };
    }
  }, []);

  const calculatePriceForLink = (url: string): number => {
    // Check if we're in reset mode (stored in localStorage)
    const isResetMode = typeof window !== 'undefined' && localStorage.getItem("profileOperationMode") === "reset";
    
    // For reset mode, return 2199 zł (219900 in cents)
    if (isResetMode) {
      return 219900;
    }
    
    // Regular removal price calculation
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes("map") || lowerUrl.includes("google") || lowerUrl.includes("goo") ||  lowerUrl.includes("g.co") ) {
      return 129900;
    }
    if (
      lowerUrl.includes("gowork") ||
      lowerUrl.includes("aleo") ||
      lowerUrl.includes("panorama") ||
      lowerUrl.includes("pkt")
    ) {
      return 129900;
    }
    return 129900;
  };

  const totalPrice = removals.reduce((sum, r) => sum + calculatePriceForLink(r.url), 0);
  const displayPrice = totalPrice / 100;

  const handleRemovalChange = useCallback((index: number, field: keyof Removal, value: string | string[] | number | undefined) => {
    const updated = [...removals];
    (updated[index] as Record<keyof Removal, string | string[] | number | undefined>)[field] = value;
    setRemovals(updated);
  }, [removals]);

  const handleModeChange = useCallback((newIsResetMode: boolean) => {
    setIsResetMode(newIsResetMode);
    // Also update localStorage immediately for consistency
    localStorage.setItem("profileOperationMode", newIsResetMode ? "reset" : "removal");
  }, []);

  const addRemoval = () => {
    // Pobierz NIP z poprzedniego profilu (ostatniego na liście)
    const previousNip = removals.length > 0 ? removals[removals.length - 1].nip : "";
    
    setRemovals([...removals, { 
      companyName: "", 
      nip: previousNip, 
      url: "",
      address: undefined,
      phoneNumber: undefined,
      website: undefined,
      photos: undefined,
      rating: undefined,
      businessStatus: undefined,
      types: undefined
    }]);
    setExpandedIndex(removals.length);
  };

  const removeRemoval = (index: number) => {
    setRemovals(removals.filter((_, i) => i !== index));
    if (expandedIndex === index) setExpandedIndex(0);
  };

  // New: Only save to Supabase, no payment logic
  const confirmAndSave = async () => {
    // Final validation check - make sure at least one profile is selected
    if (!removals.some(r => r.companyName && r.url)) {
      alert('Nie wybrano żadnego profilu do usunięcia. Proszę wrócić do pierwszego kroku.');
      setStep("removal");
      return;
    }
    
    setIsLoading(true);
    try {
      let currentPayerId: string | undefined;

      if (company.different_payer && payer) {
        const payerRes = await fetch("/api/invoice-payers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payer),
        });
        if (!payerRes.ok) throw new Error("Błąd zapisu danych płatnika");
        const payerData = await payerRes.json();
        currentPayerId = payerData.payer_id;
      } else {
        const companyAsPayer: PayerData = {
          name: `${company.first_name} ${company.last_name}`,
          company_name: company.name,
          email: company.email,
          nip: company.nip,
          street: company.street,
          zip: company.zip,
          city: company.city,
        };
        const payerRes = await fetch("/api/invoice-payers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(companyAsPayer),
        });
        if (!payerRes.ok) throw new Error("Błąd zapisu danych firmy jako płatnika");
        const payerData = await payerRes.json();
        currentPayerId = payerData.payer_id;
      }

      setPayerId(currentPayerId);

      const res = await fetch("/api/company-profile-removal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, removals, totalPrice, payer_id: currentPayerId }),
      });
      if (!res.ok) throw new Error("Błąd zapisu danych firmy i zgłoszeń");
      const data = await res.json();
      const company_id = data.company_id;
      
      const docRes = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_id,
          type: "żądanie usunięcia profilu",
          payer_id: currentPayerId,
          totalPrice: totalPrice,
          items: removals.map(removal => ({
            url: removal.url,
            name: removal.companyName,
            nip: removal.nip,
            price: calculatePriceForLink(removal.url)
          }))
        }),
      });
      if (!docRes.ok) throw new Error("Błąd tworzenia dokumentu");

      // Wysłanie emaila z potwierdzeniem zamówienia
      try {
        const emailRes = await fetch("/api/send-profile-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company: company,
            profiles: removals,
            totalPrice: totalPrice / 100, // w złotych
            orderId: company_id,
          }),
        });
        
        if (emailRes.ok) {
          console.log("✅ Email z potwierdzeniem wysłany pomyślnie");
        } else {
          console.error("⚠️ Nie udało się wysłać emaila z potwierdzeniem");
        }
      } catch (emailError) {
        console.error("❌ Błąd wysyłki emaila z potwierdzeniem:", emailError);
        // Nie przerywamy procesu - email to dodatkowa funkcja
      }

      // Zapisz pełne dane do localStorage przed przekierowaniem (potrzebne dla payment form)
      if (typeof window !== 'undefined') {
        localStorage.setItem("companyFormRemovalData", JSON.stringify({
          company: company,
          removals: removals,
          totalPrice: totalPrice / 100, // w złotych
          company_id: company_id
        }));
      }
      
      // Przekierowanie na stronę thankyou z parametrami płatności
      const priceInZloty = Math.round(totalPrice / 100); // konwersja z groszy na złote
      const searchParams = new URLSearchParams({
        amount: priceInZloty.toString(),
        description: 'Płatność za usuwanie profilu Google'
      });
      
      window.location.href = `/thankyou?${searchParams.toString()}`;
    } catch (error) {
      console.error("❌ confirmAndSave error:", error);
      alert("Wystąpił błąd. Spróbuj ponownie.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto min-h-screen "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="md:flex px-2 md:px-4 py-2 md:py-10 md:gap-8" variants={fadeInUp}>
        <motion.div className="md:w-1/2 mb-10 md:mb-0" variants={fadeInUp}>
          <div className="bg-white rounded-xl shadow-sm md:shadow-lg md:p-8 p-4 w-full space-y-6">
            {step === "removal" && (
              <GoogleRemovalFormStepOne
                removals={removals}
                expandedIndex={expandedIndex}
                isResetMode={isResetMode}
                onChange={handleRemovalChange}
                onAdd={addRemoval}
                onRemove={removeRemoval}
                onExpand={(index) => setExpandedIndex(expandedIndex === index ? -1 : index)}
                onModeChange={handleModeChange}
                onSubmit={(e) => {
                  e.preventDefault();
                  // Double-check that at least one profile is selected
                  if (!removals.some(r => r.companyName && r.url)) {
                    alert('Wybierz przynajmniej jeden profil, aby kontynuować.');
                    return;
                  }
                  setStep("company");
                }}
              />
            )}

            {step === "company" && (
              <CompanyProfileFormStep
                company={company}
                onChange={(e) =>
                  setCompany({ ...company, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value })
                }
                onSubmit={() => {
                  // Sprawdź, czy istnieje przynajmniej jeden wybrany profil
                  if (!removals.some(r => r.companyName && r.url)) {
                    alert('Nie wybrano żadnego profilu do usunięcia. Proszę wrócić do pierwszego kroku.');
                    return;
                  }
                  setStep(company.different_payer ? "payer" : "summary");
                }}
                onBack={() => setStep("removal")}
                reviewCount={removals.length}
                totalPrice={displayPrice}
              />
            )}

            {step === "payer" && payer && (
              <PayerFormStep
                payer={payer}
                onChange={(e) => setPayer({ ...payer, [e.target.name]: e.target.value })}
                onSubmit={() => {
                  // Sprawdź, czy istnieje przynajmniej jeden wybrany profil
                  if (!removals.some(r => r.companyName && r.url)) {
                    alert('Nie wybrano żadnego profilu do usunięcia. Proszę wrócić do pierwszego kroku.');
                    return;
                  }
                  setStep("summary");
                }}
                onBack={() => setStep("company")}
              />
            )}

            {step === "summary" && (
              <SummaryStepGoogleProfile
                company={company}
                profiles={removals.map((removal) => ({
                  companyName: removal.companyName,
                  nip: removal.nip,
                  url: removal.url,
                  address: removal.address,
                  phoneNumber: removal.phoneNumber,
                  website: removal.website,
                  photos: removal.photos,
                  rating: removal.rating,
                  businessStatus: removal.businessStatus,
                  types: removal.types,
                }))}
                totalPrice={displayPrice}
                isLoading={isLoading}
                onBack={() => (company.different_payer ? setStep("payer") : setStep("company"))}
                onConfirm={confirmAndSave}
                payer={payer}
                payer_id={payerId}
              />
            )}
          </div>
        </motion.div>

        <motion.div
          className="md:w-1/2"
          variants={fadeInUp}
          initial="visible"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {step === "company" ? (
            <CompanyProfileFormExplenation />
          ) : step === "removal" ? (
            isResetMode ? <GoogleResetFormExplanation /> : <GoogleRemovalFormStepExplenation />
          ) : step === "summary" ? (
            <PaymentExplanation />
          ) : null}
        </motion.div>
      </motion.div>

      <motion.div
        className="md:flex justify-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <GuaranteeSection />
      </motion.div>

       <motion.div
        className="md:flex justify-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <UseCaseSection />
      </motion.div>

      <motion.div
        id="explanation-section"
        className="md:flex md:gap-8"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        ref={explanationRef}
      >
        <ExplenationProfileRemoval />
      </motion.div>

      <motion.div
        className="md:flex py-1 m-4 mt-10 md:gap-8"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <SocialProof />
      </motion.div>
      
      {/* Scroll Down Arrow - Only shows on mobile when explanations are not in view */}
      <AnimatePresence>
        {showScrollArrow && !explanationInView && (
          <motion.button
            className="fixed bottom-6 right-6 z-50 bg-[#0D2959] text-white rounded-full p-3 shadow-lg md:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              // Create an ID for the explanation section so we can scroll to it
              const explanationElement = document.getElementById('explanation-section');
              if (explanationElement) {
                explanationElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            aria-label="Przewiń do wyjaśnień"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 animate-bounce" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}