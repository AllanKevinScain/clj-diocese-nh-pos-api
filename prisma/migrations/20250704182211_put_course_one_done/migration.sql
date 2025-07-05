/*
  Warnings:

  - You are about to drop the column `coursesDone` on the `RecordWork` table. All the data in the column will be lost.
  - Added the required column `courseOneDone` to the `RecordWork` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecordWork" DROP COLUMN "coursesDone",
ADD COLUMN     "courseOneDone" TEXT NOT NULL;
