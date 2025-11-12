/*
  Warnings:

  - The `typeOfRecord` column on the `RecordEntity` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."TypeOfRecord" AS ENUM ('POSl', 'POSll', 'POSlll');

-- AlterTable
ALTER TABLE "public"."RecordEntity" ADD COLUMN     "isCoupleWork" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isWork" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "typeOfRecord",
ADD COLUMN     "typeOfRecord" "public"."TypeOfRecord" NOT NULL DEFAULT 'POSl';
