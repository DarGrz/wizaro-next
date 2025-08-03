import UsunieciePowtarzajacychSieProfiliiGMBPage from "../../components/UsunieciePowtarzajacychSieProfiliiGMBPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usuwanie powtarzających się profili Google My Business - Duplikaty wizytówek",
  description: "Profesjonalne usuwanie zduplikowanych wizytówek Google My Business. Skuteczna eliminacja duplikatów profili firm w Google Maps. Gwarancja rezultatu.",
  keywords: "duplikaty google business, powtarzające się profile gmb, usuwanie duplikatów google my business, zduplikowane wizytówki google, wielokrotne profile google maps",
  alternates: {
    canonical: "https://wizaro.pl/usuwanie-powtarzajacych-sie-profili-google-my-business"
  }
};

export default function Page() {
  return <UsunieciePowtarzajacychSieProfiliiGMBPage />;
}
