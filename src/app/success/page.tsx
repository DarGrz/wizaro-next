'use client';

import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const documentId = new URLSearchParams(window.location.search).get("documentId");
  const sessionId = new URLSearchParams(window.location.search).get("sessionId");

  useEffect(() => {
    if (!documentId || !sessionId) {
      setError("Brak ID dokumentu lub sesji");
      setLoading(false);
      return;
    }

    fetch(`/api/documents/${documentId}/verify?sessionId=${sessionId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Brak dostępu do dokumentu");
        return res.json();
      })
      .then(() => {
        fetchDocument();
      })
      .catch((err) => {
        setError("Nie masz uprawnień do tego dokumentu");
        setLoading(false);
      });
  }, [documentId, sessionId]);

  const fetchDocument = async (retries = 5) => {
    try {
      const res = await fetch(`/api/documents/${documentId}`);
      if (!res.ok) {
        if (retries > 0) {
          setTimeout(() => fetchDocument(retries - 1), 2000);
        } else {
          throw new Error("Dokument nieopłacony lub nie istnieje");
        }
        return;
      }

      const data = await res.json();
      setDoc(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const getPlainText = (html) => {
    return html
      .replace(/<br\s*\/?>(?=<\/p>)/gi, '')
      .replace(/<br\s*\/?>(?!<\/p>)/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<a[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi, '$2 ($1)')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .trim();
  };

  const handleDownloadPDF = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const originalExpanded = expanded;
    setExpanded(true);

    setTimeout(() => {
      const element = document.getElementById("document");

      const opt = {
        margin: [3, 2, 2, 2],
        filename: "wniosek-rodo.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          scrollX: 0,
          scrollY: -window.scrollY,
          windowWidth: element.scrollWidth,
        },
        jsPDF: {
          unit: "cm",
          format: "a4",
          orientation: "portrait",
        },
      };

      html2pdf().set(opt).from(element).save();
      setExpanded(originalExpanded);
    }, 300);
  };

  const handleOpenMailto = () => {
    const plainText = getPlainText(doc.content);
    const email = doc?.email || doc?.company?.email || "";
    const to = "";
    const bcc = [email].filter(Boolean).join(',');

    const subject = encodeURIComponent("Prośba o usunięcie danych zgodnie z RODO");
    const body = encodeURIComponent(plainText);

    const mailtoLink = `mailto:${to}?bcc=${bcc}&subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6] flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 max-w-6xl w-full flex flex-col md:flex-row gap-8 items-stretch">
        {loading && <p className="text-center text-gray-500">Ładowanie dokumentu...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {doc && (
          <>
            <div className="md:w-2/3 w-full flex flex-col h-full">
              <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                Prośba o usunięcie danych zgodnie z RODO
              </h1>

              <div className="block md:hidden">
                <div
                  id="document"
                  className={`prose pb-2 prose-lg max-w-none bg-white transition-all duration-500 ${
                    expanded ? '' : 'max-h-[300px] overflow-hidden'
                  }`}
                  dangerouslySetInnerHTML={{ __html: doc.content }}
                ></div>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="mt-2 text-sm text-gray-600 hover:underline"
                >
                  {expanded ? '▲ Pokaż mniej' : '▼ Pokaż więcej'}
                </button>
              </div>

              <div
                id="document"
                className="hidden md:block prose prose-lg max-w-none flex-grow"
                dangerouslySetInnerHTML={{ __html: doc.content }}
              ></div>

              <div className="md:mt-16 mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
                <button
                  onClick={handleDownloadPDF}
                  className="bg-gray-900 text-white px-5 py-2.5 rounded hover:bg-black transition w-full sm:w-auto text-sm font-medium"
                >
                  Pobierz jako PDF
                </button>
                <button
                  onClick={handleOpenMailto}
                  className="bg-[#002a5c] px-5 text-white py-2 rounded hover:bg-[#001e47] transition"
                >
                  Utwórz gotowy e-mail
                </button>
              </div>
            </div>

            <div className="md:w-1/3 w-full border border-gray-200 rounded-xl p-5 bg-gray-50 h-full flex flex-col justify-between">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">Co dalej?</h2>
              <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
                <li>Sprawdź treść dokumentu i w razie potrzeby dostosuj.</li>
                <li>Kliknij <strong>„Utwórz gotowy e-mail”</strong> – dokument wklei się automatycznie.</li>
                <li>Wyślij wiadomość do serwisu z prośbą o usunięcie danych.</li>
              </ol>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
