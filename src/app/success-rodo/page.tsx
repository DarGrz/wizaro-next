'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

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
  url?: string; // link z bazy danych
  link: string; // dla kompatybilności z istniejącym kodem
}

interface DocumentData {
  id: string;
  type: string;
  status: string;
  company: CompanyData;
}

export default function SuccessRODOPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#002a5c]"></div>
      </div>
    }>
      <SuccessRODOContent />
    </Suspense>
  );
}

function SuccessRODOContent() {
  const searchParams = useSearchParams();
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedContent, setCopiedContent] = useState(false);
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const documentId = searchParams.get('document_id');

    if (!sessionId || !documentId) {
      setError('Brak wymaganych parametrów płatności');
      setIsLoading(false);
      return;
    }

    // Pobierz dane dokumentu z API
    const fetchDocumentData = async () => {
      try {
        const response = await fetch(`/api/documents/${documentId}`);
        if (!response.ok) {
          throw new Error('Nie udało się pobrać danych dokumentu');
        }
        
        const documentData: DocumentData = await response.json();
        
        if (documentData.company) {
          setCompanyData({
            ...documentData.company,
            link: documentData.company.url || '', // Użyj url z bazy danych jako link
          });
          
          // 🚀 Automatyczne wysłanie emaila po załadowaniu danych
          await sendEmailAutomatically(documentId);
        } else {
          setError('Brak danych firmy w dokumencie');
        }
        
      } catch (err) {
        console.error('Error fetching document:', err);
        setError('Nie udało się pobrać danych dokumentu');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocumentData();
  }, [searchParams]);

  // Funkcja do automatycznego wysyłania emaila
  const sendEmailAutomatically = async (documentId: string) => {
    try {
      console.log('🚀 Automatyczne wysyłanie emaila z wnioskiem RODO...');
      setSendingEmail(true);
      
      const response = await fetch('/api/send-rodo-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ document_id: documentId }),
      });

      if (response.ok) {
        console.log('✅ Email z wnioskiem RODO został wysłany automatycznie');
        setEmailSent(true);
      } else {
        console.error('❌ Błąd automatycznego wysyłania emaila');
      }
    } catch (error) {
      console.error('❌ Błąd automatycznego wysyłania emaila:', error);
      // Nie przerywamy procesu, tylko logujemy błąd
    } finally {
      setSendingEmail(false);
    }
  };

  const generateRODODocument = () => {
    if (!companyData) return '';

    return `
Temat: Wniosek o usunięcie danych firmy ${companyData.name}

Szanowni Państwo,

Zwracam się z uprzejmą prośbą o trwałe usunięcie danych dotyczących mojej działalności gospodarczej, umieszczonych na Państwa portalu:

Nazwa firmy: ${companyData.name}

NIP: ${companyData.nip}
Link do wpisu: ${companyData.link}

Podstawą tej prośby jest art. 17 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO). Jednocześnie proszę o zgłoszenie wskazanej strony do usunięcia z indeksu wyszukiwarki Google, aby ograniczyć jej dalszą widoczność.

Wycofuję wszelkie udzielone wcześniej zgody na przetwarzanie moich danych w celach marketingowych, promocyjnych lub innych.

Z poważaniem,
${companyData.first_name} ${companyData.last_name}
    `.trim();
  };

  const getSubject = () => {
    if (!companyData) return '';
    return `Wniosek o usunięcie danych firmy ${companyData.name}`;
  };

  const getContent = () => {
    if (!companyData) return '';
    return `Szanowni Państwo,

Zwracam się z uprzejmą prośbą o trwałe usunięcie danych dotyczących mojej działalności gospodarczej, umieszczonych na Państwa portalu:

Nazwa firmy: ${companyData.name}

NIP: ${companyData.nip}
Link do wpisu: ${companyData.link}

Podstawą tej prośby jest art. 17 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO). Jednocześnie proszę o zgłoszenie wskazanej strony do usunięcia z indeksu wyszukiwarki Google, aby ograniczyć jej dalszą widoczność.

Wycofuję wszelkie udzielone wcześniej zgody na przetwarzanie moich danych w celach marketingowych, promocyjnych lub innych.

Z poważaniem,
${companyData.first_name} ${companyData.last_name}`;
  };

  const copyToClipboard = async (text: string, type: 'subject' | 'content') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'subject') {
        setCopiedSubject(true);
        setTimeout(() => setCopiedSubject(false), 2000);
      } else {
        setCopiedContent(true);
        setTimeout(() => setCopiedContent(false), 2000);
      }
    } catch (err) {
      console.error('Nie udało się skopiować tekstu: ', err);
    }
  };

  const downloadDocument = () => {
    if (!companyData) return;

    const documentContent = generateRODODocument();
    const blob = new Blob([documentContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `wniosek_rodo_${companyData.name.replace(/[^a-z0-9]/gi, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadPDF = async () => {
    if (!companyData) return;
    
    setDownloadingPDF(true);
    try {
      const documentId = searchParams.get('document_id');
      const response = await fetch('/api/rodo-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ document_id: documentId }),
      });

      if (!response.ok) {
        throw new Error('Błąd podczas generowania PDF');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `wniosek_rodo_${companyData.name.replace(/[^a-z0-9]/gi, '_')}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Błąd pobierania PDF:', error);
      alert('Wystąpił błąd podczas pobierania PDF. Spróbuj ponownie.');
    } finally {
      setDownloadingPDF(false);
    }
  };

  const sendEmail = async () => {
    if (!companyData) return;
    
    setSendingEmail(true);
    try {
      const documentId = searchParams.get('document_id');
      const response = await fetch('/api/send-rodo-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ document_id: documentId }),
      });

      if (!response.ok) {
        throw new Error('Błąd podczas wysyłania emaila');
      }

      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 5000);
    } catch (error) {
      console.error('Błąd wysyłania emaila:', error);
      alert('Wystąpił błąd podczas wysyłania emaila. Spróbuj ponownie.');
    } finally {
      setSendingEmail(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#002a5c]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
          <h1 className="text-xl font-semibold text-red-800 mb-4">Błąd</h1>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Płatność zakończona pomyślnie!
            </h1>
            <p className="text-gray-600 text-lg">
              Wniosek RODO został przygotowany {emailSent ? 'i wysłany na Twój email' : 'i jest wysyłany na Twój email'}
            </p>
            
            {/* Status wysyłania emaila */}
            {sendingEmail && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <span className="text-blue-800 font-medium">Wysyłanie wniosku RODO na email...</span>
                </div>
              </div>
            )}
            
            {emailSent && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-green-800 font-medium">✅ Wniosek RODO został wysłany na Twój email!</span>
                </div>
              </div>
            )}
          </div>

          {companyData && (
            <>
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Przygotowany wniosek dla:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Firma:</span> {companyData.name}
                  </div>
                  <div>
                    <span className="font-medium">NIP:</span> {companyData.nip}
                  </div>
                  <div>
                    <span className="font-medium">Osoba kontaktowa:</span> {companyData.first_name} {companyData.last_name}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {companyData.email}
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-medium">Link/Portal:</span> {companyData.link}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  Instrukcje dalszego postępowania:
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-blue-800">
                  <li>Skopiuj przygotowany wniosek RODO lub pobierz PDF</li>
                  <li>Wyślij wniosek do administratora danych (właściciela portalu/strony)</li>
                  <li>Administrator ma 30 dni na odpowiedź zgodnie z przepisami RODO</li>
                  <li>W razie braku odpowiedzi możesz złożyć skargę do UODO</li>
                </ol>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Przygotowany wniosek RODO:
                </h3>
                
                {/* Sekcja z tematem */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-700">Temat wiadomości:</h4>
                    <button
                      onClick={() => copyToClipboard(getSubject(), 'subject')}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        copiedSubject 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      {copiedSubject ? 'Skopiowano!' : 'Kopiuj temat'}
                    </button>
                  </div>
                  <div className="bg-gray-50 border rounded-lg p-3">
                    <p className="text-sm text-gray-800">{getSubject()}</p>
                  </div>
                </div>

                {/* Sekcja z treścią */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-700">Treść wiadomości:</h4>
                    <button
                      onClick={() => copyToClipboard(getContent(), 'content')}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        copiedContent 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      {copiedContent ? 'Skopiowano!' : 'Kopiuj treść'}
                    </button>
                  </div>
                  <div className="bg-gray-50 border rounded-lg p-4">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed">
                      {getContent()}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-6">
                {/* Informacja o automatycznym emailu */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-semibold mb-4">
                    {emailSent ? '✅ Wniosek wysłany!' : '📧 Wysyłanie wniosku...'}
                  </h3>
                  {emailSent ? (
                    <div>
                      <p className="mb-4 opacity-90">
                        Profesjonalny wniosek RODO został automatycznie wysłany na Twój adres email
                      </p>
                      <div className="bg-white/20 rounded-lg p-3">
                        <p className="font-medium">📧 Email wysłany na: {companyData.email}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <p>Przygotowywanie i wysyłanie wniosku RODO na email {companyData.email}...</p>
                    </div>
                  )}
                </div>

                {/* Dodatkowe opcje pobierania */}
                {emailSent && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">📥 Dodatkowe opcje pobierania</h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      Jeśli chcesz dodatkowo pobrać dokument bezpośrednio na swoje urządzenie:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Przycisk PDF */}
                      <button
                        onClick={downloadPDF}
                        disabled={downloadingPDF}
                        className="bg-[#002a5c] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#001e47] transition-colors inline-flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {downloadingPDF ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Generowanie PDF...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                            </svg>
                            📄 Pobierz PDF
                          </>
                        )}
                      </button>

                      {/* Przycisk ponownego wysłania emaila */}
                      <button
                        onClick={sendEmail}
                        disabled={sendingEmail}
                        className="bg-gray-200 text-gray-700 px-6 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors inline-flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {sendingEmail ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700"></div>
                            Wysyłanie...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            � Wyślij ponownie
                          </>
                        )}
                      </button>
                    </div>

                    {/* Opcja tekstowa jako backup */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">Opcja alternatywna:</p>
                      <button
                        onClick={downloadDocument}
                        className="text-[#002a5c] hover:text-[#001e47] font-medium inline-flex items-center gap-2 text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Pobierz jako plik tekstowy (.txt)
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="text-sm text-gray-600">
                  <p>📧 Faktura VAT zostanie wysłana na adres email: <strong>{companyData.email}</strong></p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 14.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                    <div>
                      <h4 className="font-medium text-yellow-800">Ważne informacje</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Pamiętaj, że wniosek musi być wysłany na adres kontaktowy platformy. 
                        Zachowaj kopię wysłanego wniosku oraz potwierdzenie dostarczenia.
                      </p>
                      <br />
                      <p>Najważniejsze adresy kontaktowe:</p>
                      <ul className="list-disc list-inside">
                        <li>Gowork: admin@gowork.pl</li>
                        <li>Aleo: pomoc@aleo.com lub <a href="https://aleo.com/pl/o-platformie/formularz-kontaktowy">formularz kontaktowy</a></li>
                        <li>Panorama firm: kontakt@panoramafirm.pl</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}