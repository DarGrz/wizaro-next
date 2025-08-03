import OpinieMannequinPLUsuwaniePage from "../../components/OpinieMannequinPLUsuwaniePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usuwanie opinii z MannequinPL - Profesjonalne usuwanie negatywnych recenzji",
  description: "Skuteczne usuwanie negatywnych opinii z serwisu MannequinPL. Profesjonalne podejście zgodne z RODO. Gwarancja rezultatu przy usuwaniu krzywdzących opinii.",
  keywords: "usuwanie opinii mannequinpl, negatywne opinie mannequin pl, usuwanie recenzji mannequinpl, opinie mannequin poland, mannequin pl opinie",
  alternates: {
    canonical: "https://wizaro.pl/opinie-mannequinpl-usuwanie"
  }
};

export default function Page() {
  return <OpinieMannequinPLUsuwaniePage />;
}
