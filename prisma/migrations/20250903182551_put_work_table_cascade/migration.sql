-- DropForeignKey
ALTER TABLE "public"."Community" DROP CONSTRAINT "Community_workTableId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityMember" DROP CONSTRAINT "CommunityMember_communityId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Community" ADD CONSTRAINT "Community_workTableId_fkey" FOREIGN KEY ("workTableId") REFERENCES "public"."WorkTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityMember" ADD CONSTRAINT "CommunityMember_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "public"."Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;
