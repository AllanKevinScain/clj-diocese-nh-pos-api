/*
  Warnings:

  - The `typeOfCourse` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[typeOfCourse,courseNumber]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "typeOfCourse",
ADD COLUMN     "typeOfCourse" "TypeOfRecord" NOT NULL DEFAULT 'POSl';

-- CreateIndex
CREATE UNIQUE INDEX "Course_typeOfCourse_courseNumber_key" ON "Course"("typeOfCourse", "courseNumber");
