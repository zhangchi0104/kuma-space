ALTER TYPE "public"."AppPermissions" ADD VALUE IF NOT EXISTS 'moments:self:write' BEFORE 'all:all:all';--> statement-breakpoint
ALTER TYPE "public"."AppPermissions" ADD VALUE IF NOT EXISTS 'moments:self:read' BEFORE 'all:all:all';--> statement-breakpoint
ALTER TYPE "public"."AppPermissions" ADD VALUE IF NOT EXISTS 'moments:self:all' BEFORE 'all:all:all';