-- AddForeignKey
ALTER TABLE "RecordRole" ADD CONSTRAINT "RecordRole_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
