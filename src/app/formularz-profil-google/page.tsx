'use client';

import { Suspense } from "react";
import GoogleRemovalForm from "@/components/gmbremoval/GoogleRemovalForm";

function GoogleRemovalFormWrapper() {
  return <GoogleRemovalForm />;
}

export default function GoogleRemovalPage() {
  return (
    <>
      <main>
        <div>
          {/* <h1 className="text-3xl font-bold text-center mb-8 text-[#002a5c]">
            Usuwanie wizytówki Google
          </h1> */}
          <Suspense fallback={<div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002a5c]"></div>
          </div>}>
            <GoogleRemovalFormWrapper />
          </Suspense>
        </div>
      </main>
    </>
  );
}
