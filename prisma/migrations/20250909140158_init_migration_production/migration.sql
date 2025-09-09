-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "loginType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RefreshToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Course" (
    "id" TEXT NOT NULL,
    "typeOfCourse" TEXT NOT NULL DEFAULT 'POSl',
    "courseNumber" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RecordEntity" (
    "id" TEXT NOT NULL,
    "typeOfRecord" TEXT NOT NULL,
    "courseNumber" TEXT NOT NULL,
    "parishAcronym" TEXT NOT NULL,
    "recordNumber" TEXT NOT NULL,
    "candidateName" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "candidatePhone" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "priest" TEXT NOT NULL,
    "parishChapel" TEXT NOT NULL,
    "spiritualLife" TEXT[],
    "observationsCoordinator" TEXT NOT NULL DEFAULT '',
    "observationsDed" TEXT NOT NULL,
    "disease" TEXT,
    "medication" TEXT,
    "allergy" TEXT,
    "dataConsent" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecordEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RecordPOSl" (
    "id" TEXT NOT NULL,
    "godfatherName" TEXT NOT NULL,
    "godfatherPhone" TEXT NOT NULL,
    "godfatherEmail" TEXT NOT NULL,
    "affinityWithGodfather" TEXT NOT NULL,
    "attitudeCommunication" TEXT NOT NULL,
    "doctrineCommunication" TEXT NOT NULL,
    "godfatherResponsibility" TEXT NOT NULL,
    "candidateSpirit" TEXT NOT NULL,
    "candidateDisposition" TEXT NOT NULL,
    "candidateParticipation" TEXT NOT NULL,
    "fatherSituation" TEXT NOT NULL,
    "motherSituation" TEXT NOT NULL,
    "livesWith" TEXT[],
    "otherWho" TEXT,
    "parentsReligion" TEXT,
    "otherReligion" TEXT,
    "parentsComment" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,

    CONSTRAINT "RecordPOSl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RecordPOSll" (
    "id" TEXT NOT NULL,
    "courseOneDone" TEXT NOT NULL,
    "motivationToParticipate" TEXT NOT NULL,
    "reasonForCLJII" TEXT NOT NULL,
    "approachToChrist" TEXT NOT NULL,
    "acceptsChurchDoctrine" TEXT NOT NULL,
    "commitmentToCLJ" TEXT NOT NULL,
    "perseveranceInCommunity" TEXT NOT NULL,
    "hideImportantInfo" BOOLEAN NOT NULL,
    "currentGroupFunction" TEXT NOT NULL,
    "parishChapelActivities" TEXT NOT NULL,
    "doingConfirmation" BOOLEAN,
    "notConfirmationBecause" TEXT,
    "recordId" TEXT NOT NULL,

    CONSTRAINT "RecordPOSll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RecordWork" (
    "id" TEXT NOT NULL,
    "courseOneDone" TEXT NOT NULL,
    "courseTwoDone" TEXT NOT NULL,
    "courseThreeDone" TEXT,
    "workedInWhichCourses" TEXT NOT NULL,
    "graceStateAwareness" TEXT NOT NULL,
    "notFalsifyData" BOOLEAN NOT NULL,
    "showLifeTestimony" TEXT NOT NULL,
    "currentGroupFunction" TEXT NOT NULL,
    "parishActivities" TEXT NOT NULL,
    "doingConfirmation" BOOLEAN,
    "notConfirmationBecause" TEXT,
    "instrument" TEXT,
    "reasonToWork" TEXT NOT NULL,
    "workPreference" TEXT NOT NULL,
    "willingToOtherFunction" BOOLEAN NOT NULL,
    "parishIndication" TEXT[],
    "recordId" TEXT NOT NULL,

    CONSTRAINT "RecordWork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RecordCouple" (
    "id" TEXT NOT NULL,
    "workPreference" TEXT NOT NULL,
    "externalCouple" BOOLEAN,
    "cookCouple" BOOLEAN,
    "womanName" TEXT NOT NULL,
    "womanNickname" TEXT NOT NULL,
    "womanPhone" TEXT NOT NULL,
    "womanInstagram" TEXT NOT NULL,
    "womanBirthDate" TEXT NOT NULL,
    "coursesOneDone" TEXT,
    "coursesTwoDone" TEXT,
    "coursesThreeDone" TEXT,
    "coursesDone" TEXT NOT NULL,
    "currentGroupFunction" TEXT NOT NULL,
    "participatedOtherGroups" TEXT NOT NULL,
    "womanSpiritualLife" TEXT[],
    "familyLife" TEXT NOT NULL,
    "religiousWeddingDate" TEXT NOT NULL,
    "participatedInRetreat" BOOLEAN NOT NULL,
    "motivationToParticipate" TEXT NOT NULL,
    "parishIndication" TEXT[],
    "recordId" TEXT NOT NULL,

    CONSTRAINT "RecordCouple_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Poslll" (
    "id" TEXT NOT NULL,
    "candidatePhone" TEXT,
    "candidateName" TEXT NOT NULL,
    "parishChapel" TEXT NOT NULL DEFAULT 'Capela Santa Cecília',
    "instagram" TEXT,
    "courseOne" TEXT NOT NULL,
    "courseTwo" TEXT NOT NULL,
    "courseThree" TEXT NOT NULL,
    "formations" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Poslll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Community" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "workTableId" TEXT NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CommunityMember" (
    "id" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,

    CONSTRAINT "CommunityMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WorkTableEntity" (
    "id" TEXT NOT NULL,
    "courseNumber" TEXT NOT NULL,
    "auxiliar" TEXT,
    "auxiliarLiturgy" TEXT,
    "auxiliarSecretary" TEXT,
    "bar" TEXT,
    "base" TEXT,
    "coordinator" TEXT,
    "coupleKitchenCoordinator" TEXT,
    "coupleSafeToBe" TEXT,
    "folkloreCoordinator" TEXT,
    "kitchenSpiritual" TEXT,
    "liturgy" TEXT,
    "secretary" TEXT,
    "cleanWorkRecords" TEXT[],
    "copeWorkRecords" TEXT[],
    "kitchenWorkRecords" TEXT[],

    CONSTRAINT "WorkTableEntity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "public"."RefreshToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_userId_key" ON "public"."RefreshToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RecordPOSl_recordId_key" ON "public"."RecordPOSl"("recordId");

-- CreateIndex
CREATE UNIQUE INDEX "RecordPOSll_recordId_key" ON "public"."RecordPOSll"("recordId");

-- CreateIndex
CREATE UNIQUE INDEX "RecordWork_recordId_key" ON "public"."RecordWork"("recordId");

-- CreateIndex
CREATE UNIQUE INDEX "RecordCouple_recordId_key" ON "public"."RecordCouple"("recordId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkTableEntity_courseNumber_key" ON "public"."WorkTableEntity"("courseNumber");

-- AddForeignKey
ALTER TABLE "public"."RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecordPOSl" ADD CONSTRAINT "RecordPOSl_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "public"."RecordEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecordPOSll" ADD CONSTRAINT "RecordPOSll_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "public"."RecordEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecordWork" ADD CONSTRAINT "RecordWork_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "public"."RecordEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecordCouple" ADD CONSTRAINT "RecordCouple_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "public"."RecordEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Community" ADD CONSTRAINT "Community_workTableId_fkey" FOREIGN KEY ("workTableId") REFERENCES "public"."WorkTableEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityMember" ADD CONSTRAINT "CommunityMember_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "public"."Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;
