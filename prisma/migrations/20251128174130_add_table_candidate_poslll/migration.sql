-- CreateTable
CREATE TABLE "RecordPOSlll" (
    "id" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,

    CONSTRAINT "RecordPOSlll_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RecordPOSlll_recordId_key" ON "RecordPOSlll"("recordId");

-- AddForeignKey
ALTER TABLE "RecordPOSlll" ADD CONSTRAINT "RecordPOSlll_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "RecordEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
