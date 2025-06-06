import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-8 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <Link href="/" className="mb-4 md:mb-0">
            <Image 
              src="/images/wizaro-logo.png" 
              alt="Wizaro.pl" 
              width={130} 
              height={40} 
              className="mx-auto md:mx-0"
            />
          </Link>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-3 text-sm">
            <Link href="/" className="text-gray-700 hover:text-[#002a5c] transition">
              Strona główna
            </Link>
            <Link href="/o-nas" className="text-gray-700 hover:text-[#002a5c] transition">
              O nas
            </Link>
            <Link href="/kontakt" className="text-gray-700 hover:text-[#002a5c] transition">
              Kontakt
            </Link>
            <Link href="/formularz-opinie" className="text-gray-700 hover:text-[#002a5c] transition">
              Usuwanie opinii
            </Link>
            <Link href="/formularz-profil" className="text-gray-700 hover:text-[#002a5c] transition">
              Usuwanie profili
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 mt-4">
          <p className="text-sm text-gray-600 mb-3">
            &copy; {new Date().getFullYear()} Wizaro.pl – Wszelkie prawa zastrzeżone
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/regulamin" className="text-gray-600 hover:text-[#002a5c] transition">
              Regulamin
            </Link>
            <Link href="/polityka-prywatnosci" className="text-gray-600 hover:text-[#002a5c] transition">
              Polityka prywatności
            </Link>
           
          </div>
        </div>
      </div>
    </footer>
  );
}
