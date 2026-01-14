-- CreateEnum
CREATE TYPE "RecordRoleType" AS ENUM ('base', 'auxiliar', 'coordinator', 'liturgy', 'secretary', 'kitchenSpiritual', 'coupleKitchenCoordinator', 'auxiliarLiturgy', 'auxiliarSecretary', 'bar', 'coupleSafeToBe', 'folkloreCoordinator', 'kitchen');

-- CreateTable
CREATE TABLE "RecordRole" (
    "id" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "role" "RecordRoleType" NOT NULL,
    "courseId" TEXT NOT NULL,
    "workTableId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecordRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RecordRole_role_courseId_idx" ON "RecordRole"("role", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "RecordRole_recordId_role_courseId_key" ON "RecordRole"("recordId", "role", "courseId");

-- AddForeignKey
ALTER TABLE "RecordRole" ADD CONSTRAINT "RecordRole_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "RecordEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordRole" ADD CONSTRAINT "RecordRole_workTableId_fkey" FOREIGN KEY ("workTableId") REFERENCES "WorkTableEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
