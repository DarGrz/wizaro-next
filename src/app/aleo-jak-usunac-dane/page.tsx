import { Metadata } from 'next';
import AleoDanePage from '../../components/AleoDanePage';

export const metadata: Metadata = {
  title: 'Aleo jak usunąć dane? | Skuteczne usuwanie danych osobowych z Aleo',
  description: 'Profesjonalne usuwanie danych osobowych i firmowych z serwisu Aleo. Ochrona prywatności, usuwanie informacji osobistych. Gwarancja rezultatu zgodnie z RODO.',
  keywords: 'aleo jak usunąć dane, usuwanie danych aleo, aleo usuwanie danych, dane osobowe aleo, prywatność aleo, rodo aleo, jak usunąć dane z aleo',
  openGraph: {
    title: 'Aleo jak usunąć dane? | Usuwanie danych osobowych',
    description: 'Profesjonalne usuwanie danych z Aleo zgodnie z RODO. Gwarancja rezultatu.',
    type: 'website',
  },
};

export default function Page() {
  return <AleoDanePage />;
}
