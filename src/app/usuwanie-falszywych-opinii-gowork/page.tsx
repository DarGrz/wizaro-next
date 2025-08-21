import { Metadata } from 'next';
import UsuniecieNegatywnychOpiniiGoWorkPage from '@/components/UsuniecieNegatywnychOpiniiGoWorkPage';

export const metadata: Metadata = {
  title: 'Usuwanie Fałszywych Opinii i Profili z GoWork | Profesjonalna pomoc prawna',
  description: 'Oferujemy profesjonalną pomoc w zakresie walki z fałszywymi opiniami na platformie GoWork. Działamy zgodnie z przepisami prawa oraz regulaminami platform, reprezentując klienta w procesie wnioskowania.',
  keywords: 'usuwanie opinii gowork, fałszywe opinie gowork, pomoc prawna gowork, usunąć opinię gowork, negatywne opinie gowork, reprezentacja prawna',
  openGraph: {
    title: 'Usuwanie Fałszywych Opinii z GoWork | Profesjonalna pomoc prawna',
    description: 'Profesjonalna pomoc w zakresie walki z fałszywymi opiniami na GoWork zgodnie z przepisami prawa i regulaminami platform.',
    type: 'website',
  },
};

export default function Page() {
  return <UsuniecieNegatywnychOpiniiGoWorkPage />;
}
