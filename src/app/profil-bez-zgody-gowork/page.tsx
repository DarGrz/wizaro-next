import ProfilBezZgodyGoworkPage from "../../components/ProfilBezZgodyGoworkPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil bez zgody GoWork - Usuwanie profili firm utworzonych bez zgody",
  description: "Skuteczne usuwanie profili firm z GoWork utworzonych bez zgody właściciela. Ochrona przed nieautoryzowanymi wizytówkami. Profesjonalne podejście zgodne z RODO.",
  keywords: "profil bez zgody gowork, nieautoryzowany profil gowork, usuwanie profilu bez zgody, wizytówka bez zgody gowork, nieuprawniony profil firmy",
  alternates: {
    canonical: "https://wizaro.pl/profil-bez-zgody-gowork"
  }
};

export default function Page() {
  return <ProfilBezZgodyGoworkPage />;
}
