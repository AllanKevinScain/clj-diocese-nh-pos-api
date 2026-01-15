/*
  Warnings:

  - You are about to drop the column `createdAt` on the `RecordRole` table. All the data in the column will be lost.
  - You are about to drop the column `recordId` on the `RecordRole` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[participantId,role,courseId]` on the table `RecordRole` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `participantId` to the `RecordRole` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RecordRole" DROP CONSTRAINT "RecordRole_recordId_fkey";

-- DropForeignKey
ALTER TABLE "RecordRole" DROP CONSTRAINT "RecordRole_workTableId_fkey";

-- DropIndex
DROP INDEX "RecordRole_recordId_role_courseId_key";

-- AlterTable
ALTER TABLE "RecordRole" DROP COLUMN "createdAt",
DROP COLUMN "recordId",
ADD COLUMN     "participantId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "recordId" TEXT,
    "poslllId" TEXT,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RecordRole_participantId_role_courseId_key" ON "RecordRole"("participantId", "role", "courseId");

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "RecordEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_poslllId_fkey" FOREIGN KEY ("poslllId") REFERENCES "Poslll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordRole" ADD CONSTRAINT "RecordRole_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
