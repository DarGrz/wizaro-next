'use client';

import { useState, useTransition } from 'react';
import { deleteOrder } from '@/app/dashboard/orders/actions';

interface DeleteOrderButtonProps {
  orderId: string;
}

export default function DeleteOrderButton({ orderId }: DeleteOrderButtonProps) {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isPending, startTransition] = useTransition();
  
  const showConfirmation = () => {
    setIsConfirmVisible(true);
  };

  const hideConfirmation = () => {
    setIsConfirmVisible(false);
  };
    const handleDelete = async (formData: FormData) => {
    startTransition(() => {
      deleteOrder(formData)
        .catch(error => {
          // Ignoruj błąd NEXT_REDIRECT - to jest oczekiwane zachowanie
          if (!error.digest?.startsWith('NEXT_REDIRECT')) {
            console.error('Błąd podczas usuwania zamówienia:', error);
            alert('Wystąpił błąd podczas usuwania zamówienia. Spróbuj ponownie.');
          }
          // W przypadku błędu przekierowania, po prostu pozwól Next.js obsłużyć przekierowanie
        });
    });
  };

  return (
    <div className="relative group">
      <button
        type="button"
        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-70"
        onClick={showConfirmation}
        disabled={isPending}
      >
        {isPending ? 'Usuwanie...' : 'Usuń zamówienie'}
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
              disabled={isPending}
            >
              Anuluj
            </button>
            <form action={handleDelete}>
              <input type="hidden" name="id" value={orderId} />
              <input type="hidden" name="confirmed" value="true" />
              <button
                type="submit"
                className="bg-red-600 text-white px-3 py-1 rounded text-sm disabled:opacity-70"
                disabled={isPending}
              >
                {isPending ? 'Usuwanie...' : 'Tak, usuń'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
