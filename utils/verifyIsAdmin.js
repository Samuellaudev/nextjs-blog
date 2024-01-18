import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import User from '@/models/userModel';

const unauthorizedResponse = () => {
  return NextResponse.json({
    status: 401,
    message: 'Not authorized, token failed',
  });
};

const verifyIsAdmin = async () => {
  const cookieStore = cookies();
  const { value: token } = cookieStore.get('jwt');

  if (!token) {
    return unauthorizedResponse();
  }

  try {
    const { userId, isAdmin } = jwt.verify(token, process.env.JWT_SECRET);

    const userExists = await User.findById(userId);

    if (!userExists || !isAdmin) {
      return unauthorizedResponse();
    }

    return NextResponse.json({
      status: 200,
      message: 'Verified Admin',
    });
  } catch (error) {
    console.error(error);
    return unauthorizedResponse();
  }
};

export default verifyIsAdmin;
