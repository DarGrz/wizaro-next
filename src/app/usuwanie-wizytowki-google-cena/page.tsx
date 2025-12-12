import { Metadata } from 'next';
import UsuwanieWizytowkiGoogleCenaPage from '@/components/UsuwanieWizytowkiGoogleCenaPage';

export const metadata: Metadata = {
  title: 'Usuwanie wizytówki Google cena | 1299 zł brutto - Wizaro.pl',
  description: 'Usuwanie wizytówki Google w najlepszej cenie - 1299 zł brutto. Resetowanie wizytówki 2199 zł. Jak usunąć wizytówkę Google? Profesjonalna pomoc, gwarancja rezultatu.',
  keywords: 'usuwanie firmy z google, usuwanie wizytówki google, wizytówki google cena, jak usunąć wizytówkę google, jak usunąć firmę z google, cena usunięcia wizytówki google, koszt usunięcia firmy z google',
  openGraph: {
    title: 'Usuwanie wizytówki Google cena | 1299 zł brutto',
    description: 'Profesjonalne usuwanie wizytówek Google w najlepszej cenie. Usunięcie 1299 zł, Resetowanie 2199 zł. Gwarancja rezultatu.',
    type: 'website',
  },
};

export default function Page() {
  return <UsuwanieWizytowkiGoogleCenaPage />;
}
