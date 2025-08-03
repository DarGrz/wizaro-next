import { Metadata } from 'next';
import JakUsunacDaneZAleoPage from '../../components/JakUsunacDaneZAleoPage';

export const metadata: Metadata = {
  title: 'Jak usunąć dane z Aleo? | Kompletny przewodnik usuwania danych z Aleo',
  description: 'Szczegółowy przewodnik jak usunąć dane z serwisu Aleo. Profesjonalne usuwanie informacji osobistych i biznesowych. Płatność po wykonaniu usługi.',
  keywords: 'jak usunąć dane z aleo, usuwanie danych z aleo, dane z aleo, informacje z aleo, prywatność aleo, bezpieczeństwo danych aleo',
  openGraph: {
    title: 'Jak usunąć dane z Aleo? | Przewodnik usuwania danych',
    description: 'Kompletny przewodnik usuwania danych z Aleo. Profesjonalna pomoc.',
    type: 'website',
  },
};

export default function Page() {
  return <JakUsunacDaneZAleoPage />;
}
