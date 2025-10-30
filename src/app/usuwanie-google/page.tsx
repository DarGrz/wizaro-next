import type { Metadata } from 'next';
import CompanySearchUsuwanieGoogle from '@/components/CompanySearchUsuwanieGoogle';

export const metadata: Metadata = {
  title: 'Usuwanie opinii z Google — usuwanie wizytówek i resetowanie | Wizaro.pl',
  description:
    'Pomoc w usuwaniu opinii z Google, usuwaniu wizytówek (Google Business Profile) oraz resetowaniu wizytówek. Skorzystaj z naszej pomocy, aby przywrócić porządek w wizytówce firmy i usuwać niechciane opinie.',
  keywords:
    'usuwanie opinii google, usuwanie wizytówek google, resetowanie wizytówki, usuwanie wizytówek, google reviews removal, google business profile, usuwanie opinii',
  robots: 'noindex, follow',
  openGraph: {
    title: 'Usuwanie opinii z Google — usuwanie wizytówek i resetowanie',
    description:
      'Profesjonalne usługi w zakresie usuwania opinii z Google, usuwania oraz resetowania wizytówek Google Business Profile. Pomagamy odzyskać kontrolę nad wizytówką firmy.',
    type: 'website',
    locale: 'pl_PL',
  },
};

export default function UsuwanieGooglePage() {
  return <CompanySearchUsuwanieGoogle />;
}
