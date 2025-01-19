import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type {
  IStorageBucket,
  PutObjectResponse,
  CreatePresignedUrlResponse,
} from './types';

export class SupabaseObjectStorageProvider implements IStorageBucket {
  private readonly client: SupabaseClient;
  private readonly bucketName: string;

  constructor(bucketName: string) {
    this.client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
    this.bucketName = bucketName;
  }

  public async putObject(
    key: string,
    data: Buffer,
  ): Promise<PutObjectResponse> {
    const { data: uploadData, error } = await this.client.storage
      .from(this.bucketName)
      .upload(key, data, { upsert: true });

    if (error) {
      throw new Error(`Failed to upload object: ${error.message}`);
    }

    return {
      key: uploadData?.path || key,
      url: `${process.env.SUPABASE_URL}/storage/v1/object/public/${this.bucketName}/${key}`,
    };
  }

  public async getObject(key: string): Promise<Buffer | null> {
    const { data, error } = await this.client.storage
      .from(this.bucketName)
      .download(key);

    if (error) {
      if (error.message.includes('404')) {
        return null;
      }
      throw new Error(`Failed to download object: ${error.message}`);
    }

    return Buffer.from(await data.arrayBuffer());
  }

  public async listObjects(prefix?: string): Promise<string[]> {
    const { data, error } = await this.client.storage
      .from(this.bucketName)
      .list(prefix);

    if (error) {
      throw new Error(`Failed to list objects: ${error.message}`);
    }

    return data.map((item) => item.name);
  }

  public async deleteObject(key: string): Promise<void> {
    const { error } = await this.client.storage
      .from(this.bucketName)
      .remove([key]);

    if (error) {
      throw new Error(`Failed to delete object: ${error.message}`);
    }
  }

  public async updateObject(key: string, data: Buffer): Promise<void> {
    await this.deleteObject(key);
    await this.putObject(key, data);
  }

  public async createUploadPresignedUrl(
    filename: string,
    _expiresIn: number = 3600,
    _contentType?: string,
  ): Promise<CreatePresignedUrlResponse> {
    const { data, error } = await this.client.storage
      .from(this.bucketName)
      .createSignedUploadUrl(filename);

    if (error) {
      throw new Error(`Failed to create presigned URL: ${error.message}`);
    }

    return {
      uploadUrl: data.signedUrl,
      fileUrl: `${process.env.SUPABASE_URL}/storage/v1/object/public/${this.bucketName}/${filename}`,
    };
  }
}
