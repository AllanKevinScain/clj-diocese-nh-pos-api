/*
  Warnings:

  - Changed the type of `courseOne` on the `PeapleCljThree` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `courseTwo` on the `PeapleCljThree` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `courseThree` on the `PeapleCljThree` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."PeapleCljThree" DROP COLUMN "courseOne",
ADD COLUMN     "courseOne" INTEGER NOT NULL,
DROP COLUMN "courseTwo",
ADD COLUMN     "courseTwo" INTEGER NOT NULL,
DROP COLUMN "courseThree",
ADD COLUMN     "courseThree" INTEGER NOT NULL;
