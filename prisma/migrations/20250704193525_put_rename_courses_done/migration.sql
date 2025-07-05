/*
  Warnings:

  - You are about to drop the column `coursesThree` on the `RecordWork` table. All the data in the column will be lost.
  - You are about to drop the column `coursesTwo` on the `RecordWork` table. All the data in the column will be lost.
  - Added the required column `coursesThreeDone` to the `RecordWork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coursesTwoDone` to the `RecordWork` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecordWork" DROP COLUMN "coursesThree",
DROP COLUMN "coursesTwo",
ADD COLUMN     "coursesThreeDone" TEXT NOT NULL,
ADD COLUMN     "coursesTwoDone" TEXT NOT NULL;
