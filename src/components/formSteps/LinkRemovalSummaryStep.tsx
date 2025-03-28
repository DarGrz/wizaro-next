"use client";

interface PayerData {
  name: string;
  company_name?: string;
  email: string;
  nip?: string;
  street: string;
  zip: string;
  city: string;
}

interface LinkRemovalSummaryStepProps {
  payer: PayerData;
  links: string[];
  totalPrice: number;
  isLoading: boolean;
  onBack: () => void;
  onConfirm: () => void;
  payer_id?: string
}

export default function LinkRemovalSummaryStep({
  payer,
  links,
  totalPrice,
  isLoading,
  onBack,
  onConfirm,
}: LinkRemovalSummaryStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">Podsumowanie</h2>

      <div>
        <h3 className="font-semibold mb-1">Linki do usunięcia:</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          {links.map((link, i) => (
            <li key={i}>
              <a href={link} className="text-blue-600 underline break-words" target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Dane do faktury:</h3>
        <p>{payer.name}</p>
        {payer.company_name && <p>{payer.company_name}</p>}
        <p>{payer.email}</p>
        {payer.nip && <p>NIP: {payer.nip}</p>}
        <p>
          {payer.street}, {payer.zip} {payer.city}
        </p>
      </div>

      <p className="text-sm text-gray-700">
        Cena całkowita: <strong>{totalPrice} zł netto</strong>
      </p>

      <div className="flex justify-between mt-4">
        <button
          onClick={onBack}
          className="text-sm px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Wróć
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className={`text-sm px-4 py-2 rounded ${
            isLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#002a5c] hover:bg-[#001e47] text-white"
          }`}
        >
          {isLoading ? "Przetwarzanie..." : "Przejdź do płatności"}
        </button>
      </div>
    </div>
  );
}
