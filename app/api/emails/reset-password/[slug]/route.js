import { NextResponse } from 'next/server';
import User from '@/models/userModel.js';

// @desc   Reset password for registered account
// @route  PUT /api/emails/reset-password/:passwordResetCode
// @access Private
export async function PUT(request, { params }) {
  try {
    const { slug: passwordResetCode } = params;

    const requestData = await request.json();
    const { newPassword } = requestData;

    const user = await User.findOne({ passwordResetCode });

    if (!user) {
      return NextResponse.json({ status: 404, message: 'Resource not found' });
    }

    // Update user's password and reset code
    // Hashing by bcrypt is done in userModel.js
    user.password = newPassword;
    user.passwordResetCode = '';
    user.verificationString = '';

    await user.save();

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
