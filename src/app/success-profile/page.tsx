"use client";
import Link from "next/link";

export default function SuccessProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Dziękujemy za zgłoszenie!</h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
        Twoje zgłoszenie zostało przyjęte. Skontaktujemy się z Tobą po zrealizowaniu usługi.
      </p>
      <Link href="/" className="px-6 py-3 rounded bg-[#002a5c] text-white hover:bg-[#001e47] transition text-sm">Powrót na stronę główną</Link>
    </div>
  );
}
