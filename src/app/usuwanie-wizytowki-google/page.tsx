import type { Metadata } from 'next';
import CompanySearchGoogleRemoval from '@/components/CompanySearchGoogleRemoval';

export const metadata: Metadata = {
  title: 'Usuwanie Firmy z Google - Usuwanie Wizytówki Google | Wizaro.pl',
  description: 'Profesjonalne usuwanie wizytówek Google My Business. Skutecznie usuniemy Twoją firmę z Google Maps i Google Search. Gwarancja rezultatów.',
  keywords: 'Usuwanie wizytówki Google, usuwanie Google My Business, usuwanie firmy z Google Maps, usuwanie profilu Google, ochrona wizerunku, reputacja online, usuwanie Google Business Profile, zarządzanie reputacją, usuwanie danych Google, ochrona firmy, wsparcie biznesowe',
  robots: 'index, follow',
  openGraph: {
    title: 'Usuwanie Firmy z Google - Usuwanie Wizytówki Google',
    description: 'Profesjonalne usuwanie wizytówek Google My Business. Skutecznie usuniemy Twoją firmę z Google Maps i Google Search.',
    type: 'website',
    locale: 'pl_PL',
  },
};

export default function UsowanieWizytowkiGooglePage() {
  return <CompanySearchGoogleRemoval />;
}
