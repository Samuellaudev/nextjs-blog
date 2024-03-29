import { NextResponse } from 'next/server';
import User from '@/models/userModel.js';
import { v4 as uuid } from 'uuid';
import sendEmail from '@/utils/sendEmail.js';
import generateToken from '@/utils/generateToken.js';

// @desc    Register/Sign up a new user
// @route   POST /api/users/signup
// @access  Public
export async function POST(request) {
  try {
    const requestData = await request.json();
    const { name, email, password } = requestData;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json({ error, message: 'User already exists' });
    }

    const verificationString = uuid();

    const user = await User.create({
      name,
      email,
      password,
      verificationString,
    });

    try {
      await sendEmail({
        from: `Samuel Lau <${process.env.SMTP_EMAIL}>`,
        to: email,
        bcc: process.env.SMTP_EMAIL,
        subject: 'Please verify your email',
        text: `
        Thanks for signing up! To verify your email, click here:
        ${process.env.FRONTEND_URL}/emails/verify-email/${verificationString}`,
      });
    } catch (error) {
      return NextResponse.json({ error, message: 'Email not sent' });
    }

    if (user) {
      generateToken(user._id, user.isVerified, user.isAdmin);

      const newUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        isPremium: user.isPremium,
        isAdmin: user.isAdmin,
        verificationString: user.verificationString,
      };
      return NextResponse.json(newUser);
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
