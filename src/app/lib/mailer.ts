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

export async function sendAdminNotification({
  orderType,
  companyName,
  orderId
}: {
  orderType: 'profile-removal' | 'review-removal';
  companyName: string;
  orderId: string;
}) {
  const adminEmail = 'kontakt@wizaro.pl'; // Stały adres email

  const orderTypeText = orderType === 'profile-removal' ? 'usunięcia profilu' : 'usunięcia opinii';
  
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: adminEmail,
    subject: `⚡ Nowe zamówienie: ${orderTypeText} - ${companyName}`,
    html: `
      <h2>Nowe zamówienie w systemie</h2>
      <p>Typ: <strong>${orderTypeText}</strong></p>
      <p>Firma: <strong>${companyName}</strong></p>
      <p>ID zamówienia: <strong>${orderId}</strong></p>
      <p>Link do zamówienia: <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/orders/${orderId}">${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/orders/${orderId}</a></p>
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
