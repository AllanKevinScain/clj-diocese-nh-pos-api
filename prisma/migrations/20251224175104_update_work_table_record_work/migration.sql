/*
  Warnings:

  - You are about to drop the column `cleanWorkRecords` on the `WorkTableEntity` table. All the data in the column will be lost.
  - You are about to drop the column `copeWorkRecords` on the `WorkTableEntity` table. All the data in the column will be lost.
  - You are about to drop the column `kitchenWorkRecords` on the `WorkTableEntity` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TypeOfficeWorkKitchenMember" AS ENUM ('cleanWork', 'copeWork', 'kitchenWork');

-- AlterTable
ALTER TABLE "WorkTableEntity" DROP COLUMN "cleanWorkRecords",
DROP COLUMN "copeWorkRecords",
DROP COLUMN "kitchenWorkRecords";

-- CreateTable
CREATE TABLE "KitchenMember" (
    "id" TEXT NOT NULL,
    "office" "TypeOfficeWorkKitchenMember" NOT NULL,
    "recordId" TEXT NOT NULL,
    "workTableId" TEXT NOT NULL,

    CONSTRAINT "KitchenMember_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KitchenMember" ADD CONSTRAINT "KitchenMember_workTableId_fkey" FOREIGN KEY ("workTableId") REFERENCES "WorkTableEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
