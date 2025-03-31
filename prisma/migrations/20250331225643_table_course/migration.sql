-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "courseNumber" INTEGER NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);
