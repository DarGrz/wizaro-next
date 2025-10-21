import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';
import nodemailer from 'nodemailer';
import puppeteer from 'puppeteer';

interface CompanyData {
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  nip: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
  link: string;
}

export async function POST(req: NextRequest) {
  try {
    const { document_id } = await req.json();

    if (!document_id) {
      return NextResponse.json({ error: 'Brak ID dokumentu' }, { status: 400 });
    }

    // Pobierz dane dokumentu z bazy
    const { data: documentData, error: docError } = await supabase
      .from('documents')
      .select(`
        *,
        company:companies(*)
      `)
      .eq('id', document_id)
      .single();

    if (docError || !documentData) {
      console.error('❌ Błąd pobierania dokumentu:', docError);
      return NextResponse.json({ error: 'Nie znaleziono dokumentu' }, { status: 404 });
    }

    // Sprawdź czy email już został wysłany
    if (documentData.email_sent_at) {
      console.log('ℹ️ Email już został wysłany:', documentData.email_sent_at);
      return NextResponse.json({ 
        success: true, 
        message: 'Email z wnioskiem RODO został już wcześniej wysłany!',
        sent_at: documentData.email_sent_at
      });
    }

    const company = documentData.company as CompanyData;
    
    // Wygeneruj PDF wniosku RODO
    const rodoPdfBuffer = await generateRODOPDF(company);
    
    // Wyślij email z PDF
    await sendRODOEmail(company, rodoPdfBuffer);

    // Zaktualizuj status dokumentu jako wysłany
    const { error: updateError } = await supabase
      .from('documents')
      .update({ 
        email_sent_at: new Date().toISOString(),
        status: 'sent' 
      })
      .eq('id', document_id);

    if (updateError) {
      console.error('❌ Błąd aktualizacji statusu dokumentu:', updateError);
      // Email został wysłany, ale nie udało się zaktualizować statusu
      // Nie zwracamy błędu, bo email dotarł do klienta
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Email z wnioskiem RODO został wysłany pomyślnie!',
      sent_at: new Date().toISOString()
    });

  } catch (err) {
    console.error('❌ Błąd wysyłania emaila:', err);
    return NextResponse.json({ 
      error: 'Błąd wysyłania emaila z wnioskiem RODO' 
    }, { status: 500 });
  }
}

async function generateRODOPDF(company: CompanyData): Promise<Buffer> {
  const htmlContent = generateRODOHTML(company);
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'load' });
  
  const pdfBuffer = await page.pdf({
    format: 'A4',
    margin: {
      top: '2.3cm',
      right: '2.3cm',
      bottom: '2.3cm',
      left: '2.3cm'
    },
    printBackground: true
  });
  
  await browser.close();
  return Buffer.from(pdfBuffer);
}

async function sendRODOEmail(company: CompanyData, rodoPdfBuffer: Buffer) {
  // Konfiguracja transportera SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const emailSubject = `Wniosek RODO dla ${company.name} - gotowy do wysłania`;
  const emailHtml = createEmailTemplate(company);

  const mailOptions = {
    from: `"Wizaro.pl - Ochrona Danych" <${process.env.SMTP_USER}>`,
    to: company.email,
    subject: emailSubject,
    html: emailHtml,
    attachments: [
      {
        filename: `wniosek_rodo_${company.name.replace(/[^a-z0-9]/gi, '_')}.pdf`,
        content: rodoPdfBuffer,
        contentType: 'application/pdf'
      }
    ]
  };

  await transporter.sendMail(mailOptions);
}

