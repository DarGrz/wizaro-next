'use client';

import { useState } from 'react';

interface DeleteOrderButtonProps {
  orderId: string;
}

export default function DeleteOrderButton({ orderId }: DeleteOrderButtonProps) {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const showConfirmation = () => {
    setIsConfirmVisible(true);
  };

  const hideConfirmation = () => {
    setIsConfirmVisible(false);
  };

  return (
    <div className="relative group">
      <button
        type="button"
        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
        onClick={showConfirmation}
      >
        Usuń zamówienie
      </button>
      
      {/* Potwierdzenie usunięcia */}
      {isConfirmVisible && (
        <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-md p-4 border border-gray-200 z-10 w-64">
          <p className="text-sm text-gray-700 mb-3">
            Czy na pewno chcesz usunąć to zamówienie i wszystkie powiązane dane? Ta operacja jest nieodwracalna.
          </p>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm"
              onClick={hideConfirmation}
            >
              Anuluj
            </button>
            <form action="/dashboard/orders/api/delete-order" method="POST">
              <input type="hidden" name="id" value={orderId} />
              <input type="hidden" name="confirmed" value="true" />
              <button
                type="submit"
                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Tak, usuń
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}