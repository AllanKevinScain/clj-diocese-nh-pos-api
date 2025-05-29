/*
  Warnings:

  - A unique constraint covering the columns `[recordId]` on the table `RecordCouple` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[recordId]` on the table `RecordPOSl` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[recordId]` on the table `RecordPOSll` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[recordId]` on the table `RecordWork` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RecordCouple_recordId_key" ON "RecordCouple"("recordId");

-- CreateIndex
CREATE UNIQUE INDEX "RecordPOSl_recordId_key" ON "RecordPOSl"("recordId");

-- CreateIndex
CREATE UNIQUE INDEX "RecordPOSll_recordId_key" ON "RecordPOSll"("recordId");

-- CreateIndex
CREATE UNIQUE INDEX "RecordWork_recordId_key" ON "RecordWork"("recordId");
