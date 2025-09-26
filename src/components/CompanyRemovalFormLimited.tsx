"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import RemovalFormLimited from "@/components/formSteps/RemovalFormLimited";
import CompanyProfileFormStep from "@/components/formSteps/CompanyProfileFormStep";
import PayerFormStep from "@/components/formSteps/PayerFormStep";
import SummaryStepProfileForm from "@/components/formSteps/SummaryStepProfileForm";
import SocialProof from "./SocialProof";
import RemovalFormExplenation from "./Explenations/RemovalFormExplenation";
import CompanyProfileFormExplenation from "./Explenations/CompanyProfileFormStepExplenation";
import PaymentExplanation from "./Explenations/PaymentExplanation";
import ExplenationProfileRemoval from "./ExplenationProfileRemoval";

interface Removal {
  companyName: string;
  nip: string;
  url: string;
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

export default function CompanyFormRemoval() {
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
    { companyName: "", nip: "", url: "" },
  ]);

  const [company, setCompany] = useState<CompanyData>(defaultCompany);
  const [payer, setPayer] = useState<PayerData | undefined>(undefined);
  const [payerId, setPayerId] = useState<string | undefined>(undefined);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [step, setStep] = useState<"removal" | "company" | "payer" | "summary">("removal");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("companyFormRemovalData");
    if (saved) setCompany(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("companyFormRemovalData", JSON.stringify(company));
  }, [company]);

  useEffect(() => {
    const cleanup = () => localStorage.removeItem("companyFormRemovalData");
    window.addEventListener("beforeunload", cleanup);
    return () => window.removeEventListener("beforeunload", cleanup);
  }, []);

  const calculatePriceForLink = (url: string): number => {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes("map") || lowerUrl.includes("google") || lowerUrl.includes("goo")) {
      return 129900;
    }
    if (
      lowerUrl.includes("gowork") ||
      lowerUrl.includes("aleo") ||
      lowerUrl.includes("panorama") ||
      lowerUrl.includes("pkt")
    ) {
      return 69900;
    }
    return 69900;
  };

  const totalPrice = removals.reduce((sum, r) => sum + calculatePriceForLink(r.url), 0);
  const displayPrice = totalPrice / 100;

  const handleRemovalChange = (index: number, field: keyof Removal, value: string) => {
    const updated = [...removals];
    updated[index][field] = value;
    setRemovals(updated);
  };

  const addRemoval = () => {
    // Pobierz NIP z poprzedniego profilu (ostatniego na liście)
    const previousNip = removals.length > 0 ? removals[removals.length - 1].nip : "";
    
    setRemovals([...removals, { companyName: "", nip: previousNip, url: "" }]);
    setExpandedIndex(removals.length);
  };

  const removeRemoval = (index: number) => {
    setRemovals(removals.filter((_, i) => i !== index));
    if (expandedIndex === index) setExpandedIndex(0);
  };

  // New: Only save to Supabase, no payment logic
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

      const res = await fetch("/api/company-profile-removal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, removals, totalPrice, payer_id: currentPayerId }),
      });
      if (!res.ok) throw new Error("Błąd zapisu danych firmy i zgłoszeń");
      const data = await res.json();
      const company_id = data.company_id;      const docRes = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_id,
          type: "żądanie usunięcia profilu",
          payer_id: currentPayerId,
        }),
      });
      if (!docRes.ok) throw new Error("Błąd tworzenia dokumentu");

      localStorage.removeItem("companyFormRemovalData");
      
      // Przekierowanie na stronę thankyou z tokenem śledzenia
      window.location.href = "/thankyou";
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
      <motion.div className="md:flex px-4 py-10 md:gap-8" variants={fadeInUp}>
        <motion.div className="md:w-1/2 mb-10 md:mb-0" variants={fadeInUp}>
          <div className="bg-white rounded-xl shadow-lg p-8 w-full space-y-6">
            {step === "removal" && (
              <RemovalFormLimited
                removals={removals}
                expandedIndex={expandedIndex}
                totalPrice={displayPrice}
                onChange={handleRemovalChange}
                onAdd={addRemoval}
                onRemove={removeRemoval}
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
                  setCompany({ ...company, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value })
                }
                onSubmit={() => setStep(company.different_payer ? "payer" : "summary")}
                onBack={() => setStep("removal")}
                reviewCount={removals.length}
                totalPrice={displayPrice}
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
                reviews={removals.map((removal) => ({
                  author: removal.companyName,
                  content: `NIP: ${removal.nip}`,
                  url: removal.url,
                  date_added: new Date().toISOString().split("T")[0],
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {step === "company" ? (
            <CompanyProfileFormExplenation />
          ) : step === "removal" ? (
            <RemovalFormExplenation />
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
        <ExplenationProfileRemoval />
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