import { NextResponse } from 'next/server';

function logoutUser() {
  const response = NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));

  // Usuń wszystkie ciasteczka związane z logowaniem
  response.cookies.delete('admin-auth');
  response.cookies.delete('user-role');
  response.cookies.delete('user-id');

  return response;
}

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Usuń wszystkie ciasteczka związane z logowaniem
  response.cookies.delete('admin-auth');
  response.cookies.delete('user-role');
  response.cookies.delete('user-id');

  return response;
}

export async function GET() {
  return logoutUser();
}