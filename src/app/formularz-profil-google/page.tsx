'use client';

import GoogleRemovalForm from "@/components/gmbremoval/GoogleRemovalForm";


export default function GoogleRemovalPage() {
  return (
    <>
      
      <main className="min-h-screen  bg-gray-50">
        <div className="container mx-auto px-8">
          {/* <h1 className="text-3xl font-bold text-center mb-8 text-[#002a5c]">
            Usuwanie wizytówki Google
          </h1> */}
          <GoogleRemovalForm />
        </div>
        
      </main>
   
    </>
  );
}
