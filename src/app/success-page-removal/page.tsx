"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface DocumentData {
  content: string;
  email?: string;
  company?: {
    email?: string;
  };
  removals?: {
    company_name: string;
    nip: string;
    url: string;
  }[];
}

export default function SuccessPageR() {
  const [doc, setDoc] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const documentId =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("documentId")
      : null;

  const sessionId =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("sessionId")
      : null;

  const fetchDocument = useCallback(
    async (retries = 5) => {
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

        const json = await res.json();
        if (!json || !json.content) throw new Error("Brak treści dokumentu");
        setDoc(json);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Błąd pobierania dokumentu"
        );
        setLoading(false);
      }
    },
    [documentId]
  );

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
      .then(() => fetchDocument())
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.error(err.message);
        }
        setError("Nie masz uprawnień do tego dokumentu");
        setLoading(false);
      });
  }, [documentId, sessionId, fetchDocument]);

  

  const handleDownloadPDF = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const originalExpanded = expanded;
    setExpanded(true);

    setTimeout(() => {
      const element = document.getElementById("document-to-pdf");

      const opt = {
        margin: [3, 2, 2, 2],
        filename: "Wizaro.pl-potwierdzenie.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          scrollX: 0,
          scrollY: -window.scrollY,
          windowWidth: element?.scrollWidth || 800,
        },
        jsPDF: {
          unit: "cm",
          format: "a4",
          orientation: "portrait" as const,
        },
      };

      if (element) html2pdf().set(opt).from(element).save();
      setExpanded(originalExpanded);
    }, 300);
  };

  
  return (
    <div className="min-h-screen bg-[#f6f6f6] flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 max-w-6xl w-full flex flex-col md:flex-row gap-8 items-stretch">
        {loading && (
          <p className="text-center text-gray-500">Ładowanie dokumentu...</p>
        )}
        {error && <p className="text-center text-red-600">{error}</p>}

        {doc && (
          <>
            <div id="document-to-pdf" className="md:w-2/3 w-full flex flex-col h-full">
            <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    style={{
      width: '100%',
      marginBottom: '1.5rem',
      borderBottom: '1px solid #e5e7eb',
      paddingBottom: '1rem',
    }}
  >
    <h1
      style={{
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '0.5rem',
      }}
    >
      ✅ Płatność zakończona sukcesem!
    </h1>
    <p
      style={{
        color: '#374151',
        fontSize: '0.875rem',
      }}
    >
      Dziękujemy za zaufanie i dokonanie zakupu. Twoje zlecenie zostało przyjęte do realizacji.
    </p>

    <div
      style={{
        marginTop: '1rem',
        backgroundColor: '#f3f4f6',
        padding: '1rem',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        color: '#374151',
      }}
    >
      <p>
        <strong>Numer zamówienia:</strong>{" "}
        <span style={{ color: '#111827' }}>{documentId}</span>
      </p>
      {doc?.email && (
        <p>
          <strong>Adres e-mail podany w zamówieniu:</strong>{" "}
          <span style={{ color: '#111827' }}>{doc.email}</span>
        </p>
      )}
      <p style={{ marginTop: '0.5rem' }}>
        W niedługim czasie otrzymasz wiadomość email z potwierdzeniem oraz fakturą. 
      </p>
    </div>

    {doc?.removals && doc.removals.length > 0 && (
      <div
        style={{
          marginTop: '2.5rem',
          borderTop: '1px solid #e5e7eb',
          paddingTop: '1.5rem',
        }}
      >
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '1rem',
          }}
        >
          Zgłoszone profile do usunięcia:
        </h3>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: '#374151' }}>
          {doc.removals.map((removal, index) => (
            <li
              key={index}
              style={{
                backgroundColor: '#f3f4f6',
                padding: '0.75rem',
                borderRadius: '0.5rem',
              }}
            >
              <p>
                <strong>Firma:</strong> {removal.company_name}
              </p>
              <p>
                <strong>NIP:</strong> {removal.nip || "—"}
              </p>
              <p>
                <strong>Link:</strong>{" "}
                <a
                  href={removal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2563eb', textDecoration: 'underline' }}
                >
                  {removal.url}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    )}
  </motion.div>

              

              <div className="md:mt-16 mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
                <button
                  onClick={handleDownloadPDF}
                  className="bg-gray-900 text-white px-5 py-2.5 rounded hover:bg-black transition w-full sm:w-auto text-sm font-medium"
                >
                  Pobierz jako PDF
                </button>
                <button
                  
                  className="bg-[#002a5c] px-5 text-white py-2 rounded hover:bg-[#001e47] transition"
                >
                 <a href="mailto:kontak@wizaro.pl">Napisz do nas</a>
                </button>
              </div>
            </div>

            <div className="md:w-1/3 w-full border border-gray-200 rounded-xl p-5 bg-gray-50 h-full flex flex-col justify-between">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                Co dalej?
              </h2>
              <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
                <li>Rozpoczynamy realizację – Twoje zlecenie zostało przekazane do naszego zespołu. Pracujemy zgodnie z planem, by osiągnąć zamierzony efekt.</li>
                <li>
                Stały monitoring postępów – Na każdym etapie czuwamy nad jakością i skutecznością działań. W razie potrzeby – reagujemy natychmiast.
                </li>
                <li>
                Finalizacja i gotowy efekt – Otrzymasz gotowy rezultat, który odpowiada Twoim oczekiwaniom – bez zbędnych formalności.
                </li>
              </ol>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
