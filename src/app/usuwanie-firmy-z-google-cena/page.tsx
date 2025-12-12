import { Metadata } from 'next';
import UsuwanieFirmyZGoogleCenaPage from '@/components/UsuwanieFirmyZGoogleCenaPage';

export const metadata: Metadata = {
  title: 'Usuwanie firmy z Google cena | 1299 zł brutto - Wizaro.pl',
  description: 'Usuwanie firmy z Google Maps w najlepszej cenie - 1299 zł brutto. Resetowanie profilu 2199 zł. Jak usunąć firmę z Google? Profesjonalna pomoc, pełna gwarancja.',
  keywords: 'usuwanie firmy z google, usuwanie wizytówki google, jak usunąć firmę z google, jak usunąć wizytówkę google, cena usunięcia firmy z google, koszt usunięcia wizytówki, usunięcie profilu google',
  openGraph: {
    title: 'Usuwanie firmy z Google cena | 1299 zł brutto',
    description: 'Profesjonalne usuwanie firm z Google Maps w najlepszej cenie. Usunięcie 1299 zł, Resetowanie 2199 zł. Gwarancja rezultatu.',
    type: 'website',
  },
};

export default function Page() {
  return <UsuwanieFirmyZGoogleCenaPage />;
}
