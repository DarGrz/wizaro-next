import { Metadata } from 'next';
import UsuwanieOpiniiGoogleFirmaPage from '@/components/UsuwanieOpiniiGoogleFirmaPage';

export const metadata: Metadata = {
  title: 'Usuwanie opinii Google dla firm | Profesjonalne usługi dla biznesu',
  description: 'Profesjonalne usuwanie negatywnych opinii Google dla firm. Specjalistyczne podejście do biznesu, dyskrecja i gwarancja rezultatu. Odzyskaj reputację swojej firmy.',
  keywords: 'usuwanie opinii google firma, usuwanie opinii google biznes, usuwanie negatywnych opinii firma, profesjonalne usuwanie opinii, reputacja firmy online, zarządzanie reputacją biznesu',
  openGraph: {
    title: 'Usuwanie opinii Google dla firm | Profesjonalne usługi dla biznesu',
    description: 'Profesjonalne usuwanie negatywnych opinii Google dla firm. Specjalistyczne podejście do biznesu i gwarancja rezultatu.',
    type: 'website',
  },
};

export default function Page() {
  return <UsuwanieOpiniiGoogleFirmaPage />;
}
