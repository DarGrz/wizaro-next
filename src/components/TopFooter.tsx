export default function TopFooter() {
    return (
      <div className="w-full bg-[#f9fafb] text-sm text-gray-600 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          <div>
            <span className="font-medium text-gray-800">Godziny kontaktu:</span> 9:00 – 21:00
          </div>
          <div>
            <span className="font-medium text-gray-800">Telefon:</span>{' '}
            <a href="tel:+48792861513" className="text-[#002a5c] hover:underline">
           +48 792 861 513
            </a>
          </div>
          <div>
            <span className="font-medium text-gray-800">NIP:</span> Mistrzejowice, Kraków 31-636
          </div>
        </div>
      </div>
    );
  }
  