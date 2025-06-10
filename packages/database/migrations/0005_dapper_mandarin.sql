CREATE TYPE "public"."AppRoles" AS ENUM('admin', 'viewer');--> statement-breakpoint
CREATE TABLE "moments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "role_permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" "AppRoles" NOT NULL,
	"permission" text NOT NULL,
	CONSTRAINT "role_permission_unique" UNIQUE("role","permission")
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"role" "AppRoles" NOT NULL,
	CONSTRAINT "user_id_role_unique" UNIQUE("user_id","role")
);
--> statement-breakpoint
ALTER TABLE IF EXISTS "next_auth"."accounts" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE IF EXISTS "next_auth"."sessions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE IF EXISTS "next_auth"."users" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE IF EXISTS "next_auth"."verification_tokens" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE IF EXISTS "next_auth"."accounts" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "next_auth"."sessions" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "next_auth"."users" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "next_auth"."verification_tokens" CASCADE;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "author_id" uuid;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
DROP SCHEMA IF EXISTS "next_auth" CASCADE;
