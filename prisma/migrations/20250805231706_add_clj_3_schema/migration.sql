-- CreateTable
CREATE TABLE "public"."PeapleCljThree" (
    "id" TEXT NOT NULL,
    "candidatePhone" TEXT,
    "candidateName" TEXT NOT NULL,
    "instagram" TEXT,
    "courseOne" TEXT NOT NULL,
    "courseTwo" TEXT NOT NULL,
    "courseThree" TEXT NOT NULL,
    "formations" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PeapleCljThree_pkey" PRIMARY KEY ("id")
);
