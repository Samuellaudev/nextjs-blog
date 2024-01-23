import { NextResponse } from 'next/server';
import User from '@/models/userModel.js';

// @desc   Upgrade user to premium
// @route  PUT /api/users/upgrade
// @access Private
export async function PUT(request) {
  const userId = await request.json();

  try {
    const userExists = await User.findById(userId);

    if (userExists) {
      userExists.isPremium = true;
      userExists.updatedAt = Date.now();

      await userExists.save();
    }

    return NextResponse.json({
      status: 200,
      message: 'Upgraded to premium',
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
