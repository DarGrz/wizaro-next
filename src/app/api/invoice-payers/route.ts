import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company_name, email, nip, street, zip, city } = body;

    if (!name || !email || !street || !zip || !city) {
      return NextResponse.json(
        { error: "Brak wymaganych pól" },
        { status: 400 }
      );
    }

    const payer_id = randomUUID();

    const { error } = await supabase.from("invoice_payers").insert({
      id: payer_id,
      name,
      company_name,
      email,
      nip,
      street,
      zip,
      city,
    });

    if (error) {
      console.error("❌ Błąd zapisu płatnika:", error);
      return NextResponse.json({ error: "Błąd zapisu do bazy" }, { status: 500 });
    }

    return NextResponse.json({ payer_id, message: "Płatnik zapisany" });
  } catch (err) {
    console.error("❌ Błąd przetwarzania żądania:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
