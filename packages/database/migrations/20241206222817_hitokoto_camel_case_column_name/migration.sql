-- This is an empty migration.
ALTER TABLE "Hitokoto" RENAME COLUMN "from_character" TO "fromCharacter";
ALTER TABLE "Hitokoto" RENAME COLUMN "from_work" TO "fromWork";
ALTER TABLE "Hitokoto" RENAME COLUMN "from_work_type" TO "fromWorkType";
