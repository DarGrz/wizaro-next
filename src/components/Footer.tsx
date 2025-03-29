import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full  text-center text-sm text-gray-600 border-t border-gray-200 py-6 bg-gray-50 shadow">
      <p>
        &copy; {new Date().getFullYear()} Wizaro.pl – Wszelkie prawa zastrzeżone
      </p>
      <div className="mt-2 space-x-4">
        <Link href="/regulamin" className="">
          Regulamin
        </Link>
        <Link href="/polityka-prywatnosci" className="">
          Polityka prywatności
        </Link>
      </div>
    </footer>
  );
}
