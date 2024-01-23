import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// @desc   Logout user
// @route  POST /api/users/logout
// @access Public
export async function POST(request) {
  try {
    cookies().delete('jwt');

    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
