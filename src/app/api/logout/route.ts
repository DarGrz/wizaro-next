import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Usuń wszystkie ciasteczka związane z logowaniem
  response.cookies.delete('admin-auth');
  response.cookies.delete('user-role');
  response.cookies.delete('user-id');

  return response;
}