
"use client";

import { useState, useEffect } from "react";
import ReviewForm from "@/components/formSteps/ReviewForm";
import CompanyFormStep from "@/components/formSteps/CompanyFormStep";
import PayerFormStep from "@/components/formSteps/PayerFormStep";
import SummaryStep from "@/components/formSteps/SummaryStep";
import PaymentExplanation from "./PaymentExplanation";
import SocialProof from "./SocialProof";

interface Review {
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

export default function CompanyFormReviews() {
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
  const [reviews, setReviews] = useState<Review[]>([
    { author: "", content: "", url: "", date_added: "" },
  ]);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [step, setStep] = useState<"reviews" | "company" | "payer" | "summary">("reviews");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("companyFormData");
    if (saved) setCompany(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("companyFormData", JSON.stringify(company));
  }, [company]);

  useEffect(() => {
    const cleanup = () => localStorage.removeItem("companyFormData");
    window.addEventListener("beforeunload", cleanup);
    return () => window.removeEventListener("beforeunload", cleanup);
  }, []);

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const parsedValue = type === "checkbox" ? checked : value;
    setCompany({ ...company, [name]: parsedValue });
  };

  const handlePayerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayer({ ...payer, [name]: value });
  };

  const handleChange = (index: number, field: keyof Review, value: string) => {
    const updated = [...reviews];
    updated[index][field] = value;
    setReviews(updated);
  };

  const addReview = () => {
    setReviews([
      ...reviews,
      { author: "", content: "", url: "", date_added: "" },
    ]);
    setExpandedIndex(reviews.length);
  };

  const removeReview = (index: number) => {
    setReviews(reviews.filter((_, i) => i !== index));
    if (expandedIndex === index) setExpandedIndex(0);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("company");
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

  const confirmAndPay = async () => {
    setIsLoading(true);
    const totalPrice = reviews.length * 299;

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
        body: JSON.stringify({ company, reviews, totalPrice, payer_id: currentPayerId }),
      });

      if (!res.ok) throw new Error("Błąd zapisu danych firmy i opinii");
      const data = await res.json();
      const company_id = data.company_id;

      const docRes = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_id,
          type: "wezwanie do usunięcia opinii",
          payer_id: currentPayerId,
        }),
      });

      if (!docRes.ok) throw new Error("Błąd tworzenia dokumentu");
      const docData = await docRes.json();
      const document_id = docData.id;

      const paymentRes = await fetch("/api/payments/create-payment-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          document_id,
          ...(company.different_payer ? payer : {
            email: company.email,
            name: `${company.first_name} ${company.last_name}`,
            company_name: company.name,
            nip: company.nip,
            street: company.street,
            zip: company.zip,
            city: company.city,
          }),
          quantity: reviews.length,
        }),
      });

      if (!paymentRes.ok) throw new Error("Błąd tworzenia płatności");
      const payment = await paymentRes.json();

      localStorage.removeItem("companyFormData");
      window.location.href = payment.url;
    } catch (error) {
      console.error("❌ confirmAndPay error:", error);
      alert("Wystąpił błąd podczas przetwarzania. Spróbuj ponownie.");
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = reviews.length * 299;

  return (
    <div className="max-w-5xl mx-auto min-h-screen">
      <div className="md:flex px-4 py-10 md:gap-8">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full space-y-6">
            {step === "reviews" && (
              <ReviewForm
                reviews={reviews}
                expandedIndex={expandedIndex}
                totalPrice={totalPrice}
                onChange={handleChange}
                onAdd={addReview}
                onRemove={removeReview}
                onExpand={(index) =>
                  setExpandedIndex(expandedIndex === index ? -1 : index)
                }
                onSubmit={handleReviewSubmit}
              />
            )}

            {step === "company" && (
              <CompanyFormStep
                company={company}
                onChange={handleCompanyChange}
                onSubmit={handleCompanySubmit}
                onBack={() => setStep("reviews")}
                reviewCount={reviews.length}
                totalPrice={totalPrice}
              />
            )}

            {step === "payer" && (
              <PayerFormStep
                payer={payer}
                onChange={handlePayerChange}
                onSubmit={handlePayerSubmit}
                onBack={() => setStep("company")}
              />
            )}

            {step === "summary" && (
              <SummaryStep
                company={company}
                reviews={reviews}
                totalPrice={totalPrice}
                isLoading={isLoading}
                onBack={() =>
                  company.different_payer ? setStep("payer") : setStep("company")
                }
                onConfirm={confirmAndPay}
                payer={payer}
                payer_id={payerId}
              />
            )}
          </div>
        </div>
        <div className="md:w-1/2">
          <PaymentExplanation />
        </div>
      </div>
      <div className="md:flex py-10 m-4 md:gap-8">
        <SocialProof />
      </div>
    </div>
  );
}
