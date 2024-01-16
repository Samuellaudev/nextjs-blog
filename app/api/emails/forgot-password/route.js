import { NextResponse } from 'next/server';
import User from '@/models/userModel.js';
import { v4 as uuid } from 'uuid';
import sendEmail from '@/utils/sendEmail.js';

// @desc   Confirm email to reset password from registered account
// @route  PUT /api/emails/forgot-password
// @access Private
export async function PUT(request) {
  const sender = process.env.SENDER_NAME;
  const senderEmail = process.env.FORWARDEMAIL_EMAIL;
  const frontendURL = process.env.FRONTEND_URL;

  const sendPasswordResetEmail = async (email, code) => {
    try {
      await sendEmail({
        from: `${sender} <${senderEmail}>`,
        to: email,
        bcc: senderEmail,
        subject: 'Password Reset',
        text: `
        To reset your password, click here:
        ${frontendURL}/emails/reset-password/${code}`,
      });
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };

  try {
    const requestData = await request.json();
    const { email } = requestData;

    const passwordResetCode = uuid();

    const user = await User.findOneAndUpdate(
      { email },
      { passwordResetCode },
      { new: true },
    );

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: 'Sorry! We cannot find the user.',
      });
    }

    await sendPasswordResetEmail(email, passwordResetCode);

    return NextResponse.json({
      status: 200,
      message: 'Password reset email sent successfully',
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
