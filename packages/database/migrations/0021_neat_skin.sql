ALTER TABLE "moments" DROP CONSTRAINT "moments_pkey"; --> statement-breakpoint
ALTER TABLE "moments" ADD COLUMN "moment_id" serial PRIMARY KEY; --> statement-breakpoint
ALTER TABLE "moments" RENAME COLUMN "id" TO "_id"; --> statement-breakpoint
ALTER TABLE "moments" DROP COLUMN "_id"; --> statement-breakpoint
ALTER TABLE "moments" RENAME COLUMN "moment_id" TO "id"; --> statement-breakpoint
ALTER TABLE "moments" ADD COLUMN "title" text NOT NULL; --> statement-breakpoint