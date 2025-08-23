import { Metadata } from 'next';
import UsuniecieNegatywnychOpiniiPage from '../../components/UsuniecieNegatywnychOpiniiPage';

export const metadata: Metadata = {
  title: 'Szybka pomoc z pomówieniami w sieci  | Profesjonalne Wsparcie',
  description: 'Oferujemy profesjonalną pomoc w zakresie walki z fałszywymi pomówieniami. Działamy zgodnie z przepisami prawa oraz regulaminami platform, reprezentując klienta w procesie wnioskowania.',
  keywords: '',
  openGraph: {
    title: 'Szybka Pomoc z pomówieniami w sieci | Profesjonalne Wsparcie',
    description: 'profesjonalna pomoc w zakresie walki z fałszywymi pomówieniami zgodnie z przepisami prawa i regulaminami platform.',
    type: 'website',
  },
};

export default function Page() {
  return <UsuniecieNegatywnychOpiniiPage />;
}
