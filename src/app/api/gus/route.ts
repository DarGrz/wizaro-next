import { NextRequest, NextResponse } from 'next/server';

const GUS_API_URL = process.env.BIR_API_URL!;
const GUS_API_KEY = process.env.BIR_API_KEY!;

interface GUSCompanyData {
  name: string;
  street: string;
  city: string;
  zip: string;
  nip: string;
  regon: string;
  krs?: string;
}

export async function POST(request: NextRequest) {
  try {
    console.log('GUS API Request started');
    console.log('Environment variables check:');
    console.log('BIR_API_URL:', process.env.BIR_API_URL ? 'SET' : 'NOT SET');
    console.log('BIR_API_KEY:', process.env.BIR_API_KEY ? 'SET' : 'NOT SET');

    if (!process.env.BIR_API_URL || !process.env.BIR_API_KEY) {
      console.error('Missing environment variables for GUS API');
      return NextResponse.json({ 
        error: 'Konfiguracja serwera - brak zmiennych środowiskowych' 
      }, { status: 500 });
    }

    const { nip } = await request.json();

    if (!nip) {
      return NextResponse.json({ error: 'NIP jest wymagany' }, { status: 400 });
    }

    console.log('Searching for NIP:', nip);

    // Step 1: Login to GUS API
    const sessionId = await loginToGUS();
    
    if (!sessionId) {
      return NextResponse.json({ error: 'Błąd logowania do GUS' }, { status: 500 });
    }

    console.log('Login successful, session ID obtained');

    // Step 2: Search for company by NIP
    const companyData = await searchCompanyByNIP(sessionId, nip);
    
    if (!companyData) {
      return NextResponse.json({ error: 'Nie znaleziono firmy o podanym NIP' }, { status: 404 });
    }

    console.log('Company data found successfully');
    return NextResponse.json({ success: true, data: companyData });

  } catch (error) {
    console.error('GUS API Error:', error);
    // Log more detailed error information
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json({ error: 'Błąd podczas pobierania danych z GUS' }, { status: 500 });
  }
}

async function loginToGUS(): Promise<string | null> {
  console.log('Attempting to login to GUS API...');
  console.log('Using URL:', GUS_API_URL);
  
  const soapEnvelope = `
    <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07">
      <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
        <wsa:To>${GUS_API_URL}</wsa:To>
        <wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Zaloguj</wsa:Action>
      </soap:Header>
      <soap:Body>
        <ns:Zaloguj>
          <ns:pKluczUzytkownika>${GUS_API_KEY}</ns:pKluczUzytkownika>
        </ns:Zaloguj>
      </soap:Body>
    </soap:Envelope>
  `;

  try {
    console.log('Sending SOAP request to GUS...');
    const response = await fetch(GUS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/soap+xml; charset=utf-8',
        'SOAPAction': 'http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Zaloguj',
        'User-Agent': 'Mozilla/5.0 (compatible; GUS-API-Client/1.0)'
      },
      body: soapEnvelope,
      // Add timeout for production environments
      signal: AbortSignal.timeout(30000) // 30 seconds timeout
    });

    console.log('Response status:', response.status, response.statusText);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      console.error('GUS Login response not OK:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error response body:', errorText);
      return null;
    }

    const responseText = await response.text();
    console.log('GUS Login Response length:', responseText.length);
    console.log('GUS Login Response (first 500 chars):', responseText.substring(0, 500));
    
    // Check for SOAP faults first
    if (responseText.includes('soap:Fault') || responseText.includes('faultstring')) {
      console.error('SOAP fault detected in login response');
      console.error('Full response:', responseText);
      return null;
    }
    
    // Extract session ID from ZalogujResult
    const sessionIdMatch = responseText.match(/<ZalogujResult>(.*?)<\/ZalogujResult>/);
    
    if (sessionIdMatch && sessionIdMatch[1]) {
      const sessionId = sessionIdMatch[1];
      console.log('Extracted Session ID:', sessionId);
      
      // Validate session ID format
      if (sessionId.length > 0 && sessionId !== '') {
        return sessionId;
      } else {
        console.error('Invalid session ID format:', sessionId);
        return null;
      }
    }
    
    console.error('Could not extract session ID from response');
    console.error('Full response for debugging:', responseText);
    return null;
  } catch (error) {
    console.error('Login to GUS failed with error:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return null;
  }
}

