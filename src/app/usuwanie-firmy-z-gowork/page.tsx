import { Metadata } from 'next';
import UsuwanieFirmyZGoworkPage from '../../components/UsuwanieFirmyZGoworkPage';

export const metadata: Metadata = {
  title: 'Usuwanie firmy z GoWork | Jak usunąć profil firmy z GoWork',
  description: 'Profesjonalne usuwanie firmy z GoWork.pl. Jak usunąć konto z GoWork, usuwanie profilu firmy z GoWork. Skuteczne metody usuwania danych firmowych z portalu GoWork.',
  keywords: 'usuwanie firmy z gowork, jak usunąć konto z gowork, jak usunąć profil firmy z gowork, usuwanie profilu firmy z gowork, usunąć firmę z gowork, gowork usuwanie firmy, gowork jak usunąć profil, usunąć dane z gowork',
  openGraph: {
    title: 'Usuwanie firmy z GoWork | Profesjonalne usuwanie profilu firmowego',
    description: 'Skuteczne usuwanie firmy z GoWork.pl. Gwarancja rezultatu.',
    type: 'website',
  },
};

export default function Page() {
  return <UsuwanieFirmyZGoworkPage />;
}
