import type { Metadata } from 'next';
import CompanySearchOchronaWizerunku from '@/components/CompanySearchOchronaWizerunku';

export const metadata: Metadata = {
  title: 'Ochrona Wizerunku Firmy w Internecie | Wizaro.pl',
  description: 'Profesjonalna ochrona wizerunku Twojej firmy w internecie. Skutecznie i dyskretnie zadbamy o Twoją reputację online. Gwarancja rezultatów.',
  keywords: 'ochrona wizerunku, reputacja online, zarządzanie reputacją, ochrona firmy, wsparcie biznesowe, reputacja w internecie, wizerunek firmy',
  robots: 'index, follow',
  openGraph: {
    title: 'Ochrona Wizerunku Firmy w Internecie | Wizaro.pl',
    description: 'Profesjonalna ochrona wizerunku Twojej firmy w internecie. Skutecznie i dyskretnie zadbamy o Twoją reputację online.',
    type: 'website',
    locale: 'pl_PL',
  },
};

export default function OchronaWizerunkuV2Page() {
  return <CompanySearchOchronaWizerunku />;
}
