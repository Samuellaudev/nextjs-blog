import { NextResponse } from 'next/server';
import Post from '@/models/postModel.js';
import connectDB from '@/lib/db';
import verifyToken from '@/utils/verifyToken';

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
    await connectDB();

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

// @desc   Create single blog post
// @route  POST /api/posts
// @access Private
export async function POST(request) {
  try {
    const postData = await request.json();
    const { title, body, description, image } = postData;

    const response = await verifyToken();
    const { status, message } = await response.json();

    if (status !== 200) {
      return NextResponse.json({
        status,
        message,
      });
    }

    const newPost = await Post.create({
      title,
      body,
      description,
      image,
    });

    if (newPost) {
      return NextResponse.json({
        status,
        message,
        title: newPost.title,
        body: newPost.body,
        description: newPost.description,
        image: newPost.image,
      });
    } else {
      return NextResponse.json({
        status: 500,
        message: 'Failed to create a new post',
      });
    }
  } catch (error) {
    console.error('Error in POST request:', error);
    return NextResponse.json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
}
