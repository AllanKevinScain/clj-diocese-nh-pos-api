/*
  Warnings:

  - A unique constraint covering the columns `[courseNumber]` on the table `WorkTable` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseNumber` to the `WorkTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."WorkTable" ADD COLUMN     "courseNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WorkTable_courseNumber_key" ON "public"."WorkTable"("courseNumber");
