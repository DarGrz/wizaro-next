import UsuwaniePanoramaFirmDanePage from "../../components/UsuwaniePanoramaFirmDanePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usuwanie danych z Panoramy Firm - Kompleksowe usuwanie informacji o firmie",
  description: "Skuteczne usuwanie danych firmy z katalogu Panorama Firm. Profesjonalne usuwanie profili, opinii i informacji biznesowych. Zgodne z RODO.",
  keywords: "usuwanie danych panorama firm, usuwanie profilu panorama firm, dane firmy panorama firm, informacje biznesowe panorama firm, katalog firm",
  alternates: {
    canonical: "https://wizaro.pl/usuwanie-panorama-firm-dane"
  }
};

export default function Page() {
  return <UsuwaniePanoramaFirmDanePage />;
}
