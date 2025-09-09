/*
  Warnings:

  - Added the required column `createdById` to the `RecordEntity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."RecordEntity" ADD COLUMN     "createdById" TEXT NOT NULL;
