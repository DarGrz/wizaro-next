import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: true
  },
});

interface Review {
  author: string;
  content: string;
  url?: string;
  date_added: string;
}

interface Company {
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  nip: string;
  street: string;
  city: string;
  zip: string;
  url?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { company, reviews, totalPrice, orderId } = body as {
      company: Company;
      reviews: Review[];
      totalPrice: number;
      orderId: string;
    };

    // Walidacja
    if (!company || !company.email || !reviews || reviews.length === 0) {
      return NextResponse.json(
        { error: 'Brak wymaganych danych' },
        { status: 400 }
      );
    }

    // Generuj listę opinii w HTML
    const reviewsListHTML = reviews.map((review, index) => `
      <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
        <p style="margin: 0 0 8px 0;"><strong>Opinia ${index + 1}</strong></p>
        <p style="margin: 4px 0;"><strong>Autor:</strong> ${review.author || 'Brak autora'}</p>
        ${review.content ? `<p style="margin: 4px 0;"><strong>Treść:</strong> ${review.content.substring(0, 150)}${review.content.length > 150 ? '...' : ''}</p>` : ''}
        ${review.date_added ? `<p style="margin: 4px 0;"><strong>Data dodania:</strong> ${review.date_added}</p>` : ''}
        ${company.url ? `<p style="margin: 4px 0;"><strong>Link do wizytówki:</strong> <a href="${company.url}" style="color: #2563eb; text-decoration: underline;">${company.url}</a></p>` : ''}
      </div>
    `).join('');

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: company.email,
      subject: `✅ Potwierdzenie przyjęcia zlecenia - ${company.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #002a5c; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">✅ Zlecenie zostało przyjęte!</h1>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <div style="background-color: #dcfce7; border-left: 4px solid #16a34a; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
              <p style="margin: 0; color: #166534; font-weight: 600;">Dziękujemy za zaufanie!</p>
              <p style="margin: 8px 0 0 0; color: #166534;">Twoje zlecenie zostało złożone pomyślnie i od razu trafiło do realizacji. Nasi specjaliści już się nim zajmują.</p>
            </div>

            <h2 style="color: #002a5c; font-size: 18px; margin-top: 24px; margin-bottom: 16px;">📋 Szczegóły zlecenia</h2>
            
            <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 4px 0;"><strong>ID zamówienia:</strong> ${orderId}</p>
              <p style="margin: 4px 0;"><strong>Firma:</strong> ${company.name}</p>
              <p style="margin: 4px 0;"><strong>Osoba kontaktowa:</strong> ${company.first_name} ${company.last_name}</p>
              <p style="margin: 4px 0;"><strong>Email:</strong> ${company.email}</p>
              ${company.phone ? `<p style="margin: 4px 0;"><strong>Telefon:</strong> ${company.phone}</p>` : ''}
              <p style="margin: 4px 0;"><strong>Liczba opinii do usunięcia:</strong> ${reviews.length}</p>
              <p style="margin: 4px 0;"><strong>Łączna wartość:</strong> ${totalPrice} zł brutto</p>
            </div>

            <h3 style="color: #002a5c; font-size: 16px; margin-top: 24px; margin-bottom: 12px;">📝 Zgłoszone opinie do usunięcia:</h3>
            ${reviewsListHTML}

            <div style="background-color: #dbeafe; border-left: 4px solid #2563eb; padding: 16px; margin-top: 24px; border-radius: 4px;">
              <h3 style="margin: 0 0 12px 0; color: #1e40af; font-size: 16px;">⏱️ Co dzieje się dalej?</h3>
              <ul style="margin: 0; padding-left: 20px; color: #1e40af;">
                <li style="margin-bottom: 8px;"><strong>Natychmiast:</strong> Twoje zlecenie od razu trafiło do realizacji</li>
                <li style="margin-bottom: 8px;"><strong>W trakcie realizacji:</strong> Nasi specjaliści już się nim zajmują</li>
                <li style="margin-bottom: 8px;"><strong>Po zakończeniu:</strong> Poinformujemy, jeśli opinia zostanie usunięta</li>
              </ul>
            </div>

            <div style="background-color: #f9fafb; padding: 20px; margin-top: 24px; border-radius: 8px; text-align: center;">
              <p style="margin: 0 0 8px 0; font-weight: 600; color: #002a5c;">Masz pytania?</p>
              <p style="margin: 0 0 4px 0;">📞 Telefon: <a href="tel:+48792861513" style="color: #002a5c; text-decoration: none; font-weight: 600;">+48 792 861 513</a></p>
              <p style="margin: 0; font-size: 12px; color: #6b7280;">Dostępny od poniedziałku do piątku, 9:00–17:00</p>
            </div>

            <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
              <p style="margin: 0;">© ${new Date().getFullYear()} Wizaro. Wszystkie prawa zastrzeżone.</p>
              <p style="margin: 8px 0 0 0;">Ta wiadomość została wysłana automatycznie. Prosimy nie odpowiadać na ten email.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    console.log('📧 Próba wysłania potwierdzenia zamówienia do:', company.email);

    // Weryfikacja połączenia SMTP
    try {
      await transporter.verify();
      console.log('✅ Połączenie SMTP zweryfikowane pomyślnie');
    } catch (verifyError) {
      console.error('❌ Błąd weryfikacji SMTP:', verifyError);
      throw verifyError;
    }

    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Potwierdzenie zamówienia wysłane:', {
      messageId: info.messageId,
      to: company.email
    });

    return NextResponse.json({ 
      success: true, 
      messageId: info.messageId 
    });

  } catch (error) {
    console.error('❌ Błąd wysyłki potwierdzenia zamówienia:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Wystąpił błąd podczas wysyłania emaila' 
      },
      { status: 500 }
    );
  }
}
