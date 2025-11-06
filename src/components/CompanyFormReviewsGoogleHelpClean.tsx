"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import BusinessCardSelectionFormClean from "@/components/formSteps/BusinessCardSelectionFormClean";
import ContentFormGoogleClean from "@/components/formSteps/ContentFormGoogleClean";
import CompanyFormStepClean from "@/components/formSteps/CompanyFormStepClean";
import PayerFormStepClean from "@/components/formSteps/PayerFormStepClean";
import SummaryStepReviewFormClean from "@/components/formSteps/SummaryStepReviewFormClean";

import GoogleContentFormExplenationClean from "./Explenations/GoogleContentFormExplenationClean";
import CompanyContentRemovalFormExplenationClean from "./Explenations/CompanyContentRemovalFormExplenationClean";
import SocialProofClean from "./SocialProofClean";
import ContentRemovalSummaryExplenationClean from "./Explenations/ContentRemovalSummaryExplenationClean";
import PayerFormExplenationClean from "./Explenations/PayerFormExplenationClean";
import ExplenationContentRemovalClean from "./ExplenationContentRemovalClean";
import GuaranteeSectionClean from "./GuaranteeSectionClean";
import UseCaseSectionClean from "./UseCaseSectionClean";

interface ContentItem {
  author: string;
  content: string;
  url: string;
  date_added: string;
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

/**
 * CompanyFormReviewsGoogleClean - Component for handling the Google negative feedback removal process
 * 
 * Flow:
 * 1. Business card selection - User searches for and selects a Google Maps business profile
 * 2. Review selection - User adds negative feedback to be removed from the selected business card
 * 3. Company information - User enters their company details
 * 4. Payer information (optional) - User enters billing information if different from company
 * 5. Summary - User reviews all information before submission
 */
export default function CompanyFormReviewsClean() {
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

  const defaultPayer: PayerData = {
    name: "",
    company_name: "",
    email: "",
    nip: "",
    street: "",
    zip: "",
    city: "",
  };

  const [company, setCompany] = useState<CompanyData>(defaultCompany);
  const [payer, setPayer] = useState<PayerData>(defaultPayer);
  const [payerId, setPayerId] = useState<string | undefined>(undefined);
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    { author: "", content: "", url: "", date_added: "" },
  ]);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [step, setStep] = useState<"business-card" | "content" | "company" | "payer" | "summary">("business-card");
  const [isLoading, setIsLoading] = useState(false);
  const [contentEnabled, setContentEnabled] = useState(true);
  
  // New state for business card selection
  const [selectedBusinessCard, setSelectedBusinessCard] = useState<{
    name: string;
    googleMapsUrl: string;
  } | null>(null);

  // Pobierz status treści przy ładowaniu komponentu
  useEffect(() => {
    const fetchContentStatus = async () => {
      try {
        const response = await fetch('/api/reviews-settings');
        const data = await response.json();
        setContentEnabled(data.reviews_enabled);
      } catch (error) {
        console.error('Error fetching content status:', error);
      }
    };
    fetchContentStatus();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("companyFormData");
    if (saved) setCompany(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("companyFormData", JSON.stringify(company));
  }, [company]);

  // USUNIĘTO: beforeunload listener, który usuwał dane przy opuszczaniu strony
  // useEffect(() => {
  //   const cleanup = () => localStorage.removeItem("companyFormData");
  //   window.addEventListener("beforeunload", cleanup);
  //   return () => window.removeEventListener("beforeunload", cleanup);
  // }, []);

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const parsedValue = type === "checkbox" ? checked : value;
    setCompany({ ...company, [name]: parsedValue });
  };

  const handlePayerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayer({ ...payer, [name]: value });
  };

  const handleChange = (index: number, field: keyof ContentItem, value: string) => {
    const updated = [...contentItems];
    updated[index][field] = value;
    setContentItems(updated);
  };

  // Handler for business card selection
  const handleBusinessCardSelected = (businessCard: { name: string; googleMapsUrl: string }) => {
    setSelectedBusinessCard(businessCard);
    
    // Auto-fill the first content item with the business card name
    if (contentItems.length > 0 && !contentItems[0].url) {
      const updated = [...contentItems];
      updated[0].url = businessCard.name;
      setContentItems(updated);
    }
    
    // Auto-fill the company URL field with the Google Maps URL
    setCompany(prevCompany => ({
      ...prevCompany,
      url: businessCard.googleMapsUrl
    }));
  };

  // Handler for business card step submission
  const handleBusinessCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBusinessCard) {
      setStep("content");
    }
  };

  const addContent = () => {
    const newContent = {
      author: "",
      content: "",
      url: selectedBusinessCard?.name || "",
      date_added: ""
    };
    setContentItems([...contentItems, newContent]);
    setExpandedIndex(contentItems.length);
  };

  const removeContent = (index: number) => {
    setContentItems(contentItems.filter((_, i) => i !== index));
    if (expandedIndex === index) setExpandedIndex(0);
  };

  const handleContentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("company");
  };

  const handleProfileRemoval = () => {
    // Przekieruj do formularza usuwania całego profilu
    window.location.href = '/formularz-profil-google';
  };

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (company.different_payer) {
      setStep("payer");
    } else {
      setStep("summary");
    }
  };

  const handlePayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("summary");
  };

  // Only save to Supabase, no payment logic
  const confirmAndSave = async () => {
    setIsLoading(true);
    try {
      let currentPayerId: string | undefined;

      if (company.different_payer) {
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

      const res = await fetch("/api/company-with-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company,
          contentItems,
          totalPrice,
          numberOfContentItems: contentItems.length,
          payer_id: currentPayerId,
        }),
      });
      
      if (!res.ok) throw new Error("Błąd zapisu danych firmy i recenzji");

      const data = await res.json();
      console.log("Odpowiedź z API:", data);
      
      // Wysłanie emaila z potwierdzeniem zamówienia
      try {
        const emailRes = await fetch("/api/send-order-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company,
            reviews: contentItems,
            totalPrice,
            orderId: data.document_id || data.company_id,
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
      
      // Akceptacja regulaminu jest już zapisana w trakcie tworzenia firmy
      localStorage.removeItem("companyFormData");
      
      // Przekierowanie na stronę sukces z tokenem śledzenia
      window.location.href = "/sukces";
    } catch (error) {
      console.error("❌ confirmAndSave error:", error);
      alert("Wystąpił błąd podczas przetwarzania. Spróbuj ponownie.");
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = contentItems.length * 299;

  return (
    <motion.div
      className="max-w-5xl mx-auto min-h-screen "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="md:flex px-2 md:px-4 py-10 md:gap-8" variants={fadeInUp}>
        <motion.div className="md:w-1/2 mb-10 md:mb-0" variants={fadeInUp}>
          <div className="bg-white rounded-xl shadow-sm md:shadow-lg md:p-8 p-4 w-full space-y-6">
            {step === "business-card" && (
              <BusinessCardSelectionFormClean
                onBusinessCardSelected={handleBusinessCardSelected}
                onSubmit={handleBusinessCardSubmit}
              />
            )}

            {step === "content" && selectedBusinessCard && (
              <ContentFormGoogleClean
                contentItems={contentItems}
                expandedIndex={expandedIndex}
                totalPrice={totalPrice}
                businessCardName={selectedBusinessCard.name}
                contentEnabled={contentEnabled}
                onChange={handleChange}
                onAdd={addContent}
                onRemove={removeContent}
                onExpand={(index: number) =>
                  setExpandedIndex(expandedIndex === index ? -1 : index)
                }
                onSubmit={handleContentSubmit}
                onBack={() => setStep("business-card")}
                onProfileRemoval={handleProfileRemoval}
              />
            )}

            {step === "company" && (
              <CompanyFormStepClean
                company={company}
                onChange={handleCompanyChange}
                onSubmit={handleCompanySubmit}
                onBack={() => setStep("content")}
                contentCount={contentItems.length}
                totalPrice={totalPrice}
              />
            )}

            {step === "payer" && (
              <PayerFormStepClean
                payer={payer}
                onChange={handlePayerChange}
                onSubmit={handlePayerSubmit}
                onBack={() => setStep("company")}
              />
            )}

            {step === "summary" && (
              <SummaryStepReviewFormClean
                company={company}
                contentItems={contentItems}
                totalPrice={totalPrice}
                isLoading={isLoading}
                onBack={() =>
                  company.different_payer ? setStep("payer") : setStep("company")
                }
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
          {step === "business-card" && <GoogleContentFormExplenationClean />}
          {step === "content" && <GoogleContentFormExplenationClean />}
          {step === "company" && <CompanyContentRemovalFormExplenationClean />}
          {step === "payer" && <PayerFormExplenationClean />}
          {step === "summary" && <ContentRemovalSummaryExplenationClean />}
        </motion.div>
      </motion.div>

       <motion.div
              className="md:flex justify-center"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <GuaranteeSectionClean />
            </motion.div>
      
             <motion.div
              className="md:flex justify-center"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <UseCaseSectionClean />
            </motion.div>
      

      <motion.div
        className="md:flex py-10 m-4 md:gap-8"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <ExplenationContentRemovalClean />
      </motion.div>

      <motion.div
        className="md:flex py-10 m-4 md:gap-8"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <SocialProofClean />
      </motion.div>
    </motion.div>
  );
}
