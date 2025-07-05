/*
  Warnings:

  - You are about to drop the column `coursesThreeDone` on the `RecordWork` table. All the data in the column will be lost.
  - You are about to drop the column `coursesTwoDone` on the `RecordWork` table. All the data in the column will be lost.
  - Added the required column `courseTwoDone` to the `RecordWork` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecordWork" DROP COLUMN "coursesThreeDone",
DROP COLUMN "coursesTwoDone",
ADD COLUMN     "courseThreeDone" TEXT,
ADD COLUMN     "courseTwoDone" TEXT NOT NULL;
