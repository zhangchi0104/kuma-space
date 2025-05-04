CREATE SCHEMA IF NOT EXISTS "next_auth";
--> statement-breakpoint
CREATE TYPE "public"."LanguageCodes" AS ENUM('en', 'zh');--> statement-breakpoint
CREATE TYPE "next_auth"."user_roles" AS ENUM('admin', 'user');--> statement-breakpoint
CREATE TABLE "hitokoto" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"from_character" text NOT NULL,
	"from_work" text NOT NULL,
	"from_work_type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts_content" (
	"post_id" serial NOT NULL,
	"title" varchar(255) NOT NULL,
	"language_code" "LanguageCodes" NOT NULL,
	"content" text NOT NULL,
	CONSTRAINT "posts_content_post_id_language_code_pk" PRIMARY KEY("post_id","language_code")
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts_tags" (
	"post_id" serial NOT NULL,
	"tag" text,
	CONSTRAINT "posts_tags_post_id_tag_pk" PRIMARY KEY("post_id","tag")
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"value" text PRIMARY KEY NOT NULL,
	"category" text GENERATED ALWAYS AS (split_part("tags"."value", ':', 1)) STORED,
	"name" text GENERATED ALWAYS AS (split_part("tags"."value", ':', 2)) STORED
);
--> statement-breakpoint
CREATE TABLE "next_auth"."account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE "next_auth"."authenticator" (
	"credentialID" text NOT NULL,
	"userId" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE "next_auth"."session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "next_auth"."user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"image" text,
	"role" "next_auth"."user_roles",
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "next_auth"."verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "posts_content" ADD CONSTRAINT "posts_content_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_tag_tags_value_fk" FOREIGN KEY ("tag") REFERENCES "public"."tags"("value") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "next_auth"."account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "next_auth"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "next_auth"."authenticator" ADD CONSTRAINT "authenticator_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "next_auth"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "next_auth"."session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "next_auth"."user"("id") ON DELETE cascade ON UPDATE no action;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA next_auth TO service_role;

-- -- Grant usage on the schema if not already granted
GRANT USAGE ON SCHEMA next_auth TO service_role;

-- -- Grant privileges on sequences if applicable
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA next_auth TO service_role;

-- -- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA next_auth GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA next_auth GRANT USAGE, SELECT ON SEQUENCES TO service_role;