import {
  AwsObjectStorageProvider,
  IStorageBucket,
  SupabaseObjectStorageProvider,
} from '@server/providers/object-storage';
import Elysia from 'elysia';

export interface S3PluginOptions<Name extends string> {
  name: Name;
  bucketName: string;
  provider?: 'supabase' | 'aws';
}

export const s3 = <const Name extends string>({
  name,
  bucketName,
  provider = 'aws',
}: S3PluginOptions<Name>) => {
  const storage: IStorageBucket =
    provider === 'supabase'
      ? new SupabaseObjectStorageProvider(bucketName)
      : new AwsObjectStorageProvider(bucketName);
  return new Elysia({
    name: '@kuma-elysia/s3',
    seed: { name, bucketName, provider },
  }).decorate(name as Name, storage);
};
