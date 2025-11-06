import nodemailer from 'nodemailer';

console.log('📧 Konfiguracja SMTP:', {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE,
  user: process.env.SMTP_USER,
  hasPass: !!process.env.SMTP_PASS
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465, // Stały port dla SSL/TLS
  secure: true, // Wymagane dla portu 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: true // Wymagaj prawidłowego certyfikatu SSL
  },
  debug: true,
  logger: true
});

interface Review {
  author: string;
  content: string;
  url?: string;
  date_added?: string;
  portal?: string;
  customPortal?: string;
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

export async function sendAdminNotification({
  orderType,
  companyName,
  orderId,
  company,
  reviews,
  totalPrice
}: {
  orderType: 'profile-removal' | 'review-removal';
  companyName: string;
  orderId: string;
  company?: Company;
  reviews?: Review[];
  totalPrice?: number;
}) {
  const adminEmail = 'kontakt@wizaro.pl'; // Stały adres email

  const orderTypeText = orderType === 'profile-removal' ? 'usunięcia profilu' : 'usunięcia opinii';
  const itemLabel = orderType === 'profile-removal' ? 'Profil' : 'Opinia';
  const listTitle = orderType === 'profile-removal' ? 'Zgłoszone profile do usunięcia:' : 'Zgłoszone opinie do usunięcia:';
  const itemCountLabel = orderType === 'profile-removal' ? 'Liczba profili:' : 'Liczba opinii:';
  
  // Generuj listę opinii/profili w HTML jeśli są dostępne
  const reviewsListHTML = reviews && reviews.length > 0 ? reviews.map((review, index) => {
    if (!review) return ''; // Safety check
    const portalName = review.portal === "Inne" ? (review.customPortal || "Inne") : (review.portal || '');
    
    return `
    <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
      <p style="margin: 0 0 8px 0;"><strong>${itemLabel} ${index + 1}</strong></p>
      <p style="margin: 4px 0;"><strong>${orderType === 'profile-removal' ? 'Nazwa firmy:' : 'Autor:'}</strong> ${review.author || 'Brak autora'}</p>
      ${review.content ? `<p style="margin: 4px 0;"><strong>${orderType === 'profile-removal' ? 'Szczegóły:' : 'Treść:'}</strong> ${review.content.substring(0, 150)}${review.content.length > 150 ? '...' : ''}</p>` : ''}
      ${review.date_added ? `<p style="margin: 4px 0;"><strong>Data dodania:</strong> ${review.date_added}</p>` : ''}
      ${portalName && orderType === 'profile-removal' ? `<p style="margin: 4px 0;"><strong>Portal:</strong> ${portalName}</p>` : ''}
      ${review.url ? `<p style="margin: 4px 0;"><strong>Link:</strong> <a href="${review.url}" style="color: #2563eb; text-decoration: underline;">${review.url}</a></p>` : ''}
      ${company?.url && orderType === 'review-removal' ? `<p style="margin: 4px 0;"><strong>Link do wizytówki:</strong> <a href="${company.url}" style="color: #2563eb; text-decoration: underline;">${company.url}</a></p>` : ''}
    </div>
  `}).join('') : '';
  
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: adminEmail,
    subject: `⚡ Nowe zamówienie: ${orderTypeText} - ${companyName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #dc2626; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">⚡ Nowe zamówienie w systemie!</h1>
        </div>
        
        <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
            <p style="margin: 0; color: #92400e; font-weight: 600;">Nowe zlecenie wymaga uwagi!</p>
            <p style="margin: 8px 0 0 0; color: #92400e;">Typ: <strong>${orderTypeText}</strong></p>
          </div>

          <h2 style="color: #dc2626; font-size: 18px; margin-top: 24px; margin-bottom: 16px;">📋 Szczegóły zlecenia</h2>
          
          <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 4px 0;"><strong>ID zamówienia:</strong> ${orderId}</p>
            ${company ? `
              <p style="margin: 4px 0;"><strong>Firma:</strong> ${company.name}</p>
              <p style="margin: 4px 0;"><strong>NIP:</strong> ${company.nip}</p>
              <p style="margin: 4px 0;"><strong>Osoba kontaktowa:</strong> ${company.first_name} ${company.last_name}</p>
              <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${company.email}" style="color: #2563eb;">${company.email}</a></p>
              ${company.phone ? `<p style="margin: 4px 0;"><strong>Telefon:</strong> <a href="tel:${company.phone}" style="color: #2563eb;">${company.phone}</a></p>` : ''}
              <p style="margin: 4px 0;"><strong>Adres:</strong> ${company.street}, ${company.zip} ${company.city}</p>
            ` : `<p style="margin: 4px 0;"><strong>Firma:</strong> ${companyName}</p>`}
            ${reviews ? `<p style="margin: 4px 0;"><strong>${itemCountLabel}</strong> ${reviews.length}</p>` : ''}
            ${totalPrice ? `<p style="margin: 4px 0;"><strong>Wartość:</strong> ${totalPrice/100} zł brutto</p>` : ''}
          </div>

          ${reviewsListHTML ? `
            <h3 style="color: #dc2626; font-size: 16px; margin-top: 24px; margin-bottom: 12px;">📝 ${listTitle}</h3>
            ${reviewsListHTML}
          ` : ''}

          <div style="background-color: #dbeafe; border-left: 4px solid #2563eb; padding: 16px; margin-top: 24px; border-radius: 4px;">
            <h3 style="margin: 0 0 12px 0; color: #1e40af; font-size: 16px;">⚡ Wymagane działania:</h3>
            <ul style="margin: 0; padding-left: 20px; color: #1e40af;">
              <li style="margin-bottom: 8px;">Sprawdź szczegóły zamówienia w panelu administracyjnym</li>
              <li style="margin-bottom: 8px;">Skontaktuj się z klientem w ciągu 24h</li>
              <li style="margin-bottom: 8px;">Rozpocznij realizację zlecenia</li>
            </ul>
          </div>

          <div style="background-color: #f9fafb; padding: 20px; margin-top: 24px; border-radius: 8px; text-align: center;">
            <a href="https://wizaro.pl/dashboard" style="display: inline-block; background-color: #dc2626; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">
              Przejdź do panelu administracyjnego
            </a>
          </div>

          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Wizaro - Panel Administracyjny</p>
            <p style="margin: 8px 0 0 0;">To powiadomienie zostało wysłane automatycznie.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
  try {
    console.log('📧 Próba wysłania powiadomienia:', {
      to: adminEmail,
      from: mailOptions.from,
      subject: mailOptions.subject,
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL
    });

    // Weryfikacja połączenia przed wysłaniem
    try {
      await transporter.verify();
      console.log('✅ Połączenie SMTP zweryfikowane pomyślnie');
    } catch (verifyError) {
      console.error('❌ Błąd weryfikacji SMTP:', verifyError);
      throw verifyError;
    }

    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Powiadomienie wysłane:', {
      messageId: info.messageId,
      response: info.response,
      envelope: info.envelope
    });
    return info;
  } catch (error) {
    console.error('❌ Błąd wysyłki powiadomienia:', error);
    throw error;
  }
}

export async function sendContactEmail({
  name,
  email,
  message
}: {
  name: string;
  email: string;
  message: string;
}) {
  const adminEmail = 'd.grzegorczyk@outlook.com'; // Domyślny adres odbiorcy

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: adminEmail,
    replyTo: email,
    subject: `📝 Nowa wiadomość kontaktowa od ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Nowa wiadomość kontaktowa</h2>
        <p><strong>Od:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <div>
          <h3>Wiadomość:</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      </div>
    `
  };
  
  try {
    console.log('📧 Próba wysłania wiadomości kontaktowej:', {
      to: adminEmail,
      from: mailOptions.from,
      subject: mailOptions.subject
    });

    // Weryfikacja połączenia przed wysłaniem
    try {
      await transporter.verify();
      console.log('✅ Połączenie SMTP zweryfikowane pomyślnie');
    } catch (verifyError) {
      console.error('❌ Błąd weryfikacji SMTP:', verifyError);
      throw verifyError;
    }

    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Wiadomość kontaktowa wysłana:', {
      messageId: info.messageId,
      response: info.response,
      envelope: info.envelope
    });
    return { success: true, info };
  } catch (error) {
    console.error('❌ Błąd wysyłki wiadomości kontaktowej:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Wystąpił nieznany błąd podczas wysyłania wiadomości' 
    };
  }
}
