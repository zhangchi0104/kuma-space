/*
  Warnings:

  - The values [EN_US,ZH_CN] on the enum `LanguageCodes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LanguageCodes_new" AS ENUM ('EN', 'ZH');
ALTER TABLE "PostLanguages" ALTER COLUMN "languageCode" TYPE "LanguageCodes_new" USING ("languageCode"::text::"LanguageCodes_new");
ALTER TYPE "LanguageCodes" RENAME TO "LanguageCodes_old";
ALTER TYPE "LanguageCodes_new" RENAME TO "LanguageCodes";
DROP TYPE "LanguageCodes_old";
COMMIT;
