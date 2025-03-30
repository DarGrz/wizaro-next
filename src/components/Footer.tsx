import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full  text-center text-sm text-gray-900 pb-5 font-mono">
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
