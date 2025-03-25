'use client';

export default function Footer() {
  return (
    <footer className="w-full mt-50 text-center text-sm text-gray-600 border-t border-gray-200 py-6 bg-gray-50 shadow">
      &copy; {new Date().getFullYear()} wzorypism.io – Wszelkie prawa zastrzeżone
    </footer>
  );
}
