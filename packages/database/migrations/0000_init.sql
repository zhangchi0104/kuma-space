CREATE TYPE "public"."LanguageCodes" AS ENUM('en', 'zh');--> statement-breakpoint
CREATE TABLE "hitokoto" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"from_character" text NOT NULL,
	"from_work" text NOT NULL,
	"from_work_type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_content" (
	"post_id" integer,
	"language_code" "LanguageCodes" NOT NULL,
	CONSTRAINT "post_content_post_id_language_code_pk" PRIMARY KEY("post_id","language_code")
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts_tags" (
	"post_id" integer,
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
ALTER TABLE "post_content" ADD CONSTRAINT "post_content_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_tag_tags_value_fk" FOREIGN KEY ("tag") REFERENCES "public"."tags"("value") ON DELETE no action ON UPDATE no action;