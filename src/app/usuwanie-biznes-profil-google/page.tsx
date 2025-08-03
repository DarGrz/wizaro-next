import UsuwanieBiznesProfilGooglePage from "../../components/UsuwanieBiznesProfilGooglePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usuwanie profilu biznesowego Google - Kompletne usuwanie wizytówek GMB",
  description: "Profesjonalne usuwanie profili biznesowych Google My Business. Skuteczne usuwanie wizytówek Google z Maps. Zgodne z wytycznymi Google.",
  keywords: "usuwanie profilu biznesowego google, usuwanie wizytówki google my business, profil biznesowy google usuwanie, gmb profile removal",
  alternates: {
    canonical: "https://wizaro.pl/usuwanie-biznes-profil-google"
  }
};

export default function Page() {
  return <UsuwanieBiznesProfilGooglePage />;
}
