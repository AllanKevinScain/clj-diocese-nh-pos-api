/*
  Warnings:

  - A unique constraint covering the columns `[workTableId,office,recordId]` on the table `KitchenMember` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "KitchenMember_workTableId_office_recordId_key" ON "KitchenMember"("workTableId", "office", "recordId");
