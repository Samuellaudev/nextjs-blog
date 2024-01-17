import { NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const dynamic = 'force-dynamic';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// @desc    Retrieve image file from AWS S3 bucket (Cyclic)
// @route   GET /api/aws-s3/:imgName
// @access  Private
export async function GET(request, { params }) {
  const { image: imgName } = params;

  const getFileFromS3 = async (fileName) => {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${fileName}`,
      ContentType: 'image/jpg',
    };

    const command = new GetObjectCommand(params);

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 900,
    });

    return signedUrl;
  };

  const response = await getFileFromS3(imgName);

  return NextResponse.json({
    message: 'Retrieve image successfully',
    url: response,
  });
}
