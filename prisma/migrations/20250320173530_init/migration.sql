-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "loginType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "typeOfRecord" TEXT NOT NULL,
    "courseNumber" INTEGER NOT NULL,
    "parishAcronym" TEXT NOT NULL,
    "recordNumber" INTEGER NOT NULL,
    "photo" TEXT NOT NULL,
    "candidateName" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "candidatePhone" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "priest" TEXT NOT NULL,
    "parishChapel" TEXT NOT NULL,
    "spiritualLife" TEXT NOT NULL,
    "observationsDed" TEXT NOT NULL,
    "disease" TEXT NOT NULL,
    "medication" TEXT NOT NULL,
    "allergy" TEXT NOT NULL,
    "dataConsent" BOOLEAN NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordPOSl" (
    "id" SERIAL NOT NULL,
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
    "livesWith" TEXT NOT NULL,
    "otherWho" TEXT NOT NULL,
    "parentsReligion" TEXT NOT NULL,
    "parentsComment" TEXT NOT NULL,
    "recordId" INTEGER NOT NULL,

    CONSTRAINT "RecordPOSl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordPOSll" (
    "id" SERIAL NOT NULL,
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
    "doingConfirmation" BOOLEAN NOT NULL,
    "groupObservations" TEXT NOT NULL,
    "recordId" INTEGER NOT NULL,

    CONSTRAINT "RecordPOSll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordWork" (
    "id" SERIAL NOT NULL,
    "coursesDone" TEXT NOT NULL,
    "workedInWhichCourses" TEXT NOT NULL,
    "graceStateAwareness" TEXT NOT NULL,
    "notFalsifyData" BOOLEAN NOT NULL,
    "showLifeTestimony" TEXT NOT NULL,
    "currentGroupFunction" TEXT NOT NULL,
    "parishActivities" TEXT NOT NULL,
    "doingConfirmation" BOOLEAN NOT NULL,
    "instrument" TEXT NOT NULL,
    "reasonToWork" TEXT NOT NULL,
    "workPreference" TEXT NOT NULL,
    "willingToOtherFunction" BOOLEAN NOT NULL,
    "parishIndication" TEXT NOT NULL,
    "recordId" INTEGER NOT NULL,

    CONSTRAINT "RecordWork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordCouple" (
    "id" SERIAL NOT NULL,
    "workPreference" TEXT NOT NULL,
    "externalCouple" BOOLEAN NOT NULL,
    "cookCouple" BOOLEAN NOT NULL,
    "womanName" TEXT NOT NULL,
    "womanPhoto" TEXT NOT NULL,
    "womanDocument" TEXT NOT NULL,
    "womanNickname" TEXT NOT NULL,
    "womanPhone" TEXT NOT NULL,
    "womanInstagram" TEXT NOT NULL,
    "womanBirthDate" TIMESTAMP(3) NOT NULL,
    "coursesDone" TEXT NOT NULL,
    "religiousWeddingDate" TIMESTAMP(3) NOT NULL,
    "participatedInRetreat" BOOLEAN NOT NULL,
    "motivationToParticipate" TEXT NOT NULL,
    "parishIndication" TEXT NOT NULL,
    "willingToOtherFunction" BOOLEAN NOT NULL,
    "recordId" INTEGER NOT NULL,

    CONSTRAINT "RecordCouple_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "RecordPOSl" ADD CONSTRAINT "RecordPOSl_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordPOSll" ADD CONSTRAINT "RecordPOSll_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordWork" ADD CONSTRAINT "RecordWork_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordCouple" ADD CONSTRAINT "RecordCouple_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
