DROP POLICY "Posts and hitokoto is readble by everyone" ON "moments" CASCADE;--> statement-breakpoint
DROP POLICY "Anon cannot delete the table" ON "moments" CASCADE;--> statement-breakpoint
DROP POLICY "Anon cannot insert into the table" ON "moments" CASCADE;--> statement-breakpoint
DROP POLICY "Anon cannot update the table" ON "moments" CASCADE;--> statement-breakpoint
CREATE POLICY "Authenticated can delete posts content" ON "posts_content" AS PERMISSIVE FOR DELETE TO "authenticated" USING (authorize('posts:self:write') AND ((auth.jwt() ->>'is_anonymous')::boolean) is false AND "posts_content"."post_id" IN (SELECT "posts"."id" FROM "posts" WHERE "posts"."author_id" = (select auth.uid())));--> statement-breakpoint
CREATE POLICY "Authenticated can insert posts content" ON "posts_content" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (authorize('posts:self:write') AND ((auth.jwt() ->>'is_anonymous')::boolean) is false AND "posts_content"."post_id" IN (SELECT "posts"."id" FROM "posts" WHERE "posts"."author_id" = (select auth.uid())));--> statement-breakpoint
CREATE POLICY "Authenticated can read posts content" ON "posts_content" AS PERMISSIVE FOR SELECT TO "authenticated" USING (authorize('posts:all:read'));--> statement-breakpoint
CREATE POLICY "Authenticated can update posts content" ON "posts_content" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (authorize('posts:self:write') AND ((auth.jwt() ->>'is_anonymous')::boolean) is false AND "posts_content"."post_id" IN (SELECT "posts"."id" FROM "posts" WHERE "posts"."author_id" = (select auth.uid()))) WITH CHECK ("posts_content"."post_id" IN (SELECT "posts"."id" FROM "posts" WHERE "posts"."author_id" = (select auth.uid())));--> statement-breakpoint
CREATE POLICY "Authenticated can delete posts tags" ON "posts_tags" AS PERMISSIVE FOR DELETE TO "authenticated" USING (authorize('posts:self:write'));--> statement-breakpoint
CREATE POLICY "Authenticated can insert posts tags" ON "posts_tags" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (authorize('posts:self:write') and "posts_tags"."post_id" IN (SELECT "posts"."id" FROM "posts" WHERE "posts"."author_id" = (select auth.uid())));--> statement-breakpoint
CREATE POLICY "Authenticated can update posts tags" ON "posts_tags" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (authorize('posts:self:write')) WITH CHECK ("posts_tags"."post_id" IN (SELECT "posts"."id" FROM "posts" WHERE "posts"."author_id" = (select auth.uid())));--> statement-breakpoint
CREATE POLICY "Posts and hitokoto is readble by everyone" ON "tags" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "Anon cannot delete the table" ON "tags" AS PERMISSIVE FOR DELETE TO "anon" USING (false);--> statement-breakpoint
CREATE POLICY "Anon cannot insert into the table" ON "tags" AS PERMISSIVE FOR INSERT TO "anon" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "Anon cannot update the table" ON "tags" AS PERMISSIVE FOR UPDATE TO "anon" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "Only admin can delete tags" ON "tags" AS PERMISSIVE FOR DELETE TO "authenticated" USING (authorize('all:all:all'));--> statement-breakpoint
CREATE POLICY "Only admin can update tags" ON "tags" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (authorize('all:all:all'));--> statement-breakpoint
CREATE POLICY "Only admin can insert tags" ON "tags" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (authorize('all:all:all'));--> statement-breakpoint
REVOKE ALL ON TABLE "role_permissions" FROM "authenticated", "anon", "public";