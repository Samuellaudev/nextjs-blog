import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function middleware(req) {
  const cookieStore = cookies();
  const { value: token } = cookieStore.get('jwt');

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256'],
    });

    if (!payload.isAdmin) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } catch (error) {
    console.log('invalid token')
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/new-post/:path*',
    '/edit-post/:path*',
    '/emails/verify-email/:path*'
  ],
};
