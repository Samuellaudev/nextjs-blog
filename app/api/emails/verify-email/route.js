import { NextResponse } from 'next/server';
import User from '@/models/userModel.js';
import generateToken from '@/utils/generateToken.js';

// @desc   Verify email from new registered user
// @route  PUT /api/emails/verify-email
// @access Private
export async function PUT(request) {
  try {
    const requestData = await request.json();
    const { verificationString } = requestData;

    const user = await User.findOne({ verificationString });

    if (!user) {
      return NextResponse.json({
        status: 401,
        message: 'The email verification code is incorrect.',
      });
    }

    user.isVerified = true;
    user.verificationString = '';

    const updatedUser = await user.save();

    generateToken(updatedUser._id, updatedUser.isVerified);

    return NextResponse.json({
      status: 200,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isVerified: updatedUser.isVerified,
        isAdmin: updatedUser.isAdmin,
      },
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
