'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const generateToken = (userId, isVerified) => {
  const token = jwt.sign({ userId, isVerified }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });

  cookies().set({
    name: 'jwt',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

export default generateToken;
