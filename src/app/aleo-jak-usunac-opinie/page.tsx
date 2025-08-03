import { Metadata } from 'next';
import AleoOpiniejPage from '../../components/AleoOpiniejPage';

export const metadata: Metadata = {
  title: 'Aleo jak usunąć opinie? | Profesjonalne usuwanie opinii z Aleo',
  description: 'Skuteczne usuwanie negatywnych opinii z serwisu Aleo. Profesjonalna obsługa, gwarancja rezultatu. Usuwamy szkodliwe opinie z Aleo zgodnie z prawem.',
  keywords: 'aleo jak usunąć opinie, usuwanie opinii aleo, aleo usuwanie opinii, negatywne opinie aleo, szkodliwe opinie aleo, jak usunąć opinię z aleo',
  openGraph: {
    title: 'Aleo jak usunąć opinie? | Profesjonalne usuwanie opinii',
    description: 'Skuteczne usuwanie negatywnych opinii z Aleo. Gwarancja rezultatu.',
    type: 'website',
  },
};

export default function Page() {
  return <AleoOpiniejPage />;
}
