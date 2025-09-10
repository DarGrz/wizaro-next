import { Metadata } from 'next';
import UsuwanieNegatywnychOpiniiGooglePage from '@/components/UsuwanieNegatywnychOpiniiGooglePage';

export const metadata: Metadata = {
  title: 'Usuwanie negatywnych opinii Google | Skuteczne usuwanie złych recenzji',
  description: 'Profesjonalne usuwanie negatywnych opinii z Google. Skuteczne metody, gwarancja rezultatu, dyskrecja. Usuń krzywdzące opinie i odzyskaj dobrą reputację online.',
  keywords: 'usuwanie negatywnych opinii google, usuwanie złych opinii google, usuwanie krzywdzących opinii, negatywne recenzje google, złe opinie google usuwanie, szkodliwe opinie google',
  openGraph: {
    title: 'Usuwanie negatywnych opinii Google | Skuteczne usuwanie złych recenzji',
    description: 'Profesjonalne usuwanie negatywnych opinii z Google. Skuteczne metody i gwarancja rezultatu.',
    type: 'website',
  },
};

export default function Page() {
  return <UsuwanieNegatywnychOpiniiGooglePage />;
}
