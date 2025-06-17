"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import RemovalFormBazy from "@/components/formSteps/RemovalFormBazy";
import CompanyProfileFormStep from "@/components/formSteps/CompanyProfileFormStep";
import PayerFormStep from "@/components/formSteps/PayerFormStep";
import SummaryStepRemovalBazy from "@/components/formSteps/SummaryStepRemovalBazy";
import SocialProof from "./SocialProof";
import RemovalFormExplenation from "./Explenations/RemovalFormExplenation";
import CompanyProfileFormExplenation from "./Explenations/CompanyProfileFormStepExplenation";
import PaymentExplanation from "./Explenations/PaymentExplanation";
import ExplenationProfileRemoval from "./ExplenationProfileRemoval";

interface Removal {
  companyName: string;
  nip: string;
  portal: string;
  customPortal?: string;
}

interface GUSCompanyData {
  name: string;
  street: string;
  city: string;
  zip: string;
  nip: string;
  regon: string;
  krs?: string;
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
  };  const [removals, setRemovals] = useState<Removal[]>([
    { companyName: "", nip: "", portal: "" },
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
  const PORTAL_PRICES = {
    "ALEO": 699,
    "GoWork": 699,
    "Panorama Firm": 699,
    "Biznes Finder": 699,
    "PKT.pl": 699,
    "Podobne Firmy": 699,
    "Inne": 699
  };  const calculatePriceForPortals = (portal: string): number => {
    return PORTAL_PRICES[portal as keyof typeof PORTAL_PRICES] || 699;
  };

  const totalPrice = removals.reduce((sum, r) => sum + calculatePriceForPortals(r.portal), 0);
  const displayPrice = totalPrice;  const handleRemovalChange = (index: number, field: keyof Removal, value: string | string[]) => {
    const updated = [...removals];
    if (field === 'portal') {
      updated[index].portal = value as string;
      // Jeśli ustawiamy portal na "Inne", dodaj puste customPortal
      if (value === "Inne") {
        updated[index].customPortal = "";
      } else {
        // Jeśli nie "Inne", usuń customPortal
        delete updated[index].customPortal;
      }
    } else if (field === 'customPortal') {
      updated[index].customPortal = value as string;    } else if (field === 'companyName') {
      // Ustaw nazwę firmy dla tego profilu
      updated[index].companyName = value as string;
      
      // Automatycznie skopiuj nazwę firmy do wszystkich innych profili (jeśli jest niepusta)
      const stringValue = value as string;
      if (stringValue && stringValue.trim()) {
        updated.forEach((removal, i) => {
          if (i !== index && removal.portal) {
            updated[i].companyName = stringValue;
          }
        });
      }
    } else if (field === 'nip') {
      // Ustaw NIP dla tego profilu
      updated[index].nip = value as string;
      
      // Automatycznie skopiuj NIP do wszystkich innych profili (jeśli jest niepusty)
      const stringValue = value as string;
      if (stringValue && stringValue.trim()) {
        updated.forEach((removal, i) => {
          if (i !== index && removal.portal) {
            updated[i].nip = stringValue;
          }
        });
      }
    }
    setRemovals(updated);
  };
  // Nowa funkcja do obsługi multiselect portali
  const handlePortalMultiselect = (portalName: string, isChecked: boolean) => {
    if (isChecked) {
      // Sprawdź czy portal już istnieje
      const existingPortalIndex = removals.findIndex(r => r.portal === portalName);
      
      if (existingPortalIndex === -1) {
        // Znajdź pierwszy profil z danymi GUS, żeby skopiować dane
        const profileWithData = removals.find(r => r.companyName && r.nip);
        
        // Dodaj nowy profil z tym portalem i skopiowanymi danymi
        const newRemoval: Removal = {
          companyName: profileWithData?.companyName || "",
          nip: profileWithData?.nip || "",
          portal: portalName,
          customPortal: portalName === "Inne" ? "" : undefined
        };
        
        const newRemovals = [...removals, newRemoval];
        setRemovals(newRemovals);
        setExpandedIndex(newRemovals.length - 1); // Rozwiń nowo dodany profil
      } else {
        // Portal już istnieje - rozwiń istniejący profil
        setExpandedIndex(existingPortalIndex);
      }
    } else {
      // Usuń profil z tym portalem
      const portalIndex = removals.findIndex(r => r.portal === portalName);
      if (portalIndex !== -1) {
        const newRemovals = removals.filter((_, i) => i !== portalIndex);
        setRemovals(newRemovals);
        if (expandedIndex === portalIndex) {
          setExpandedIndex(newRemovals.length > 0 ? 0 : -1);
        } else if (expandedIndex > portalIndex) {
          setExpandedIndex(expandedIndex - 1);
        }
      }
    }
  };
  // Funkcja do automatycznego wypełniania danych firmy z GUS
  const handleGUSDataReceived = (gusData: GUSCompanyData) => {
    console.log('Received GUS data for company form:', gusData);
    
    // Automatycznie wypełnij dane firmy z pierwszego znalezionego profilu
    if (gusData && gusData.name) {
      setCompany(prev => ({
        ...prev,
        name: gusData.name || prev.name,
        nip: gusData.nip || prev.nip,
        street: gusData.street || prev.street,
        city: gusData.city || prev.city,
        zip: gusData.zip || prev.zip,
      }));
      
      console.log('Company data updated with GUS data');
    }
  };  const addRemoval = () => {
    // Ta funkcja będzie wywoływana przez nowy system multiselect
    // Dodajemy pusty profil, który zostanie skonfigurowany przez handlePortalChange
    const newRemoval: Removal = { companyName: "", nip: "", portal: "" };
    setRemovals([...removals, newRemoval]);
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

      setPayerId(currentPayerId);      // Przekształć removals aby przekazać nazwę portalu jako url
      const removalDataForAPI = removals.map(removal => ({
        ...removal,
        url: removal.portal === "Inne" ? (removal.customPortal || "Inne") : removal.portal
      }));

      const res = await fetch("/api/company-profile-removal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, removals: removalDataForAPI, totalPrice, payer_id: currentPayerId }),
      });
      if (!res.ok) throw new Error("Błąd zapisu danych firmy i zgłoszeń");
      const data = await res.json();
      const company_id = data.company_id;
      
      const docRes = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },        body: JSON.stringify({
          company_id,
          type: "żądanie usunięcia profilu",
          payer_id: currentPayerId,
          totalPrice: totalPrice,
          items: removals.map(removal => ({
            url: removal.portal === "Inne" ? (removal.customPortal || "Inne") : removal.portal,
            name: removal.companyName,
            nip: removal.nip,
            price: PORTAL_PRICES[removal.portal as keyof typeof PORTAL_PRICES] || 699,
            portal: removal.portal
          }))
        }),
      });
      if (!docRes.ok) throw new Error("Błąd tworzenia dokumentu");
      const docData = await docRes.json();

      localStorage.removeItem("companyFormRemovalData");
      
      // Przekierowanie na stronę thankyou z tokenem śledzenia
      if (docData.tracking_token) {
        window.location.href = `/thankyou?tracking_token=${docData.tracking_token}`;
      } else {
        window.location.href = "/thankyou";
      }
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
      <motion.div className="md:flex px-2 md:px-4 py-10 md:gap-8" variants={fadeInUp}>
        <motion.div className="md:w-1/2 mb-10 md:mb-0" variants={fadeInUp}>
          <div className="bg-white rounded-xl shadow-sm md:shadow-lg md:p-8 p-4 w-full space-y-6">            {step === "removal" && (
              <RemovalFormBazy
                removals={removals}
                expandedIndex={expandedIndex}
                onChange={handleRemovalChange}
                onAdd={addRemoval}
                onRemove={removeRemoval}
                onExpand={(index) => setExpandedIndex(expandedIndex === index ? -1 : index)}
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep("company");
                }}
                onGUSDataReceived={handleGUSDataReceived}
                onPortalMultiselect={handlePortalMultiselect}
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
            )}            {step === "summary" && (
              <SummaryStepRemovalBazy
                company={company}
                removals={removals.map((removal) => ({
                  ...removal,
                  price: calculatePriceForPortals(removal.portal)
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