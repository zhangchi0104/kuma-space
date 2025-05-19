DROP POLICY "Posts and hitokoto is readble by everyone" ON "tags" CASCADE;--> statement-breakpoint
DROP POLICY "Anon cannot delete the table" ON "tags" CASCADE;--> statement-breakpoint
DROP POLICY "Anon cannot insert into the table" ON "tags" CASCADE;--> statement-breakpoint
DROP POLICY "Anon cannot update the table" ON "tags" CASCADE;--> statement-breakpoint
CREATE POLICY "Everyone can read the hitokoto" ON "hitokoto" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "Anon cannot delete from the hitokoto table" ON "hitokoto" AS PERMISSIVE FOR DELETE TO "anon" USING (false);--> statement-breakpoint
CREATE POLICY "Anon cannot insert into the hitokoto table" ON "hitokoto" AS PERMISSIVE FOR INSERT TO "anon" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "Anon cannot update the hitokoto table" ON "hitokoto" AS PERMISSIVE FOR UPDATE TO "anon" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "Everyone can read the moments" ON "moments" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "Anon cannot delete from the moments table" ON "moments" AS PERMISSIVE FOR DELETE TO "anon" USING (false);--> statement-breakpoint
CREATE POLICY "Anon cannot insert into the moments table" ON "moments" AS PERMISSIVE FOR INSERT TO "anon" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "Anon cannot update the moments table" ON "moments" AS PERMISSIVE FOR UPDATE TO "anon" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "Everyone can read the posts content" ON "posts_content" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "Anon cannot delete from the posts_content table" ON "posts_content" AS PERMISSIVE FOR DELETE TO "anon" USING (false);--> statement-breakpoint
CREATE POLICY "Anon cannot insert into the posts_content table" ON "posts_content" AS PERMISSIVE FOR INSERT TO "anon" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "Anon cannot update the posts_content table" ON "posts_content" AS PERMISSIVE FOR UPDATE TO "anon" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "Everyone can read the posts" ON "posts" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "Anon cannot delete from the posts table" ON "posts" AS PERMISSIVE FOR DELETE TO "anon" USING (false);--> statement-breakpoint
CREATE POLICY "Anon cannot insert into the posts table" ON "posts" AS PERMISSIVE FOR INSERT TO "anon" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "Anon cannot update the posts table" ON "posts" AS PERMISSIVE FOR UPDATE TO "anon" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "Everyone can read the posts tags" ON "posts_tags" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "Anon cannot delete from the posts_tags table" ON "posts_tags" AS PERMISSIVE FOR DELETE TO "anon" USING (false);--> statement-breakpoint
CREATE POLICY "Anon cannot insert into the posts_tags table" ON "posts_tags" AS PERMISSIVE FOR INSERT TO "anon" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "Anon cannot update the posts_tags table" ON "posts_tags" AS PERMISSIVE FOR UPDATE TO "anon" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "Everyone can read the tags" ON "tags" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "Anon cannot delete from the tags table" ON "tags" AS PERMISSIVE FOR DELETE TO "anon" USING (false);--> statement-breakpoint
CREATE POLICY "Anon cannot insert into the tags table" ON "tags" AS PERMISSIVE FOR INSERT TO "anon" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "Anon cannot update the tags table" ON "tags" AS PERMISSIVE FOR UPDATE TO "anon" WITH CHECK (false);