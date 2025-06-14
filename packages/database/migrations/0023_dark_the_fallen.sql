ALTER TABLE "posts_content" DROP CONSTRAINT "posts_content_post_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "posts_tags" DROP CONSTRAINT "posts_tags_post_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "posts_content" ADD CONSTRAINT "posts_content_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;