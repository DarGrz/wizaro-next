import NieporadaneOpiniiGooglePage from "../../components/NieporadaneOpiniiGooglePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Niepożądane opinie Google - Usuwanie krzywdzących recenzji z Google Maps",
  description: "Skuteczne usuwanie niepożądanych, krzywdzących opinii z Google Maps. Profesjonalne podejście zgodne z wytycznymi Google. Gwarancja rezultatu.",
  keywords: "niepożądane opinie google, krzywdzące opinie google maps, nieporządane recenzje google, złośliwe opinie google, usuwanie opinii google",
  alternates: {
    canonical: "https://wizaro.pl/nieporadane-opinii-google"
  }
};

export default function Page() {
  return <NieporadaneOpiniiGooglePage />;
}
