import { Metadata } from 'next';
import UsuniecieNegatywnychOpiniiPage from '../../components/UsuniecieNegatywnychOpiniiPage';

export const metadata: Metadata = {
  title: 'Szybka Pomoc z Opiniami Google | Profesjonalne Wsparcie',
  description: 'Oferujemy profesjonalną pomoc w zakresie walki z fałszywymi opiniami. Działamy zgodnie z przepisami prawa oraz regulaminami platform, reprezentując klienta w procesie wnioskowania.',
  keywords: 'pomoc opinie online, doradztwo prawne recenzje, reprezentacja w sprawach opinii, zgłaszanie treści platform, wsparcie prawne Google Maps',
  openGraph: {
    title: 'Szybka Pomoc z Opiniami Google | Profesjonalne Wsparcie',
    description: 'profesjonalna pomoc w zakresie walki z fałszywymi opiniami zgodnie z przepisami prawa i regulaminami platform.',
    type: 'website',
  },
};

export default function Page() {
  return <UsuniecieNegatywnychOpiniiPage />;
}
