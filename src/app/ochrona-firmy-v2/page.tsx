import type { Metadata } from 'next';
import CompanySearchGus from '@/components/CompanySearchGus';

export const metadata: Metadata = {
   title: 'Pomoc Biznesowa Online - Wyszukaj swoją firmę | Wizaro.pl',
  description: 'Profesjonalne wsparcie biznesowe online. Wyszukaj swoją firmę i skorzystaj z naszych usług konsultingowych. Bezpłatna pomoc w rozwoju działalności.',
  keywords: 'pomoc biznesowa, wsparcie firm, konsulting biznesowy, rozwój firmy, pomoc przedsiębiorcom, doradztwo biznesowe',
  robots: 'nindex, nofollow',
  openGraph: {
    title: 'Pomoc Biznesowa Online - Wyszukaj swoją firmę',
    description: 'Profesjonalne wsparcie biznesowe online. Wyszukaj swoją firmę i skorzystaj z naszych usług konsultingowych.',
    type: 'website',
    locale: 'pl_PL',
  },
};

export default function OchronaFirmyV2Page() {
  return <CompanySearchGus />;
}