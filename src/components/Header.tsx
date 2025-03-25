'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="w-full bg-gray-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        
        <Link href="/" className="text-xl font-bold text-[#002a5c]">
          Wizaro.pl
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex space-x-6 text-sm items-center">
          <Link href="/formularz" className="text-gray-700 hover:text-[#002a5c]">
            Formularz
          </Link>
          <Link href="/kontakt" className="text-gray-700 hover:text-[#002a5c]">
            Kontakt
          </Link>
          <Link href="/regulamin" className="text-gray-700 hover:text-[#002a5c]">
            Regulamin
          </Link>
          <Link href="/polityka-prywatnosci" className="text-gray-700 hover:text-[#002a5c]">
            Prywatność
          </Link>
          <span className=""><svg width="30" height="20" viewBox="0 0 6 4" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0.1" dy="0.1" stdDeviation="0.1" flood-color="rgba(0,0,0,0.8)" />
    </filter>
  </defs>
  <g filter="url(#shadow)">
    <rect width="6" height="2" y="0" fill="#ffffff" />
    <rect width="6" height="2" y="2" fill="#dc143c" />
  </g>
</svg>

</span>
        </nav>
        

        {/* Mobile hamburger */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 px-4 pb-4">
          <nav className="flex flex-col space-y-2 text-sm">
            <Link href="/formularz" className="text-gray-700 hover:text-[#002a5c]">
              Formularz
            </Link>
            <Link href="/kontakt" className="text-gray-700 hover:text-[#002a5c]">
              Kontakt
            </Link>
            <Link href="/regulamin" className="text-gray-700 hover:text-[#002a5c]">
              Regulamin
            </Link>
            <Link href="/polityka-prywatnosci" className="text-gray-700 hover:text-[#002a5c]">
              Prywatność
            </Link>
            
          </nav>
        </div>
      )}
    </header>
  );
}
