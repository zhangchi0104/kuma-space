-- AlterTable
ALTER TABLE "Hitokoto" ADD COLUMN     "from_work_type" TEXT,
ALTER COLUMN "from_character" DROP NOT NULL;
