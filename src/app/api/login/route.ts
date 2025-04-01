import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const response = NextResponse.json({ success: true });

    // Ustawiamy ciasteczko z tokenem
    response.cookies.set('admin-auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 godzin
    });

    return response;
  }

  return NextResponse.json({ error: 'Nieprawidłowe dane logowania' }, { status: 401 });
}
