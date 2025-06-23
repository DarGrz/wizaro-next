import Link from 'next/link';

interface PowerOfAttorneyLinksProps {
  orderId: string;
  showGoWork: boolean;
  showAleo: boolean;
}

export default function PowerOfAttorneyLinks({
  orderId,
  showGoWork,
  showAleo
}: PowerOfAttorneyLinksProps) {
  return (
    <div className="flex gap-2">      {showGoWork && (
        <Link
          href={`/dashboard/orders/${orderId}/generate-poa`}
          className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pełnom. GoWork
        </Link>
      )}
      {showAleo && (
        <Link
          href={`/dashboard/orders/${orderId}/generate-poa-aleo`}
          className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pełnom. Aleo
        </Link>
      )}
    </div>
  );
}
