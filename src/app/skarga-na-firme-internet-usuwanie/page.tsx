import SkargaNaFirmeInternetUsuwaniePage from "../../components/SkargaNaFirmeInternetUsuwaniePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usuwanie skargi na firmę z internetu - Profesjonalna ochrona reputacji",
  description: "Skuteczne usuwanie skargi na firmę z portali, forów i serwisów internetowych. Ochrona reputacji biznesowej zgodna z RODO. Gwarancja rezultatu.",
  keywords: "skarga na firmę internet, usuwanie skargi na firmę, skarga firmę online, negatywne treści o firmie, ochrona reputacji firmy",
  alternates: {
    canonical: "https://wizaro.pl/skarga-na-firme-internet-usuwanie"
  }
};

export default function Page() {
  return <SkargaNaFirmeInternetUsuwaniePage />;
}
