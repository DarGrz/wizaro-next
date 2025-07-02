'use client';

import { X } from 'lucide-react';

interface Company {
  name: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  zip: string;
  nip: string;
}

interface Order {
  id: string;
  created_at: string;
  status: 'paid' | 'pending';
  payment_id?: string;
  url?: string;
  companies?: Company;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export default function OrderModal({ isOpen, onClose, order }: ModalProps) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Szczegóły zamówienia</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Dane firmy */}
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">Dane firmy</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><strong>Nazwa:</strong> {order.companies?.name}</div>
                <div><strong>NIP:</strong> {order.companies?.nip}</div>
                <div><strong>Osoba kontaktowa:</strong> {order.companies?.first_name} {order.companies?.last_name}</div>
                <div><strong>Telefon:</strong> {order.companies?.phone}</div>
                <div><strong>Email:</strong> {order.companies?.email}</div>
                <div><strong>Adres:</strong> {order.companies?.street}, {order.companies?.zip} {order.companies?.city}</div>
              </div>
            </div>

            {/* Dane zlecenia */}
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">Dane zlecenia</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><strong>Data złożenia:</strong> {new Date(order.created_at).toLocaleString('pl-PL')}</div>
                <div><strong>Status:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    order.status === 'paid' 
                      ? 'bg-[#5BA155] bg-opacity-10 text-[#5BA155]'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status === 'paid' ? 'Opłacone' : 'Oczekuje'}
                  </span>
                </div>
                <div><strong>ID zamówienia:</strong> {order.id}</div>
                {order.payment_id && <div><strong>ID płatności:</strong> {order.payment_id}</div>}
              </div>
            </div>

            {/* Linki */}
            {order.url && (
              <div>
                <h3 className="font-medium mb-2">Link do profilu</h3>
                <a 
                  href={order.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline break-all"
                >
                  {order.url}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}