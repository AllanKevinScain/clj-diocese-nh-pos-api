-- CreateTable
CREATE TABLE "public"."CommunityMember" (
    "id" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,

    CONSTRAINT "CommunityMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Community" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "workTableId" TEXT NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WorkTable" (
    "id" TEXT NOT NULL,
    "auxiliar" TEXT,
    "auxiliarLiturgy" TEXT,
    "auxiliarSecretary" TEXT,
    "bar" TEXT,
    "base" TEXT,
    "cordinator" TEXT,
    "coupleKitchenCoordinator" TEXT,
    "coupleSafeToBe" TEXT,
    "folkloreCoordinator" TEXT,
    "kitchenSpiritual" TEXT,
    "liturgy" TEXT,
    "secretary" TEXT,
    "cleanWorkRecords" TEXT[],
    "copeWorkRecords" TEXT[],
    "kitchenWorkRecords" TEXT[],

    CONSTRAINT "WorkTable_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."CommunityMember" ADD CONSTRAINT "CommunityMember_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "public"."Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Community" ADD CONSTRAINT "Community_workTableId_fkey" FOREIGN KEY ("workTableId") REFERENCES "public"."WorkTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
