"use client";

import { useEffect, useState } from "react";
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
      return 99900;
    }
    if (
      lowerUrl.includes("gowork") ||
      lowerUrl.includes("aleo") ||
      lowerUrl.includes("panorama") ||
      lowerUrl.includes("pkt")
    ) {
      return 49900;
    }
    return 49900;
  };

  const totalPrice = removals.reduce((sum, r) => sum + calculatePriceForLink(r.url), 0);
  const displayPrice = totalPrice / 100;

  const handleRemovalChange = (index: number, field: keyof Removal, value: string) => {
    const updated = [...removals];
    updated[index][field] = value;
    setRemovals(updated);
  };

  const addRemoval = () => {
    setRemovals([...removals, { companyName: "", nip: "", url: "" }]);
    setExpandedIndex(removals.length);
  };

  const removeRemoval = (index: number) => {
    setRemovals(removals.filter((_, i) => i !== index));
    if (expandedIndex === index) setExpandedIndex(0);
  };

  const confirmAndPay = async () => {
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
        }),
      });
      if (!docRes.ok) throw new Error("Błąd tworzenia dokumentu");
      const docData = await docRes.json();
      const document_id = docData.id;

      const paymentRes = await fetch("/api/payments/create-payment-removals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          document_id,
          ...(company.different_payer && payer ? payer : {
            email: company.email,
            name: `${company.first_name} ${company.last_name}`,
            company_name: company.name,
            nip: company.nip,
            street: company.street,
            zip: company.zip,
            city: company.city,
          }),
          totalPrice,
        }),
      });
      if (!paymentRes.ok) throw new Error("Błąd tworzenia płatności");
      const payment = await paymentRes.json();

      localStorage.removeItem("companyFormRemovalData");
      window.location.href = payment.url;
    } catch (error) {
      console.error("❌ confirmAndPay error:", error);
      alert("Wystąpił błąd. Spróbuj ponownie.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto min-h-screen">
      <div className="md:flex px-4 py-10 md:gap-8">
        <div className="md:w-1/2 mb-10 md:mb-0">
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
                onConfirm={confirmAndPay}
                payer={payer}
                payer_id={payerId}
              />
            )}
          </div>
        </div>
        <div className="md:w-1/2">
        {step === "company" ? (
  <CompanyProfileFormExplenation />
) : step === "removal" ? (
  <RemovalFormExplenation />
) : step === "summary" ? (
  <PaymentExplanation />
) : null}

</div>
      </div>

      <div className="md:flex py-10 m-4 md:gap-8">
        <ExplenationProfileRemoval/>
      </div>
      <div className="md:flex py-10 m-4 md:gap-8">
        <SocialProof />
      </div>
    </div>
  );
}
