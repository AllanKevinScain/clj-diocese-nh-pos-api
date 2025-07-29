/*
  Warnings:

  - You are about to drop the column `willingToOtherFunction` on the `RecordCouple` table. All the data in the column will be lost.
  - The `parishIndication` column on the `RecordCouple` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `currentGroupFunction` to the `RecordCouple` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familyLife` to the `RecordCouple` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participatedOtherGroups` to the `RecordCouple` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecordCouple" DROP COLUMN "willingToOtherFunction",
ADD COLUMN     "coursesOneDone" TEXT,
ADD COLUMN     "coursesThreeDone" TEXT,
ADD COLUMN     "coursesTwoDone" TEXT,
ADD COLUMN     "currentGroupFunction" TEXT NOT NULL,
ADD COLUMN     "familyLife" TEXT NOT NULL,
ADD COLUMN     "participatedOtherGroups" TEXT NOT NULL,
ADD COLUMN     "womanSpiritualLife" TEXT[],
DROP COLUMN "parishIndication",
ADD COLUMN     "parishIndication" TEXT[];
