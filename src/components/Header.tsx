'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Mail, Phone, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import ServiceModal from './ServiceModal';


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="w-full bg-gray-50 border-b border-gray-200 shadow-sm ">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-[#002a5c]">
        <Image src="/images/wizaro-logo.png" alt="Logo" width={120} height={36}  placeholder="empty" />
        </Link>        {/* Desktop menu */}
        <nav className="hidden md:flex space-x-6 text-sm items-center">
          <div className="relative">
            <button 
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
              className="text-gray-700 hover:text-[#002a5c] transition-colors duration-200 flex items-center"
            >
              Usługi
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isDropdownOpen && (
              <div 
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              >
                <div className="py-2">
                  <Link 
                    href="/formularz-profil-bazy" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#002a5c] transition-colors duration-200"
                  >
                    Usuwanie GoWork, ALEO itp
                  </Link>
                  <Link 
                    href="/formularz-profil-google" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#002a5c] transition-colors duration-200"
                  >
                    Usuwanie Firmy z Map Google
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link href="/o-nas" className="text-gray-700 hover:text-[#002a5c] transition-colors duration-200">
            O nas
          </Link>
          <Link href="/kontakt" className="text-gray-700 hover:text-[#002a5c]">
            Kontakt
          </Link>
          <div className="flex flex-col items-end">
            <a href="tel:+48792861513" className="flex items-center text-gray-900 hover:underline font-medium">
              <Phone size={16} className="mr-1" /> +48 792 861 513
            </a>
           
          </div>
          <button
            onClick={openModal}
            className="flex items-center gap-1 text-gray-100 bg-[#002a5c] py-2 px-5 rounded font-medium hover:bg-[#00234d] transition-colors"
          >
            <PlayCircle size={18} className="mr-1" />
            Start
          </button>
          <a
            href="mailto:kontakt@wizaro.pl"
            className="flex items-center gap-1 text-gray-100 bg-[#002a5c] p-1 px-4 rounded"
          >
            <Mail size={16} />
          
          </a>
          <span>
            <svg width="30" height="20" viewBox="0 0 6 4" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0.1" dy="0.1" stdDeviation="0.1" floodColor="rgba(0,0,0,0.8)" />
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
      </div>      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 px-4 pb-4">
          <nav className="flex flex-col space-y-2 text-sm">
            <Link href="/formularz-profil-bazy" onClick={toggleMenu} className="text-gray-700 hover:text-[#002a5c] py-2 transition-colors duration-200">
              Usuwanie GoWork, ALEO itp
            </Link>
            <Link href="/formularz-profil-google" onClick={toggleMenu} className="text-gray-700 hover:text-[#002a5c] py-2 transition-colors duration-200">
              Usuwanie Firmy z Map Google
            </Link>
             <Link href="/o-nas" onClick={toggleMenu} className="text-gray-700 hover:text-[#002a5c] py-2 transition-colors duration-200">
              O nas
            </Link>
            <Link href="/kontakt" onClick={toggleMenu} className="text-gray-700 hover:text-[#002a5c] py-2">
              Kontakt
            </Link>
            <div className="py-2 flex flex-col">
              <a href="tel:+48792861513" className="flex items-center text-gray-900 hover:underline font-medium">
                <Phone size={16} className="mr-1" /> +48 792 861 513
              </a>
            </div>
            <div className='flex gap-2 py-2'>
              <button
                onClick={() => {
                  openModal();
                  toggleMenu();
                }}
                className="flex items-center gap-1 text-gray-100 bg-[#002a5c] py-2 px-4 rounded font-medium hover:bg-[#00234d] transition-colors"
              >
                <PlayCircle size={18} className="mr-1" />
                Start
              </button>
              <a
                href="mailto:kontakt@wizaro.pl"
                className="flex items-center gap-1 text-gray-100 bg-[#002a5c] p-1 px-4 rounded"
              >
                <Mail size={20} />
              </a>
            </div>
          </nav>
        </div>
      )}
      
      {/* Service Modal */}
      <ServiceModal isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
}
