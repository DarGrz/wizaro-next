import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/app/lib/mailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, honeypot } = body;

    // Sprawdzenie honeypot - jeśli wypełniony, to prawdopodobnie bot
    if (honeypot) {
      // Udajemy sukces, ale nie wysyłamy formularza
      return NextResponse.json({ success: true });
    }

    // Podstawowa walidacja
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Wszystkie pola są wymagane' },
        { status: 400 }
      );
    }

    // Walidacja email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Podaj poprawny adres e-mail' },
        { status: 400 }
      );
    }

    // Wysyłka email
    const result = await sendContactEmail({ name, email, message });

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      console.error('Błąd wysyłania wiadomości:', result.error);
      return NextResponse.json(
        { error: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Błąd przetwarzania żądania:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas przetwarzania żądania.' },
      { status: 500 }
    );
  }
}
