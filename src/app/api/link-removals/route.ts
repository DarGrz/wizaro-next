// app/api/link-removals/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // Tu możesz np. zapisać dane do bazy (Supabase / Prisma / etc.)
  console.log("🔗 Otrzymane linki do usunięcia:", body.links);

  // Przykładowa odpowiedź
  return NextResponse.json({ removal_id: "fake-removal-id-123" });
}
