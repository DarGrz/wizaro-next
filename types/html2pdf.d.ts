declare module 'html2pdf.js' {
    interface Html2PdfOptions {
      margin?: number | number[];
      filename?: string;
      image?: { type?: string; quality?: number };
      html2canvas?: {
        scale?: number;
        useCORS?: boolean;
        scrollX?: number;
        scrollY?: number;
        windowWidth?: number;
      };
      jsPDF?: {
        unit?: string;
        format?: string | number[];
        orientation?: 'portrait' | 'landscape';
      };
    }
  
    interface Html2Pdf {
      from: (element: HTMLElement) => Html2Pdf;
      set: (opt: Html2PdfOptions) => Html2Pdf;
      save: () => void;
    }
  
    const html2pdf: () => Html2Pdf;
    export default html2pdf;
  }
  