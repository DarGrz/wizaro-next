import { Metadata } from 'next';
import GoworkFirmaRemovalPage from '../../components/GoworkFirmaRemovalPage';

export const metadata: Metadata = {
  title: 'Usuwanie firmy z GoWork | Jak usunąć konto z GoWork | Profil firmy GoWork',
  description: 'Profesjonalne usuwanie firmy z GoWork. Jak usunąć konto z GoWork, jak usunąć profil firmy z GoWork. Skuteczne usuwanie profilu firmy z GoWork. Gwarancja rezultatu, płatność po wykonaniu.',
  keywords: 'usuwanie firmy z gowork, jak usunąć konto z gowork, jak usunąć profil firmy z gowork, usuwanie profilu firmy z gowork, usuwanie konta gowork, gowork usuwanie firmy, profil firmy gowork usuwanie, jak usunąć firmę z gowork, usuwanie wizytówki gowork, gowork removal',
  openGraph: {
    title: 'Usuwanie firmy z GoWork | Jak usunąć konto z GoWork',
    description: 'Profesjonalne usuwanie firmy z GoWork. Skuteczne usuwanie profilu firmy z GoWork. Gwarancja rezultatu.',
    type: 'website',
  },
};

export default function JakUsunacFirmeZGoWorkPage() {
  return <GoworkFirmaRemovalPage />;
}
