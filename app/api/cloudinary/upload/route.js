import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

// @desc   Upload image to Cloudinary
// @route  POST /api/cloudinary/upload
// @access Private
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json(
        { error: 'Image is required.' },
        { status: 400 },
      );
    }

    const imageBuffer = Buffer.from(await file.arrayBuffer());
    const imageBase64 = imageBuffer.toString('base64');

    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${ imageBase64 }`,
      {
        folder: 'NextJS-CMS-Blog',
      }
    );
    const { secure_url } = result;

    return NextResponse.json({
      message: 'Upload image successfully',
      url: secure_url
    })
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.status(404).json({ error: 'Image file not found' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}