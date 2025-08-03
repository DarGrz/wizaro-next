import { Metadata } from 'next';
import AleoFirmaRemovalPage from '../../components/AleoFirmaRemovalPage';

export const metadata: Metadata = {
  title: 'Jak usunąć firmę z Aleo? | Skuteczne usuwanie profili firm z Aleo',
  description: 'Profesjonalne usuwanie firm i profili biznesowych z serwisu Aleo. Gwarancja rezultatu, płatność po wykonaniu. Usuwamy niechciane wizytówki i profile firm z Aleo skutecznie i bezpiecznie.',
  keywords: 'usuwanie firmy z aleo, usuwanie profilu z aleo, jak usunąć firmę z aleo, usuwanie wizytówki aleo, profil firmy aleo, aleo usuwanie, wizytówka aleo',
  openGraph: {
    title: 'Jak usunąć firmę z Aleo? | Skuteczne usuwanie profili',
    description: 'Profesjonalne usuwanie firm i profili biznesowych z Aleo. Gwarancja rezultatu.',
    type: 'website',
  },
};

export default function Page() {
  return <AleoFirmaRemovalPage />;
}
