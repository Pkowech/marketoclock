import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';


@Injectable()
export class UploadService {
  private s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

  async uploadFile(buffer: Buffer, filename: string) {
    const bucket = process.env.AWS_BUCKET;
    if (!bucket) {
      throw new Error('AWS_BUCKET environment variable is not set');
    }
    return this.s3
      .upload({
        Bucket: bucket,
        Key: filename,
        Body: buffer,
      })
      .promise();
  }
  async deleteFile(filename: string) {
    const bucket = process.env.AWS_BUCKET;
    if (!bucket) {
      throw new Error('AWS_BUCKET environment variable is not set');
    }
    return this.s3
      .deleteObject({
        Bucket: bucket,
        Key: filename,
      })
      .promise();
  }
  async getFileStream(filename: string) {
    const bucket = process.env.AWS_BUCKET;
    if (!bucket) {
      throw new Error('AWS_BUCKET environment variable is not set');
    }
    return this.s3.getObject({ Bucket: bucket, Key: filename }).createReadStream();
  }
  async getFileUrl(filename: string) {
    const bucket = process.env.AWS_BUCKET;
    if (!bucket) {
      throw new Error('AWS_BUCKET environment variable is not set');
    }
    return this.s3.getSignedUrl('getObject', {
      Bucket: bucket,
      Key: filename,
      Expires: 60 * 60, // URL expires in 1 hour
    });
  }
  async listFiles(prefix: string) {
    const bucket = process.env.AWS_BUCKET;
    if (!bucket) {
      throw new Error('AWS_BUCKET environment variable is not set');
    }
    const params = {
      Bucket: bucket,
      Prefix: prefix,
    };
    const data = await this.s3.listObjectsV2(params).promise();
    return data.Contents?.map((item) => item.Key) || [];
  }

}