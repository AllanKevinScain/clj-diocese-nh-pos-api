/*
  Warnings:

  - You are about to drop the `PeapleCljThree` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."PeapleCljThree";

-- CreateTable
CREATE TABLE "public"."Poslll" (
    "id" TEXT NOT NULL,
    "candidatePhone" TEXT,
    "candidateName" TEXT NOT NULL,
    "instagram" TEXT,
    "courseOne" TEXT NOT NULL,
    "courseTwo" TEXT NOT NULL,
    "courseThree" TEXT NOT NULL,
    "formations" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Poslll_pkey" PRIMARY KEY ("id")
);
