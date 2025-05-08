ALTER TYPE "public"."AppPermissions" ADD VALUE 'moments:self:write' BEFORE 'all:all:all';--> statement-breakpoint
ALTER TYPE "public"."AppPermissions" ADD VALUE 'moments:self:read' BEFORE 'all:all:all';--> statement-breakpoint
ALTER TYPE "public"."AppPermissions" ADD VALUE 'moments:self:all' BEFORE 'all:all:all';