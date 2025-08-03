import { Metadata } from 'next';
import UsuniecieNegatywnychOpiniiGoogleMapsPage from '../../components/UsuniecieNegatywnychOpiniiGoogleMapsPage';

export const metadata: Metadata = {
  title: 'Usuwanie negatywnych opinii z Google Maps | Skuteczne metody RODO',
  description: 'Profesjonalne usuwanie negatywnych i fałszywych opinii z Google Maps. Gwarantujemy skuteczność zgodnie z przepisami RODO. Płatność po rezultacie.',
  keywords: 'usuwanie negatywnych opinii google maps, fałszywe opinie google maps, usuwanie opinii google business, negatywne recenzje google maps, rodo google maps',
  openGraph: {
    title: 'Usuwanie negatywnych opinii z Google Maps | Skuteczne metody RODO',
    description: 'Profesjonalne usuwanie negatywnych opinii z Google Maps zgodnie z RODO. Gwarancja rezultatu.',
    type: 'website',
  },
};

export default function Page() {
  return <UsuniecieNegatywnychOpiniiGoogleMapsPage />;
}
