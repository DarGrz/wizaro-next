'use client';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10 bg-white">
      <div className="w-full max-w-5xl bg-white rounded-xl  shadow-md p-10 flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2 rounded border-b pb-6 md:border-r border-gray-200 pr-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Dane kontaktowe</h2>
          <p className="text-gray-700 mb-4">
            Skontaktuj się z nami przez formularz lub bezpośrednio:
          </p>
          <ul className="text-gray-700 space-y-3">
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:kontakt@wzorypism.io" className="">
                kontakt@wizaro.pl
              </a>
            </li>
            <li>
              <strong>Telefon:</strong>{' '}
              <a href="tel:571767999" className="">
                571 767 999
              </a>
            </li>
            <li>
              <strong>Godziny pracy:</strong> Pon-Pt 9:00 - 17:00
            </li>
          </ul>

          <a
            href="tel:571767999"
            className="inline-block mt-6 bg-[#002a5c] text-white py-2 px-4 rounded hover:bg-[#001e47] transition"
          >
            Zadzwoń: 571 767 999
          </a>
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center md:text-left">
            Formularz kontaktowy
          </h1>
          <form className="grid gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Imię i nazwisko
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002a5c]"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Adres e-mail
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002a5c]"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Wiadomość
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002a5c]"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#002a5c] text-white py-2 rounded hover:bg-[#001e47] transition"
            >
              Wyślij wiadomość
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
