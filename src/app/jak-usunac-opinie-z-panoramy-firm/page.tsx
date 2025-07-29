import { Metadata } from 'next';
import PanoramaFirmRemovalPage from '../../components/PanoramaFirmRemovalPage';

export const metadata: Metadata = {
  title: 'Jak usunąć opinie z Panoramy Firm? | Usuwanie opinii z Panoramy Firm',
  description: 'Profesjonalne usuwanie opinii i profili z serwisu Panorama Firm. Gwarancja rezultatu, płatność po wykonaniu. Skutecznie usuwamy niechciane treści z Panoramy Firm.',
  keywords: 'usuwanie opinii panorama firm, jak usunąć opinie panorama firm, panorama firm usuwanie, profil panorama firm, opinie panorama firm',
  openGraph: {
    title: 'Jak usunąć opinie z Panoramy Firm? | Usuwanie opinii',
    description: 'Profesjonalne usuwanie opinii z Panoramy Firm. Gwarancja rezultatu.',
    type: 'website',
  },
};

export default function JakUsunacOpinieZPanoramyFirmPage() {
  return <PanoramaFirmRemovalPage />;
}
