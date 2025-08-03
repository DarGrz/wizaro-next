import OcenaFirmyGoogleMapsPage from "../../components/OcenaFirmyGoogleMapsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ocena firmy Google Maps - Zarządzanie reputacją i opiniami w Google",
  description: "Profesjonalne zarządzanie oceną firmy w Google Maps. Poprawa reputacji, zwiększanie pozytywnych opinii, ochrona przed negatywnymi recenzjami.",
  keywords: "ocena firmy google maps, reputacja google maps, opinie google maps, zarządzanie reputacją google, google my business opinie",
  alternates: {
    canonical: "https://wizaro.pl/ocena-firmy-google-maps"
  }
};

export default function Page() {
  return <OcenaFirmyGoogleMapsPage />;
}
