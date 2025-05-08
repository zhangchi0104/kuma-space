CREATE TYPE "public"."AppPermissions" AS ENUM('posts:all:read', 'posts:all:write', 'posts:all:all', 'posts:self:read', 'posts:self:write', 'posts:self:all', 'comments:all:read', 'comments:all:write', 'comments:all:all', 'comments:self:read', 'comments:self:write', 'comments:self:all', 'hitokoto:all:read', 'hitokoto:all:write', 'hitokoto:all:all', 'moments:all:read', 'moments:all:write', 'moments:all:all');--> statement-breakpoint
ALTER TABLE "role_permissions" DROP CONSTRAINT "permission_must_contains_colons_in_between";--> statement-breakpoint
ALTER TABLE "role_permissions" DROP COLUMN "permission";--> statement-breakpoint
ALTER TABLE "role_permissions" ADD COLUMN "permission" "public"."AppPermissions" NOT NULL;--> statement-breakpoint
