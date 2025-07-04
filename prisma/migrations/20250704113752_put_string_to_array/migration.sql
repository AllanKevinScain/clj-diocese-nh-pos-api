/*
  Warnings:

  - The `spiritualLife` column on the `Record` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `livesWith` column on the `RecordPOSl` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "spiritualLife",
ADD COLUMN     "spiritualLife" TEXT[];

-- AlterTable
ALTER TABLE "RecordPOSl" DROP COLUMN "livesWith",
ADD COLUMN     "livesWith" TEXT[];
