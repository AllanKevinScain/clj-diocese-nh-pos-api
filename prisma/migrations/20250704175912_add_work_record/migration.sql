/*
  Warnings:

  - The `parishIndication` column on the `RecordWork` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `coursesThree` to the `RecordWork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coursesTwo` to the `RecordWork` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecordWork" ADD COLUMN     "coursesThree" TEXT NOT NULL,
ADD COLUMN     "coursesTwo" TEXT NOT NULL,
ADD COLUMN     "doingConfirmation" BOOLEAN,
ADD COLUMN     "notConfirmationBecause" TEXT,
DROP COLUMN "parishIndication",
ADD COLUMN     "parishIndication" TEXT[];
