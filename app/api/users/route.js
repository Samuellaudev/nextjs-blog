import { NextResponse } from 'next/server';
import User from '@/models/userModel.js';
import connectDB from '@/lib/db';
import verifyIsAdmin from '@/utils/verifyIsAdmin';

export const dynamic = 'force-dynamic';

// @desc   Fetch all users
// @route  GET /api/users
// @access Private/Admin
export async function GET(request) {
  try {
    const response = await verifyIsAdmin();
    const { status, message } = await response.json();
    if (status !== 200) {
      return NextResponse.json({
        status,
        message,
      });
    }

    const users = await User.find({});

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(error);
  }
}
