import { z } from 'zod';
const CommonEnv = z.object({
  JWT_SECRET: z.string(),
  BLOG_ASSETS_BUCKET: z.string(),
  BLOG_CONTENT_BUCKET: z.string(),
});
const EnvSchema = z.discriminatedUnion("BUCKET_PROVIDER", [
  z.object({
    BUCKET_PROVIDER: z.literal("minio"),
    BUCKET_REGION: z.string(),
    MINIO_ENDPOINT: z.string(),
    MINIO_ACCESS_KEY: z.string(),
    MINIO_SECRET_KEY: z.string(),
  }).merge(CommonEnv),
  z.object({
    BUCKET_PROVIDER: z.literal("supabase"),
    SUPABASE_URL: z.string(),
    SUPABASE_ANON_KEY: z.string(),
    SUPABASE_SERVICE_ROLE_KEY: z.string(),
  }).merge(CommonEnv),
]);
 
export const env = EnvSchema.parse(process.env);