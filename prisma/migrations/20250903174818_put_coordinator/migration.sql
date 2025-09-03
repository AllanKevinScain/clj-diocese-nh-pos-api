/*
  Warnings:

  - You are about to drop the column `cordinator` on the `WorkTable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."WorkTable" DROP COLUMN "cordinator",
ADD COLUMN     "coordinator" TEXT;
