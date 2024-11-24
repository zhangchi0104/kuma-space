export interface ServerEnvironmentVariables {
  BLOG_METADATA_TABLE: string;
  BLOG_CONTENT_BUCKET: string;
  BLOG_ASSETS_BUCKET: string;
  JWT_PUBLIC_KEY: string;
  DATABASE_TRANSACTION_URL: string;
  DATABASE_DIRECT_URL: string;
}

export interface ServerProps {
  env: ServerEnvironmentVariables;
}
