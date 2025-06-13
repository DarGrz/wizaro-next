import React from 'react';
import { Metadata } from 'next';
import BusinessTypeSelectorGowork from '@/components/BusinessTypeSelectorGowork';

export const metadata: Metadata = {
  title: 'Rozwiązanie problemu z Gowork',
  description: 'Profesjonalna pomoc w rozwiązaniu problemu z serwisem Gowork',
};

export default function GoworkRemoval() {
  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <BusinessTypeSelectorGowork />
    </div>
  );
}