async function searchCompanyByNIP(sessionId: string, nip: string): Promise<GUSCompanyData | null> {
  console.log('Searching for company with NIP:', nip);
  console.log('Using session ID:', sessionId);
  
  const cleanNip = nip.replace(/[^0-9]/g, '');
  console.log('Cleaned NIP:', cleanNip);
  
  const soapEnvelope = `
    <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07" xmlns:dat="http://CIS/BIR/PUBL/2014/07/DataContract">
      <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
        <wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DaneSzukajPodmioty</wsa:Action>
        <wsa:To>${GUS_API_URL}</wsa:To>
      </soap:Header>
      <soap:Body>
        <ns:DaneSzukajPodmioty>
          <ns:pParametryWyszukiwania>
            <dat:Nip>${cleanNip}</dat:Nip>
          </ns:pParametryWyszukiwania>
        </ns:DaneSzukajPodmioty>
      </soap:Body>
    </soap:Envelope>
  `;
  
  try {
    console.log('Sending search request to GUS...');
    const response = await fetch(GUS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/soap+xml; charset=utf-8',
        'SOAPAction': 'http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DaneSzukajPodmioty',
        'sid': sessionId,
        'User-Agent': 'Mozilla/5.0 (compatible; GUS-API-Client/1.0)'
      },
      body: soapEnvelope,
      signal: AbortSignal.timeout(30000) // 30 seconds timeout
    });

    console.log('Search response status:', response.status, response.statusText);

    if (!response.ok) {
      console.error('GUS Search response not OK:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Search error response body:', errorText);
      return null;
    }

    const responseText = await response.text();
    console.log('GUS Search Response length:', responseText.length);
    console.log('GUS Search Response (first 1000 chars):', responseText.substring(0, 1000));
    
    // Check if there's an error in the response
    if (responseText.includes('ErrorCode') || responseText.includes('soap:Fault')) {
      console.error('GUS API returned an error in search response');
      console.error('Full error response:', responseText);
      return null;
    }
    
    // Parse XML response to extract company data
    const companyData = parseCompanyDataFromXML(responseText);
    
    if (companyData) {
      console.log('Successfully parsed company data:', companyData);
    } else {
      console.error('Failed to parse company data from response');
    }
    
    return companyData;
  } catch (error) {
    console.error('Search company by NIP failed with error:', error);
    if (error instanceof Error) {
      console.error('Search error name:', error.name);
      console.error('Search error message:', error.message);
    }
    return null;
  }
}

function parseCompanyDataFromXML(xmlResponse: string): GUSCompanyData | null {
  try {
    console.log('Parsing XML response for company data');
      // First check if we have a DaneSzukajPodmiotyResult
    const resultMatch = xmlResponse.match(/<DaneSzukajPodmiotyResult>([\s\S]*?)<\/DaneSzukajPodmiotyResult>/);
    
    if (!resultMatch || !resultMatch[1]) {
      console.error('No DaneSzukajPodmiotyResult found in response');
      return null;
    }
      const resultData = resultMatch[1];
    console.log('Found result data:', resultData);
      // Decode HTML entities in the XML data and fix character encoding
    let decodedData = resultData
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#xD;/g, '\r')
      .replace(/&#xA;/g, '\n')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'");
    
    // Try to decode any remaining encoded characters
    try {
      decodedData = decodeURIComponent(decodedData);    } catch {
      // If decoding fails, continue with the current data
    }
    
    console.log('Decoded result data:', decodedData);
      // Extract company data from the decoded XML
    const nameMatch = decodedData.match(/<Nazwa>(.*?)<\/Nazwa>/);
    const streetMatch = decodedData.match(/<Ulica>(.*?)<\/Ulica>/);
    const buildingMatch = decodedData.match(/<NrNieruchomosci>(.*?)<\/NrNieruchomosci>/);
    const cityMatch = decodedData.match(/<Miejscowosc>(.*?)<\/Miejscowosc>/);
    const zipMatch = decodedData.match(/<KodPocztowy>(.*?)<\/KodPocztowy>/);
    const nipMatch = decodedData.match(/<Nip>(.*?)<\/Nip>/);
    const regonMatch = decodedData.match(/<Regon>(.*?)<\/Regon>/);

    if (nameMatch && nameMatch[1]) {
      // Combine street and building number
      let fullStreet = streetMatch?.[1] || '';
      if (buildingMatch?.[1]) {
        fullStreet += fullStreet ? ` ${buildingMatch[1]}` : buildingMatch[1];
      }      const companyData = {
        name: nameMatch[1] || '',
        street: fullStreet,
        city: cityMatch?.[1] || '',
        zip: zipMatch?.[1] || '',
        nip: nipMatch?.[1] || '',
        regon: regonMatch?.[1] || '',
        krs: undefined // KRS is not typically returned in basic search
      };
      
      console.log('Parsed company data:', companyData);
      return companyData;
    }

    console.error('Could not find company name in the response');
    return null;
  } catch (error) {
    console.error('Failed to parse company data from XML:', error);
    return null;
  }
}
