import { Metadata } from 'next';
import UsuwanieOpiniiGoogleCenaPage from '@/components/UsuwanieOpiniiGoogleCenaPage';

export const metadata: Metadata = {
  title: 'Usuwanie opinii Google cena | Najlepsze ceny na rynku - 299 zł',
  description: 'Usuwanie opinii Google w najlepszej cenie na rynku - 299 zł. Usunięcie wizytówki Google 1299 zł. Resetowanie wizytówki Google 2199 zł brutto. Gwarancja rezultatu.',
  keywords: 'usuwanie opinii google cena, cena usuwania opinii google, koszt usunięcia opinii google, cennik usuwania opinii, usunięcie wizytówki google cena, resetowanie wizytówki google cena',
  openGraph: {
    title: 'Usuwanie opinii Google cena | Najlepsze ceny na rynku - 299 zł',
    description: 'Najlepsze ceny na rynku! Usuwanie opinii Google 299 zł. Gwarancja rezultatu.',
    type: 'website',
  },
};

export default function Page() {
  return <UsuwanieOpiniiGoogleCenaPage />;
}