function createEmailTemplate(company: CompanyData): string {
  return `
  <!DOCTYPE html>
  <html lang="pl">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wniosek RODO</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
        line-height: 1.6;
        color: #2c3e50;
        margin: 0;
        padding: 20px;
        background: #f8f9fa;
      }
      .email-container {
        max-width: 700px;
        margin: 0 auto;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        overflow: hidden;
      }
      .email-header {
        background: #3498db;
        color: white;
        padding: 20px;
        text-align: center;
      }
      .email-header h1 {
        margin: 0;
        font-size: 22px;
      }
      .email-body {
        padding: 30px;
      }
      .greeting {
        font-size: 16px;
        margin-bottom: 20px;
        color: #2c3e50;
      }
      .content-text {
        color: #34495e;
        line-height: 1.7;
        margin-bottom: 15px;
      }
      .attachment-info {
        background: #ecf0f1;
        border-left: 4px solid #3498db;
        padding: 15px;
        margin: 20px 0;
        border-radius: 4px;
      }
      .attachment-info strong {
        color: #2c3e50;
      }
      .instructions {
        background: #e8f5e8;
        border: 1px solid #27ae60;
        padding: 20px;
        margin: 20px 0;
        border-radius: 6px;
      }
      .instructions h3 {
        color: #27ae60;
        margin: 0 0 15px 0;
        font-size: 16px;
      }
      .step {
        margin: 8px 0;
        color: #2c3e50;
      }
      .footer {
        background: #34495e;
        color: white;
        padding: 20px;
        text-align: center;
        font-size: 14px;
      }
      .footer a {
        color: #3498db;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h1>Wniosek RODO - ${company.name}</h1>
      </div>
      
      <div class="email-body">
        <div class="greeting">
          Dzień dobry ${company.first_name} ${company.last_name},
        </div>
        
        <p class="content-text">
          Zgodnie z Pani/Pana prośbą, przygotowaliśmy gotowy wniosek RODO dla firmy <strong>${company.name}</strong>.
        </p>
        
        <div class="attachment-info">
          <strong>📎 Załącznik:</strong> Kompletny wniosek o dostęp do danych osobowych w formacie PDF
        </div>
        
        <div class="instructions">
          <h3>📋 Instrukcja krok po kroku:</h3>
          <div class="step"><strong>1.</strong> Pobierz załączony plik PDF z wnioskiem</div>
          <div class="step"><strong>2.</strong> Otwórz PDF i skopiuj treść wniosku</div>
          <div class="step"><strong>3.</strong> Wklej treść do nowego e-maila</div>
          <div class="step"><strong>4.</strong> Uzupełnij miejsce "[imię i nazwisko]" swoimi danymi</div>
          <div class="step"><strong>5.</strong> Wyślij na adres kontaktowy portalu</div>
        </div>
        
        <p class="content-text">
          Wniosek jest w pełni zgodny z przepisami RODO i zawiera wszystkie wymagane elementy. Portal ma obowiązek odpowiedzieć w terminie 30 dni kalendarzowych.
        </p>
        
        <p class="content-text">
          W razie pytań jesteśmy do dyspozycji.
        </p>
      </div>
      
      <div class="footer">
        <p>Pozdrawiamy serdecznie,<br><strong>Zespół Wizaro.pl</strong></p>
        <p>
          🌐 <a href="https://wizaro.pl">wizaro.pl</a> | 
          📧 kontakt@wizaro.pl | 
          📱 Pomoc online
        </p>
      </div>
    </div>
  </body>
  </html>
  `;
}

function generateRODOHTML(company: CompanyData): string {
  const currentDate = new Date().toLocaleDateString('pl-PL');
  
  return `
    <!DOCTYPE html>
    <html lang="pl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Wniosek RODO - ${company.name}</title>
        <style>
            @page {
                size: A4;
                margin: 35px;
            }
            body {
                font-family: 'Times New Roman', serif;
                font-size: 14px;
                line-height: 1.6;
                color: #000;
                margin: 0;
                padding: 0;
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 2px solid #000;
                padding-bottom: 15px;
            }
            .title {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .content {
                margin-bottom: 20px;
                line-height: 1.8;
            }
            .content p {
                margin-bottom: 15px;
            }
            .signature {
                margin-top: 40px;
                text-align: right;
            }
            .signature-line {
                border-bottom: 1px solid #000;
                width: 200px;
                margin-left: auto;
                margin-bottom: 5px;
            }
            .date {
                text-align: right;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="title">WNIOSEK O USUNIĘCIE DANYCH OSOBOWYCH</div>
            <div>zgodnie z art. 17 RODO</div>
        </div>

        <div class="date">
            Data: ${currentDate}
        </div>

        <div class="content">
            <p><strong>Temat: Wniosek o usunięcie danych firmy ${company.name}</strong></p>
            
            <p>Szanowni Państwo,</p>
            
            <p>Zwracam się z uprzejmą prośbą o trwałe usunięcie danych dotyczących mojej działalności gospodarczej, umieszczonych na Państwa portalu:</p>
            
            <p><strong>Nazwa firmy:</strong> ${company.name}</p>
            <p><strong>NIP:</strong> ${company.nip}</p>
            <p><strong>Link do wpisu:</strong> ${company.link}</p>
            
            <p>Podstawą tej prośby jest art. 17 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO). Jednocześnie proszę o zgłoszenie wskazanej strony do usunięcia z indeksu wyszukiwarki Google, aby ograniczyć jej dalszą widoczność.</p>
            
            <p>Wycofuję wszelkie udzielone wcześniej zgody na przetwarzanie moich danych w celach marketingowych, promocyjnych lub innych.</p>
            
            <p>Z poważaniem,</p>
            <div>${company.first_name} ${company.last_name}</div>
        </div>

        
    </body>
    </html>
  `;
}