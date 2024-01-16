import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import Post from '@/models/postModel.js';
import connectDB from '@/lib/db.js';

const backendUrl = process.env.BACKEND_URL;

export const dynamic = 'force-dynamic';

// @desc   Fetch all blog posts
// @route  GET /api/posts
// @access Public
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const pageNumber = searchParams.get('pageNumber');
  const search = searchParams.get('search');

  const pageSize = 6;
  const page = Number(pageNumber) || 1;

  try {
    connectDB();

    const searchKeyword = search
      ? {
          title: {
            $regex: search,
            $options: 'i',
          },
        }
      : {};

    const count = await Post.countDocuments({ ...searchKeyword });
    const posts = await Post.find({ ...searchKeyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    return NextResponse.json({
      posts,
      page,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
