import { z } from 'zod';

export const EnvSchema = z.object({
  BUCKET_PROVIDER: z.literal("supabase"),
  BLOG_ASSETS_BUCKET: z.string(),
  BLOG_CONTENT_BUCKET: z.string(),
  JWT_SECRET: z.string(),
  SUPABASE_URL: z.string(),
  SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  DATABASE_TRANSACTION_URL: z.string(),
  DATABASE_DIRECT_URL: z.string(),
});
 
export const env = EnvSchema.parse(process.env);