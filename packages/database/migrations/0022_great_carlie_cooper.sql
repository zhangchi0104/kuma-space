ALTER POLICY "Everyone can read the hitokoto" ON "hitokoto" TO anon,authenticated USING (true);--> statement-breakpoint
ALTER POLICY "Everyone can read the moments" ON "moments" TO anon,authenticated USING (true);--> statement-breakpoint
ALTER POLICY "Everyone can read the posts content" ON "posts_content" TO anon,authenticated USING (true);--> statement-breakpoint
ALTER POLICY "Everyone can read the posts tags" ON "posts_tags" TO anon,authenticated USING (true);--> statement-breakpoint
ALTER POLICY "Everyone can read the tags" ON "tags" TO anon,authenticated USING (true);