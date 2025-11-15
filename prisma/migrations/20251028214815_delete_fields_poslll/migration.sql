/*
  Warnings:

  - You are about to drop the column `candidatePhone` on the `Poslll` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Poslll` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Poslll"
DROP COLUMN IF EXISTS "candidatePhone",
DROP COLUMN IF EXISTS "city";
