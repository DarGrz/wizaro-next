import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';
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

    const company = documentData.company as CompanyData;
    
    // Wygeneruj HTML dla PDF
    const htmlContent = generateRODOHTML(company);
    
    // Wygeneruj PDF za pomocą Puppeteer
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

    // Zwróć PDF jako response
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="wniosek_rodo_${company.name.replace(/[^a-z0-9]/gi, '_')}.pdf"`
      }
    });

  } catch (err) {
    console.error('❌ Błąd generowania PDF:', err);
    return NextResponse.json({ error: 'Błąd generowania PDF' }, { status: 500 });
  }
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