/*
  Warnings:

  - The primary key for the `Record` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RecordCouple` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RecordPOSl` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RecordPOSll` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RecordWork` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "RecordCouple" DROP CONSTRAINT "RecordCouple_recordId_fkey";

-- DropForeignKey
ALTER TABLE "RecordPOSl" DROP CONSTRAINT "RecordPOSl_recordId_fkey";

-- DropForeignKey
ALTER TABLE "RecordPOSll" DROP CONSTRAINT "RecordPOSll_recordId_fkey";

-- DropForeignKey
ALTER TABLE "RecordWork" DROP CONSTRAINT "RecordWork_recordId_fkey";

-- AlterTable
ALTER TABLE "Record" DROP CONSTRAINT "Record_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Record_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Record_id_seq";

-- AlterTable
ALTER TABLE "RecordCouple" DROP CONSTRAINT "RecordCouple_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "recordId" SET DATA TYPE TEXT,
ADD CONSTRAINT "RecordCouple_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RecordCouple_id_seq";

-- AlterTable
ALTER TABLE "RecordPOSl" DROP CONSTRAINT "RecordPOSl_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "recordId" SET DATA TYPE TEXT,
ADD CONSTRAINT "RecordPOSl_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RecordPOSl_id_seq";

-- AlterTable
ALTER TABLE "RecordPOSll" DROP CONSTRAINT "RecordPOSll_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "recordId" SET DATA TYPE TEXT,
ADD CONSTRAINT "RecordPOSll_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RecordPOSll_id_seq";

-- AlterTable
ALTER TABLE "RecordWork" DROP CONSTRAINT "RecordWork_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "recordId" SET DATA TYPE TEXT,
ADD CONSTRAINT "RecordWork_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RecordWork_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "RecordPOSl" ADD CONSTRAINT "RecordPOSl_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordPOSll" ADD CONSTRAINT "RecordPOSll_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordWork" ADD CONSTRAINT "RecordWork_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordCouple" ADD CONSTRAINT "RecordCouple_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
