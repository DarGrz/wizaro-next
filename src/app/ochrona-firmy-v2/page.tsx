import type { Metadata } from 'next';
import CompanySearchGus from '@/components/CompanySearchGus';

export const metadata: Metadata = {
  title: 'Ochrona Firmy Online - Skorzystaj z naszych profesjonalnych usług | Wizaro.pl',
  description: 'Profesjonalna ochrona reputacji firm online. Wyszukaj swoją firmę po numerze NIP i skorzystaj z naszych usług ochrony wizerunku.',
  keywords: 'ochrona firmy, ochrona reputacji, NIP, GUS, wizerunek firmy, ochrona online, zarządzanie opinią',
  robots: 'index, follow',
  openGraph: {
    title: 'Ochrona Firmy Online - Skorzystaj z naszych profesjonalnych usług',
    description: 'Profesjonalna ochrona reputacji firm online. Wyszukaj swoją firmę po numerze NIP.',
    type: 'website',
    locale: 'pl_PL',
  },
};

export default function OchronaFirmyV2Page() {
  return <CompanySearchGus />;
}