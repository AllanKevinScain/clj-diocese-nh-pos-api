import { prisma } from '@/database';

export async function getRecordById(id: string) {
  const prismaRequest = await prisma.recordEntity.findUnique({
    where: { id },
    include: { recordPOSl: true, recordCouple: true, recordWork: true, recordPOSll: true },
  });

  return prismaRequest;
}
