const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const Jimp = require('jimp');

const s3Client = new S3Client({ region: process.env.AWS_REGION });

exports.handler = async (event) => {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));

  try {
    // S3イベントから情報を取得
    const record = event.Records[0];
    const sourceBucket = record.s3.bucket.name;
    const sourceKey = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));
    
    console.log(`Processing file: ${sourceKey} from bucket: ${sourceBucket}`);

    // 画像ファイルかチェック（.jpg または .png のみ）
    if (!sourceKey.match(/\.(jpg|jpeg|png)$/i)) {
      console.log('Not an image file, skipping...');
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Not an image file' })
      };
    }

    // 元画像をS3から取得
    const getObjectParams = {
      Bucket: sourceBucket,
      Key: sourceKey
    };

    const { Body } = await s3Client.send(new GetObjectCommand(getObjectParams));
    const imageBuffer = await streamToBuffer(Body);

    console.log(`Original image size: ${imageBuffer.length} bytes`);

    // Jimpで画像を読み込み
    const image = await Jimp.read(imageBuffer);
    const originalWidth = image.bitmap.width;
    const originalHeight = image.bitmap.height;
    
    console.log(`Original dimensions: ${originalWidth}x${originalHeight}`);

    // リサイズ画像作成（幅800px、アスペクト比維持）
    const resizedImage = image.clone();
    if (originalWidth > 800) {
      resizedImage.resize(800, Jimp.AUTO);
    }
    const resizedBuffer = await resizedImage.getBufferAsync(Jimp.MIME_JPEG);

    console.log(`Resized image size: ${resizedBuffer.length} bytes`);

    // サムネイル作成（200x200、カバー）
    const thumbnail = image.clone();
    thumbnail.cover(200, 200);
    const thumbnailBuffer = await thumbnail.getBufferAsync(Jimp.MIME_JPEG);

    console.log(`Thumbnail size: ${thumbnailBuffer.length} bytes`);

    // 処理後のバケット名を環境変数から取得
    const processedBucket = process.env.PROCESSED_BUCKET;

    // リサイズ画像を保存
    const resizedKey = `resized/${sourceKey}`;
    await s3Client.send(new PutObjectCommand({
      Bucket: processedBucket,
      Key: resizedKey,
      Body: resizedBuffer,
      ContentType: 'image/jpeg'
    }));

    console.log(`Saved resized image: ${resizedKey}`);

    // サムネイルを保存
    const thumbnailKey = `thumbnails/${sourceKey}`;
    await s3Client.send(new PutObjectCommand({
      Bucket: processedBucket,
      Key: thumbnailKey,
      Body: thumbnailBuffer,
      ContentType: 'image/jpeg'
    }));

    console.log(`Saved thumbnail: ${thumbnailKey}`);

    const result = {
      sourceBucket,
      sourceKey,
      processedBucket,
      resizedKey,
      thumbnailKey,
      originalSize: imageBuffer.length,
      resizedSize: resizedBuffer.length,
      thumbnailSize: thumbnailBuffer.length,
      dimensions: {
        original: { width: originalWidth, height: originalHeight },
        resized: { width: resizedImage.bitmap.width, height: resizedImage.bitmap.height },
        thumbnail: { width: 200, height: 200 }
      }
    };

    console.log('Processing complete:', result);

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };

  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

// StreamをBufferに変換するヘルパー関数
async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}