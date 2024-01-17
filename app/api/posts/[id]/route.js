import { NextResponse } from 'next/server';
import Post from '@/models/postModel.js';

export const dynamic = 'force-dynamic';

// @desc   Fetch single blog post
// @route  GET /api/posts/:id
// @access Public
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const post = await Post.findById(id);

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error, message: 'Resource not found' });
  }
}
