import { Metadata } from 'next';
import AleoUsuwaniePage from '../../components/AleoUsuwaniePage';

export const metadata: Metadata = {
  title: 'Usuwanie z Aleo | Skuteczne usuwanie profili i opinii z serwisu Aleo',
  description: 'Profesjonalne usuwanie profili firm i opinii z serwisu Aleo. Gwarancja rezultatu, płatność po wykonaniu. Usuwamy niechciane treści z Aleo skutecznie i bezpiecznie.',
  keywords: 'usuwanie aleo, usuwanie profilu aleo, usuwanie opinii aleo, aleo usuwanie, profil aleo, opinie aleo, jak usunąć z aleo',
  openGraph: {
    title: 'Usuwanie z Aleo | Skuteczne usuwanie profili i opinii',
    description: 'Profesjonalne usuwanie profili firm i opinii z serwisu Aleo. Gwarancja rezultatu.',
    type: 'website',
  },
};

export default function UsowanieAleoPage() {
  return <AleoUsuwaniePage />;
}
