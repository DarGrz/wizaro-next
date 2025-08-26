import { Metadata } from 'next';
import PomocZAleoPage from '../../components/PomocZAleoPage';

export const metadata: Metadata = {
  title: 'Pomoc z ALEO.com - Profesjonalne Wsparcie Prawne | Wizaro.pl',
  description: 'Oferujemy specjalistyczną pomoc prawną w sprawach dotyczących serwisu ALEO.com. Usuwanie opinii, korekta danych, ochrona reputacji firmowej zgodnie z prawem.',
  keywords: 'pomoc ALEO, ALEO.com pomoc, usuwanie opinii ALEO, korekta danych ALEO, wsparcie prawne ALEO, reputacja ALEO',
  openGraph: {
    title: 'Pomoc z ALEO.com - Profesjonalne Wsparcie Prawne',
    description: 'Specjalistyczna pomoc prawna w sprawach dotyczących serwisu ALEO.com. Usuwanie opinii, korekta danych, ochrona reputacji zgodnie z prawem.',
    type: 'website',
  },
};

export default function Page() {
  return <PomocZAleoPage />;
}
