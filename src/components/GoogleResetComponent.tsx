"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import GoogleResetForm from "@/components/formSteps/GoogleResetForm";
import CompanyProfileFormStep from "@/components/formSteps/CompanyProfileFormStep";
import PayerFormStep from "@/components/formSteps/PayerFormStep";
import SummaryStepProfileForm from "@/components/formSteps/SummaryStepProfileForm";
import SocialProof from "@/components/SocialProof";
import GoogleResetFormExplanation from "@/components/Explenations/GoogleResetFormExplanation";
import CompanyProfileFormExplenation from "@/components/Explenations/CompanyProfileFormStepExplenation";
import PaymentExplanation from "@/components/Explenations/PaymentExplanation";
import GoogleResetExplanation from "@/components/GoogleResetExplanation";

interface GoogleReset {
  companyName: string;
  nip: string;
  googleUrl: string;
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

export default function GoogleResetComponent() {
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

  const [resets, setResets] = useState<GoogleReset[]>([
    { companyName: "", nip: "", googleUrl: "" },
  ]);

  const [company, setCompany] = useState<CompanyData>(defaultCompany);
  const [payer, setPayer] = useState<PayerData | undefined>(undefined);
  const [payerId, setPayerId] = useState<string | undefined>(undefined);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [step, setStep] = useState<"reset" | "company" | "payer" | "summary">("reset");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("googleResetFormData");
    if (saved) setCompany(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("googleResetFormData", JSON.stringify(company));
  }, [company]);

  useEffect(() => {
    const cleanup = () => localStorage.removeItem("googleResetFormData");
    window.addEventListener("beforeunload", cleanup);
    return () => window.removeEventListener("beforeunload", cleanup);
  }, []);

  const fixedPrice = 2199;

  const handleResetChange = (index: number, field: keyof GoogleReset, value: string) => {
    const updated = [...resets];
    updated[index][field] = value;
    setResets(updated);
  };

  const addReset = () => {
    setResets([...resets, { companyName: "", nip: "", googleUrl: "" }]);
    setExpandedIndex(resets.length);
  };

  const removeReset = (index: number) => {
    setResets(resets.filter((_, i) => i !== index));
    if (expandedIndex === index) setExpandedIndex(0);
  };

  // Zatwierdzenie i zapis do bazy danych
  const confirmAndSave = async () => {
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

      const res = await fetch("/api/google-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          company, 
          resets, 
          totalPrice: fixedPrice * 100, // Cena w groszach dla API
          payer_id: currentPayerId 
        }),
      });
      
      if (!res.ok) throw new Error("Błąd zapisu danych firmy i zgłoszeń");
      const data = await res.json();
      const company_id = data.company_id;
      
      const docRes = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_id,
          type: "resetowanie wizytówki google",
          payer_id: currentPayerId,
        }),
      });
      
      if (!docRes.ok) throw new Error("Błąd tworzenia dokumentu");
      
      // Przekierowanie na stronę success-google-reset z tokenem śledzenia
      window.location.href = "/success-google-reset";
    } catch (error) {
      console.error("❌ confirmAndSave error:", error);
      alert("Wystąpił błąd. Spróbuj ponownie.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="md:flex px-4 py-10 md:gap-8" variants={fadeInUp}>
        <motion.div className="md:w-1/2 mb-10 md:mb-0" variants={fadeInUp}>
          <div className="bg-white rounded-xl shadow-lg p-8 w-full space-y-6">
            {step === "reset" && (
              <GoogleResetForm
                resets={resets}
                expandedIndex={expandedIndex}
                onChange={handleResetChange}
                onAdd={addReset}
                onRemove={removeReset}
                onExpand={(index) => setExpandedIndex(expandedIndex === index ? -1 : index)}
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep("company");
                }}
              />
            )}

            {step === "company" && (
              <CompanyProfileFormStep
                company={company}
                onChange={(e) =>
                  setCompany({ 
                    ...company, 
                    [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value 
                  })
                }
                onSubmit={() => setStep(company.different_payer ? "payer" : "summary")}
                onBack={() => setStep("reset")}
                reviewCount={resets.length}
                totalPrice={fixedPrice}
              />
            )}

            {step === "payer" && payer && (
              <PayerFormStep
                payer={payer}
                onChange={(e) => setPayer({ ...payer, [e.target.name]: e.target.value })}
                onSubmit={() => setStep("summary")}
                onBack={() => setStep("company")}
              />
            )}

            {step === "summary" && (
              <SummaryStepProfileForm
                company={company}
                reviews={resets.map((reset) => ({
                  author: reset.companyName,
                  content: `NIP: ${reset.nip}`,
                  url: reset.googleUrl,
                  date_added: new Date().toISOString().split("T")[0],
                }))}
                totalPrice={fixedPrice}
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {step === "company" ? (
            <CompanyProfileFormExplenation />
          ) : step === "reset" ? (
            <GoogleResetFormExplanation />
          ) : step === "summary" ? (
            <PaymentExplanation />
          ) : null}
        </motion.div>
      </motion.div>

      <motion.div
        className="md:flex py-10 m-4 md:gap-8"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <GoogleResetExplanation />
      </motion.div>

      <motion.div
        className="md:flex py-10 m-4 md:gap-8"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <SocialProof />
      </motion.div>
    </motion.div>
  );
}
