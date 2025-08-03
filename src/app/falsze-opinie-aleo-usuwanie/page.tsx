import FalszyweopiniiAleoUsuwaniePage from "../../components/FalszyweopiniiAleoUsuwaniePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usuwanie fałszywych opinii z Aleo - Professional fake reviews removal",
  description: "Skuteczne usuwanie fałszywych, manipulacyjnych opinii z serwisu Aleo. Profesjonalne podejście zgodne z RODO. Gwarancja rezultatu przy usuwaniu fake reviews.",
  keywords: "fałszywe opinie aleo, fake reviews aleo, usuwanie manipulacyjnych opinii aleo, nieprawdziwe opinie aleo, usuwanie opinii konkurencji aleo",
  alternates: {
    canonical: "https://wizaro.pl/falsze-opinie-aleo-usuwanie"
  }
};

export default function Page() {
  return <FalszyweopiniiAleoUsuwaniePage />;
}
