import { Metadata } from 'next';
import GoworkFirmaRemovalPage from '../../components/GoworkFirmaRemovalPage';

export const metadata: Metadata = {
  title: 'Jak usunąć firmę z GoWork? | Skuteczne usuwanie profili biznesowych',
  description: 'Profesjonalne usuwanie firm i profili biznesowych z serwisu GoWork. Gwarancja rezultatu, płatność po wykonaniu. Usuwamy niechciane wizytówki i profile firm z GoWork skutecznie i bezpiecznie.',
  keywords: 'usuwanie firmy z gowork, usuwanie profilu z gowork, jak usunąć firmę z gowork, usuwanie wizytówki gowork, profil firmy gowork, gowork usuwanie, wizytówka gowork',
  openGraph: {
    title: 'Jak usunąć firmę z GoWork? | Skuteczne usuwanie profili',
    description: 'Profesjonalne usuwanie firm i profili biznesowych z GoWork. Gwarancja rezultatu.',
    type: 'website',
  },
};

export default function JakUsunacFirmeZGoWorkPage() {
  return <GoworkFirmaRemovalPage />;
}
