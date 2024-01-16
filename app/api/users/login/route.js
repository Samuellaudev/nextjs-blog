import { NextResponse } from 'next/server';
import User from '@/models/userModel.js';
import generateToken from '@/utils/generateToken.js';

// @desc   Auth user & get token
// @route  POST /api/users/login
// @access Public
export async function POST(request) {
  try {
    const requestData = await request.json();
    const { email, password } = requestData;

    const user = await User.findOne({ email });
    const passwordEntered = await user.matchPassword(password);

    if (user && passwordEntered) {
      generateToken(user._id, user.isVerified);

      return NextResponse.json({
        status: 200,
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        isAdmin: user.isAdmin,
      });
    } else {
      return NextResponse.json({
        status: 401,
        message: 'Sorry! There was an error with your login. Please try again.',
      });
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
