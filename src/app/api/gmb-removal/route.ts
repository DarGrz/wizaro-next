'use server';

import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Tutaj można dodać logikę obsługi danych formularza
    // Na przykład zapisywanie ich do bazy danych lub wysyłanie e-maila
    
    // Przykład: sprawdzanie wymaganych pól
    const requiredFields = ['businessName', 'businessId', 'name', 'email', 'phone'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return Response.json(
          { error: `Brak wymaganego pola: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Przykład: logowanie danych do konsoli (tylko do celów rozwojowych)
    console.log('Otrzymano dane formularza usunięcia wizytówki Google:', data);
    
    // Tutaj możesz dodać integrację z bazą danych, systemem CRM, itp.
    
    // Zwracamy sukces
    return Response.json({ success: true, message: 'Zgłoszenie zostało przyjęte' });
  } catch (error) {
    console.error('Błąd podczas przetwarzania zgłoszenia GMB:', error);
    return Response.json(
      { error: 'Wystąpił błąd podczas przetwarzania zgłoszenia' },
      { status: 500 }
    );
  }
}
