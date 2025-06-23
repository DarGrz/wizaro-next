'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface PrintButtonsProps {
  orderId: string;
}

export default function PrintButtons({ orderId }: PrintButtonsProps) {
  // Add print styles on component mount
  useEffect(() => {
    // Add style element to head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        #poa-document, #poa-document * {
          visibility: visible;
        }
        #poa-document {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          padding: 0;
        }
        @page {
          size: A4;
          margin: 2cm;
        }
        .print-hide {
          display: none !important;
        }
        h2 {
          font-size: 18pt;
        }
        p, li {
          font-size: 12pt;
          line-height: 1.5;
        }
      }
    `;
    document.head.appendChild(styleElement);

    // Clean up on unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="flex gap-2">
      <button
        onClick={() => window.print()}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors print-hide"
      >
        Drukuj
      </button>
      <button
        onClick={() => {
          const printWindow = window.open('', '_blank');
          if (printWindow) {
            printWindow.document.write(`
              <html>
                <head>
                  <title>Pełnomocnictwo</title>
                  <style>
                    body { font-family: Arial, sans-serif; padding: 2cm; }
                    h2 { font-size: 18pt; text-align: center; }
                    p, li { font-size: 12pt; line-height: 1.5; }
                    .signature-line { margin-top: 20px; border-top: 1px solid #000; width: 200px; display: inline-block; }
                    .signature-section { display: flex; justify-content: space-between; margin-top: 80px; }
                    .text-justify { text-align: justify; }
                  </style>
                </head>
                <body>
                  ${document.getElementById('poa-document')?.innerHTML || ''}
                </body>
              </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
              printWindow.print();
            }, 500);
          }
        }}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors print-hide"
      >
        Pobierz PDF
      </button>
      <Link 
        href={`/dashboard/orders/${orderId}`} 
        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors print-hide"
      >
        Powrót
      </Link>
    </div>
  );
}
