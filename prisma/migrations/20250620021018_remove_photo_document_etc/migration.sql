/*
  Warnings:

  - You are about to drop the column `doingConfirmation` on the `RecordPOSll` table. All the data in the column will be lost.
  - You are about to drop the column `groupObservations` on the `RecordPOSll` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RecordPOSll" DROP COLUMN "doingConfirmation",
DROP COLUMN "groupObservations",
ADD COLUMN     "notConfirmationBecause" TEXT;
