'use client';

import { useState, useRef, useEffect } from 'react';

interface PowerOfAttorneyDropdownProps {
  orderId: string;
  showGoWork: boolean;
  showAleo: boolean;
}

export default function PowerOfAttorneyDropdown({
  orderId,
  showGoWork,
  showAleo
}: PowerOfAttorneyDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const navigateTo = (path: string) => {
    setIsOpen(false);
    window.open(path, '_blank');
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 flex items-center"
      >
        Pełnomocnictwa
        <svg
          className={`ml-1 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-lg py-1 z-10">
          {showGoWork && (
            <button
              onClick={() => navigateTo(`/dashboard/orders/${orderId}/generate-poa`)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Pełnomocnictwo GoWork
            </button>
          )}
          {showAleo && (
            <button
              onClick={() => navigateTo(`/dashboard/orders/${orderId}/generate-poa-aleo`)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Pełnomocnictwo Aleo
            </button>
          )}
        </div>
      )}
    </div>
  );
}
