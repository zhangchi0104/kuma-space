import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { IStorageBucket } from './types';
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

export class AwsObjectStorageProvider implements IStorageBucket {
  private readonly client: S3Client;
  public readonly bucketName: string;
  constructor(bucketName: string) {
    this.client = new S3Client({
      endpoint: process.env.BUCKET_ENDPOINT!,
      region: process.env.BUCKET_REGION!,
      credentials: {
        accessKeyId: process.env.BUCKET_ACCESS_KEY_ID!,
        secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY!,
      },
    });
    this.bucketName = bucketName;
  }
  public async putObject(key: string, data: Buffer) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: data,
    });
    await this.client.send(command);
    return {
      key: key,
      url: `${process.env.BUCKET_ENDPOINT}/${this.bucketName}/${key}`,
    };
  }

  public async getObject(key: string): Promise<Buffer | null> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    const resp = await this.client.send(command);
    if (!resp.Body) {
      return null;
    }
    const bytes = await resp.Body.transformToByteArray();
    return Buffer.from(bytes);
  }

  public async listObjects(prefix?: string): Promise<string[]> {
    const command = new ListObjectsV2Command({
      Bucket: this.bucketName,
      Prefix: prefix,
    });
    const resp = await this.client.send(command);
    return (
      resp.Contents?.map((c) => c.Key || '').filter((k) => k.length > 0) ?? []
    );
  }

  public async deleteObject(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    await this.client.send(command);
  }

  public async copyObject(key: string, targetKey: string): Promise<void> {
    const command = new CopyObjectCommand({
      Bucket: this.bucketName,
      Key: targetKey,
      CopySource: `${this.bucketName}/${key}`,
    });
    await this.client.send(command);
  }

  public async updateObject(key: string, data: Buffer): Promise<void> {
    await this.deleteObject(key);
    await this.putObject(key, data);
  }

  public async createUploadPresignedUrl(
    key: string,
    expiresIn?: number,
    contentType?: string,
  ) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: contentType,
    });

    const signedUrl = await getSignedUrl(this.client, command, {
      expiresIn: expiresIn,
    });

    return {
      uploadUrl: signedUrl,
      fileUrl: `${process.env.BUCKET_ENDPOINT}/${this.bucketName}/${key}`,
    };
  }
}
