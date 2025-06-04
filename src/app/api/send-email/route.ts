import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Walidacja
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Wszystkie pola są wymagane' },
        { status: 400 }
      );
    }
    
    // Walidacja adresu email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Podany adres email jest niepoprawny' },
        { status: 400 }
      );
    }    // Konfiguracja transportera e-mail
    const transporter = nodemailer.createTransport({
      host: 'mail-serwer217040.lh.pl',
      port: 587, // Standardowy port SMTP z TLS
      secure: false, // true dla 465, false dla innych portów
      auth: {
        user: process.env.SMTP_USER || '', // Użytkownik SMTP
        pass: process.env.SMTP_PASSWORD || '', // Hasło SMTP
      },
      tls: {
        rejectUnauthorized: false // Dopuszcza certyfikaty self-signed, pomocne w lokalnym środowisku
      },
      debug: process.env.NODE_ENV !== 'production', // Włącz debugowanie w środowisku deweloperskim
    });

    // Weryfikacja połączenia z serwerem SMTP
    try {
      await transporter.verify();
      console.log('Połączenie z serwerem SMTP zostało ustanowione');
    } catch (error) {
      console.error('Błąd połączenia z serwerem SMTP:', error);
      return NextResponse.json(
        { error: 'Nie można połączyć się z serwerem e-mail. Spróbuj ponownie później.' },
        { status: 500 }
      );
    }

    // Opcje e-mail
    const mailOptions = {
      from: `"Formularz kontaktowy" <${process.env.SMTP_USER || 'kontakt@wizaro.pl'}>`,
      to: 'kontakt@wizaro.pl', // Adres odbiorcy
      replyTo: email,
      subject: `Wiadomość z formularza kontaktowego od ${name}`,
      text: `
        Nowa wiadomość z formularza kontaktowego:
        
        Od: ${name}
        Email: ${email}
        
        Treść wiadomości:
        ${message}
      `,
      html: `
        <h2>Nowa wiadomość z formularza kontaktowego</h2>
        <p><strong>Od:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Treść wiadomości:</strong></p>
        <div style="padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          Ta wiadomość została wysłana przez formularz kontaktowy na stronie wizaro.pl
        </p>
      `,
    };    // Wysyłanie e-maila
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Wiadomość wysłana: %s', info.messageId);
      
      return NextResponse.json(
        { success: true, message: 'Wiadomość została wysłana', messageId: info.messageId },
        { status: 200 }
      );
    } catch (sendError) {
      console.error('Błąd wysyłania e-maila:', sendError);
      return NextResponse.json(
        { error: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Błąd przetwarzania żądania:', error);
    return NextResponse.json(
      { error: 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.' },
      { status: 500 }
    );
  }
}
