-- CreateTable
CREATE TABLE "Hitokoto" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "from_character" TEXT NOT NULL,
    "from_work" TEXT,

    CONSTRAINT "Hitokoto_pkey" PRIMARY KEY ("id")
);
