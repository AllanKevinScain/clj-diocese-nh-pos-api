import { prisma } from '@/database';

export async function listRecordsByCourseNumber(courseNumber: string) {
  const prismaRequest = await prisma.recordEntity.findMany({
    where: { courseNumber },
    include: { recordCouple: true },
  });

  return prismaRequest;
}
