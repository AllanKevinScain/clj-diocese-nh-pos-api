/*
  Warnings:

  - You are about to drop the column `courseNumber` on the `WorkTableEntity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[courseId]` on the table `WorkTableEntity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseId` to the `WorkTableEntity` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "WorkTableEntity_courseNumber_key";

-- AlterTable
ALTER TABLE "WorkTableEntity" DROP COLUMN "courseNumber",
ADD COLUMN     "courseId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WorkTableEntity_courseId_key" ON "WorkTableEntity"("courseId");
