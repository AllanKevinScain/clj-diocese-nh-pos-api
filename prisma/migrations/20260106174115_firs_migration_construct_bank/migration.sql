-- CreateEnum
CREATE TYPE "TypeOfRecord" AS ENUM ('POSl', 'POSll', 'POSlll');

-- CreateEnum
CREATE TYPE "TypeOfficeWorkKitchenMember" AS ENUM ('cleanWork', 'copeWork', 'kitchenWork');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "loginType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "coName" TEXT,
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "typeOfCourse" "TypeOfRecord" NOT NULL DEFAULT 'POSl',
    "courseNumber" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "base" TEXT NOT NULL,
    "auxiliar" TEXT NOT NULL,
    "coordinator" TEXT NOT NULL,
    "liturgy" TEXT NOT NULL,
    "secretary" TEXT NOT NULL,
    "kitchenSpiritual" TEXT NOT NULL,
    "coupleKitchenCoordinator" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordEntity" (
    "id" TEXT NOT NULL,
    "typeOfRecord" "TypeOfRecord" DEFAULT 'POSl',
    "courseNumber" TEXT NOT NULL,
    "recordNumber" TEXT NOT NULL,
    "candidateName" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "candidatePhone" TEXT NOT NULL,
    "isWork" BOOLEAN NOT NULL DEFAULT false,
    "isCoupleWork" BOOLEAN NOT NULL DEFAULT false,
    "parishChapel" TEXT NOT NULL,
    "dataConsent" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "RecordEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordPOSl" (
    "id" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "godfatherName" TEXT NOT NULL,
    "godfatherPhone" TEXT NOT NULL,
    "candidateSpirit" TEXT NOT NULL,
    "candidateDisposition" TEXT NOT NULL,
    "candidateParticipation" TEXT NOT NULL,

    CONSTRAINT "RecordPOSl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordPOSll" (
    "id" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,

    CONSTRAINT "RecordPOSll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordPOSlll" (
    "id" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,

    CONSTRAINT "RecordPOSlll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordWork" (
    "id" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,

    CONSTRAINT "RecordWork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordCouple" (
    "id" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "womanName" TEXT NOT NULL,
    "womanNickname" TEXT NOT NULL,
    "womanPhone" TEXT NOT NULL,
    "womanBirthDate" TEXT NOT NULL,

    CONSTRAINT "RecordCouple_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poslll" (
    "id" TEXT NOT NULL,
    "candidateName" TEXT NOT NULL,
    "parishChapel" TEXT NOT NULL DEFAULT 'Novo Hamburgo',
    "courseOne" TEXT NOT NULL,
    "courseTwo" TEXT NOT NULL,
    "courseThree" TEXT NOT NULL,
    "formations" TEXT NOT NULL,
    "instagram" TEXT DEFAULT '@cljdiocesenh',
    "instagramWoman" TEXT DEFAULT '@cljdiocesenh',
    "isCouple" BOOLEAN DEFAULT false,
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Poslll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityMember" (
    "id" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,

    CONSTRAINT "CommunityMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Community" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "workTableId" TEXT NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KitchenMember" (
    "id" TEXT NOT NULL,
    "office" "TypeOfficeWorkKitchenMember" NOT NULL,
    "recordId" TEXT NOT NULL,
    "workTableId" TEXT NOT NULL,

    CONSTRAINT "KitchenMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkTableEntity" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "auxiliarLiturgy" TEXT,
    "auxiliarSecretary" TEXT,
    "bar" TEXT,
    "coupleSafeToBe" TEXT,
    "folkloreCoordinator" TEXT,

    CONSTRAINT "WorkTableEntity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_userId_key" ON "RefreshToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_typeOfCourse_courseNumber_key" ON "Course"("typeOfCourse", "courseNumber");

-- CreateIndex
CREATE UNIQUE INDEX "RecordPOSl_recordId_key" ON "RecordPOSl"("recordId");

-- CreateIndex
CREATE UNIQUE INDEX "RecordPOSll_recordId_key" ON "RecordPOSll"("recordId");

-- CreateIndex
CREATE UNIQUE INDEX "RecordPOSlll_recordId_key" ON "RecordPOSlll"("recordId");

-- CreateIndex
CREATE UNIQUE INDEX "RecordWork_recordId_key" ON "RecordWork"("recordId");

-- CreateIndex
CREATE UNIQUE INDEX "RecordCouple_recordId_key" ON "RecordCouple"("recordId");

-- CreateIndex
CREATE UNIQUE INDEX "Poslll_candidateName_key" ON "Poslll"("candidateName");

-- CreateIndex
CREATE UNIQUE INDEX "KitchenMember_workTableId_office_recordId_key" ON "KitchenMember"("workTableId", "office", "recordId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkTableEntity_courseId_key" ON "WorkTableEntity"("courseId");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordPOSl" ADD CONSTRAINT "RecordPOSl_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "RecordEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordPOSll" ADD CONSTRAINT "RecordPOSll_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "RecordEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordPOSlll" ADD CONSTRAINT "RecordPOSlll_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "RecordEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordWork" ADD CONSTRAINT "RecordWork_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "RecordEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordCouple" ADD CONSTRAINT "RecordCouple_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "RecordEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityMember" ADD CONSTRAINT "CommunityMember_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community" ADD CONSTRAINT "Community_workTableId_fkey" FOREIGN KEY ("workTableId") REFERENCES "WorkTableEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KitchenMember" ADD CONSTRAINT "KitchenMember_workTableId_fkey" FOREIGN KEY ("workTableId") REFERENCES "WorkTableEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
