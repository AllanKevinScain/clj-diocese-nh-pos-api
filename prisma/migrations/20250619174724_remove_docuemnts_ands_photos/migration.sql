/*
  Warnings:

  - You are about to drop the column `document` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `womanDocument` on the `RecordCouple` table. All the data in the column will be lost.
  - You are about to drop the column `womanPhoto` on the `RecordCouple` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "document",
DROP COLUMN "photo";

-- AlterTable
ALTER TABLE "RecordCouple" DROP COLUMN "womanDocument",
DROP COLUMN "womanPhoto";
