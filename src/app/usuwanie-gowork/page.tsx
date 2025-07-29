import { Metadata } from 'next';
import GoworkUsuwaniePage from '../../components/GoworkUsuwaniePage';

export const metadata: Metadata = {
  title: 'Usuwanie z GoWork | Skuteczne usuwanie profili i treści z GoWork',
  description: 'Profesjonalne usuwanie profili firm i treści biznesowych z serwisu GoWork. Gwarancja rezultatu, płatność po wykonaniu. Usuwamy niechciane treści z GoWork skutecznie.',
  keywords: 'usuwanie gowork, usuwanie profilu gowork, gowork usuwanie, profil gowork, jak usunąć z gowork, wizytówka gowork',
  openGraph: {
    title: 'Usuwanie z GoWork | Skuteczne usuwanie profili biznesowych',
    description: 'Profesjonalne usuwanie profili firm i treści z GoWork. Gwarancja rezultatu.',
    type: 'website',
  },
};

export default function UsowanieGoworkPage() {
  return <GoworkUsuwaniePage />;
}
