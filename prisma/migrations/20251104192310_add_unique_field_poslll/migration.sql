/*
  Warnings:

  - A unique constraint covering the columns `[candidateName]` on the table `Poslll` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Poslll_candidateName_key" ON "public"."Poslll"("candidateName");
