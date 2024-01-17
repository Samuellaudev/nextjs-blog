import { NextResponse } from 'next/server';
import Post from '@/models/postModel.js';
import verifyToken from '@/utils/verifyToken';

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

// @desc   Delete single blog post
// @route  DELETE /api/posts/:id
// @access Private
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    const response = await verifyToken();
    const { status, message } = await response.json();
    if (status !== 200) {
      return NextResponse.json({
        status,
        message,
      });
    }

    const post = await Post.findById(id);

    if (post) {
      await Post.deleteOne({ _id: post._id });
      return NextResponse.json({ message: 'Post deleted successfully' });
    } else {
      return NextResponse.json({
        status: 404,
        message: 'Post not found',
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error('Failed to delete post!');
  }
}
