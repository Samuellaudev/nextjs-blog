import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// @desc    Upload image file to AWS S3 bucket (Cyclic)
// @route   POST /api/aws-s3/upload
// @access  Private
export async function POST(request) {
  async function uploadFileToS3(file, fileName) {
    const fileBuffer = file;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${fileName}`,
      Body: fileBuffer,
      ContentType: 'image/jpg',
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return fileName;
  }

  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json(
        { error: 'Image is required.' },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name);

    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
