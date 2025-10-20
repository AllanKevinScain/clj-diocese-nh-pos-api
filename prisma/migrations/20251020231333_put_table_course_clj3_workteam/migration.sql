/*
  Warnings:

  - You are about to drop the column `auxiliar` on the `WorkTableEntity` table. All the data in the column will be lost.
  - You are about to drop the column `base` on the `WorkTableEntity` table. All the data in the column will be lost.
  - You are about to drop the column `coordinator` on the `WorkTableEntity` table. All the data in the column will be lost.
  - You are about to drop the column `coupleKitchenCoordinator` on the `WorkTableEntity` table. All the data in the column will be lost.
  - You are about to drop the column `kitchenSpiritual` on the `WorkTableEntity` table. All the data in the column will be lost.
  - You are about to drop the column `liturgy` on the `WorkTableEntity` table. All the data in the column will be lost.
  - You are about to drop the column `secretary` on the `WorkTableEntity` table. All the data in the column will be lost.
  - Added the required column `city` to the `Poslll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Course" ADD COLUMN     "auxiliar" TEXT,
ADD COLUMN     "base" TEXT,
ADD COLUMN     "coordinator" TEXT,
ADD COLUMN     "coupleKitchenCoordinator" TEXT,
ADD COLUMN     "kitchenSpiritual" TEXT,
ADD COLUMN     "liturgy" TEXT,
ADD COLUMN     "secretary" TEXT;

-- AlterTable
ALTER TABLE "public"."Poslll" ADD COLUMN     "city" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."WorkTableEntity" DROP COLUMN "auxiliar",
DROP COLUMN "base",
DROP COLUMN "coordinator",
DROP COLUMN "coupleKitchenCoordinator",
DROP COLUMN "kitchenSpiritual",
DROP COLUMN "liturgy",
DROP COLUMN "secretary";
