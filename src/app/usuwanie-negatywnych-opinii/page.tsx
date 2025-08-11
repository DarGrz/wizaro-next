import { Metadata } from 'next';
import UsuniecieNegatywnychOpiniiPage from '../../components/UsuniecieNegatywnychOpiniiPage';

export const metadata: Metadata = {
  title: 'Usuwanie Negatywnych Opinii | Google, Gowork, Aleo i więcej',
  description: 'Oferujemy profesjonalną pomoc w zakresie walki z fałszywymi opiniami. Działamy zgodnie z przepisami prawa oraz regulaminami platform, reprezentując klienta w procesie wnioskowania.',
  keywords: 'pomoc opinie online, doradztwo prawne recenzje, reprezentacja w sprawach opinii, zgłaszanie treści platform, wsparcie prawne Google Maps',
  openGraph: {
    title: 'Usuwanie Negatywnych Opinii | Google, Gowork, Aleo i więcej',
    description: 'profesjonalna pomoc w zakresie walki z fałszywymi opiniami zgodnie z przepisami prawa i regulaminami platform.',
    type: 'website',
  },
};

export default function Page() {
  return <UsuniecieNegatywnychOpiniiPage />;
}
