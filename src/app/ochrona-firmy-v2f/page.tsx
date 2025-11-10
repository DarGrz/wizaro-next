import type { Metadata } from 'next';
import CompanySearchGusFacebook from '@/components/CompanySearchGusFacebook';

export const metadata: Metadata = {
   title: 'Ochrona Wizerunku Online - Wyszukaj swoją firmę | Wizaro.pl',
  description: 'Usuwanie opinii i danych z portali opiniotwórczych. Chroń swoją firmę i reputację online z Wizaro.pl.',
  keywords: 'Usuwanie opinii, ochrona wizerunku, reputacja online, firma, biznes, konsulting, usługi online, usuwanie firmy z portali, ochrona danych, zarządzanie reputacją, usuwanie gowork, usuwanie opinii google, usuwanie danych osobowych, ochrona firmy, wsparcie biznesowe',
  robots: 'nindex, nofollow',
  openGraph: {
    title: 'Ochrona Wizerunku Online - Wyszukaj swoją firmę',
    description: 'Usuwanie opinii i danych z portali opiniotwórczych. Chroń swoją firmę i reputację online z Wizaro.pl.',
    type: 'website',
    locale: 'pl_PL',
  },
};

export default function OchronaFirmyV2Page() {
  return <CompanySearchGusFacebook />;
}