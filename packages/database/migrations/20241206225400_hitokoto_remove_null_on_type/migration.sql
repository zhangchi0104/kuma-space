/*
  Warnings:

  - Made the column `fromWorkType` on table `Hitokoto` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Hitokoto" ALTER COLUMN "fromWorkType" SET NOT NULL;
