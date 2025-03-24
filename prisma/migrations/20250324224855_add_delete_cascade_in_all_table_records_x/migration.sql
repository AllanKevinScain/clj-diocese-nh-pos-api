-- DropForeignKey
ALTER TABLE "RecordCouple" DROP CONSTRAINT "RecordCouple_recordId_fkey";

-- DropForeignKey
ALTER TABLE "RecordPOSl" DROP CONSTRAINT "RecordPOSl_recordId_fkey";

-- DropForeignKey
ALTER TABLE "RecordPOSll" DROP CONSTRAINT "RecordPOSll_recordId_fkey";

-- DropForeignKey
ALTER TABLE "RecordWork" DROP CONSTRAINT "RecordWork_recordId_fkey";

-- AddForeignKey
ALTER TABLE "RecordPOSl" ADD CONSTRAINT "RecordPOSl_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordPOSll" ADD CONSTRAINT "RecordPOSll_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordWork" ADD CONSTRAINT "RecordWork_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordCouple" ADD CONSTRAINT "RecordCouple_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE CASCADE ON UPDATE CASCADE;
