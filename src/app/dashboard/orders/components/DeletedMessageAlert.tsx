'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DeletedMessageAlert() {
  const searchParams = useSearchParams();
  const [showAlert, setShowAlert] = useState(false);
  
  useEffect(() => {
    if (searchParams.get('deleted') === 'true') {
      setShowAlert(true);
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [searchParams]);
  
  if (!showAlert) return null;
  
  return (
    <div className="bg-[#5BA155] bg-opacity-10 border border-[#5BA155] border-opacity-30 text-[#5BA155] px-4 py-3 rounded relative mb-6" role="alert">
      <strong className="font-bold mr-1">Sukces!</strong>
      <span className="block sm:inline">Zamówienie zostało pomyślnie usunięte.</span>
      <button 
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
        onClick={() => setShowAlert(false)}
      >
        <span className="sr-only">Zamknij</span>
        <svg className="fill-current h-6 w-6 text-[#5BA155]" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </button>
    </div>
  );
}
