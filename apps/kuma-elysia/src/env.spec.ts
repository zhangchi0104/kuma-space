import { describe, expect, test } from "bun:test";
import { EnvSchema } from './env';

describe('EnvSchema', () => {
  test('should validate correct environment variables', () => {
    const validEnv = {
      BUCKET_PROVIDER: 'supabase',
      BLOG_ASSETS_BUCKET: 'assets-bucket',
      BLOG_CONTENT_BUCKET: 'content-bucket',
      JWT_SECRET: 'secret-key',
      SUPABASE_URL: 'https://example.supabase.co',
      SUPABASE_ANON_KEY: 'anon-key',
      SUPABASE_SERVICE_ROLE_KEY: 'service-role-key',
      DATABASE_TRANSACTION_URL: 'postgresql://user:pass@host/db',
      DATABASE_DIRECT_URL: 'postgresql://user:pass@host/db',
    };

    expect(() => EnvSchema.parse(validEnv)).not.toThrow();
  });

  test('should reject invalid BUCKET_PROVIDER', () => {
    const invalidEnv = {
      BUCKET_PROVIDER: 'aws', // Only 'supabase' is allowed
      BLOG_ASSETS_BUCKET: 'assets-bucket',
      BLOG_CONTENT_BUCKET: 'content-bucket',
      JWT_SECRET: 'secret-key',
      SUPABASE_URL: 'https://example.supabase.co',
      SUPABASE_ANON_KEY: 'anon-key',
      SUPABASE_SERVICE_ROLE_KEY: 'service-role-key',
      DATABASE_TRANSACTION_URL: 'postgresql://user:pass@host/db',
      DATABASE_DIRECT_URL: 'postgresql://user:pass@host/db',
    };

    expect(() => EnvSchema.parse(invalidEnv)).toThrow();
  });

  test('should reject missing required fields', () => {
    const incompleteEnv = {
      BUCKET_PROVIDER: 'supabase',
      BLOG_ASSETS_BUCKET: 'assets-bucket',
      // Missing other required fields
    };

    expect(() => EnvSchema.parse(incompleteEnv)).toThrow();
  });
});