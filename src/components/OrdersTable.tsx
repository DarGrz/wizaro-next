'use client';

import { useState } from 'react';

type Order = {
  id: string;
  created_at: string;
  status: string;
  session_id: string;
  documents: {
    id: string;
    type: string;
    content: string;
    companies: {
      name: string;
      nip: string;
      email: string;
      phone: string;
      first_name: string;
      last_name: string;
      street: string;
      city: string;
      zip: string;
    } | null;
  } | null;
};

type OrdersTableProps = {
  orders: Order[];
};

export default function OrdersTable({ orders }: OrdersTableProps) {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'paid' && order.status === 'paid') ||
      (filter === 'pending' && order.status === 'pending') ||
      (filter === 'reviews' && order.documents?.type?.includes('opini')) ||
      (filter === 'profiles' && order.documents?.type?.includes('profil'));

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      searchTerm === '' ||
      order.documents?.companies?.name?.toLowerCase().includes(searchLower) ||
      order.documents?.companies?.nip?.includes(searchLower) ||
      order.documents?.companies?.email?.toLowerCase().includes(searchLower) ||
      order.documents?.companies?.phone?.includes(searchLower);

    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'all'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              Wszystkie
            </button>
            <button
              onClick={() => setFilter('paid')}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'paid'
                  ? 'bg-[#5BA155] bg-opacity-10 text-[#5BA155]'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              Opłacone
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              Oczekujące
            </button>
            <button
              onClick={() => setFilter('reviews')}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'reviews'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              Opinie
            </button>
            <button
              onClick={() => setFilter('profiles')}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'profiles'
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              Profile
            </button>
          </div>
          <input
            type="search"
            placeholder="Szukaj po nazwie, NIP, email lub telefonie..."
            className="flex-1 max-w-md px-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-white shadow rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Data</th>
                <th className="p-3">Firma</th>
                <th className="p-3">NIP</th>
                <th className="p-3">Email</th>
                <th className="p-3">Telefon</th>
                <th className="p-3">Typ</th>
                <th className="p-3">Status</th>
                <th className="p-3">ID Sesji</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className="border-t hover:bg-gray-50 cursor-pointer" 
                  onClick={() => setSelectedOrder(order)}
                >
                  <td className="p-3">
                    {new Date(order.created_at).toLocaleString('pl-PL')}
                  </td>
                  <td className="p-3">{order.documents?.companies?.name || '—'}</td>
                  <td className="p-3">{order.documents?.companies?.nip || '—'}</td>
                  <td className="p-3">{order.documents?.companies?.email || '—'}</td>
                  <td className="p-3">{order.documents?.companies?.phone || '—'}</td>
                  <td className="p-3">{order.documents?.type || '—'}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'paid'
                          ? 'bg-[#5BA155] bg-opacity-10 text-[#5BA155]'
                          : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {order.status === 'paid' ? 'Opłacone' : 
                       order.status === 'pending' ? 'Oczekuje' : 
                       order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="font-mono text-xs">{order.session_id}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal ze szczegółami zamówienia */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold">Szczegóły zamówienia</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            <div className="grid gap-4">
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Dane firmy</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><strong>Nazwa:</strong> {selectedOrder.documents?.companies?.name}</div>
                  <div><strong>NIP:</strong> {selectedOrder.documents?.companies?.nip}</div>
                  <div><strong>Osoba kontaktowa:</strong> {selectedOrder.documents?.companies?.first_name} {selectedOrder.documents?.companies?.last_name}</div>
                  <div><strong>Telefon:</strong> {selectedOrder.documents?.companies?.phone}</div>
                  <div><strong>Email:</strong> {selectedOrder.documents?.companies?.email}</div>
                  <div><strong>Adres:</strong> {selectedOrder.documents?.companies?.street}, {selectedOrder.documents?.companies?.zip} {selectedOrder.documents?.companies?.city}</div>
                </div>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Szczegóły zamówienia</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><strong>Data:</strong> {new Date(selectedOrder.created_at).toLocaleString('pl-PL')}</div>
                  <div><strong>Status:</strong> {selectedOrder.status === 'paid' ? 'Opłacone' : 'Oczekuje'}</div>
                  <div><strong>Typ usługi:</strong> {selectedOrder.documents?.type}</div>
                  <div><strong>ID sesji:</strong> {selectedOrder.session_id}</div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Treść dokumentu</h3>
                <div className="text-sm bg-gray-50 p-3 rounded">
                  {selectedOrder.documents?.content || 'Brak treści'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}