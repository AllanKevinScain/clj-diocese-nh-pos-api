import { prisma } from '../database';

export async function deleteRecordById(id: string) {
  const prismaRequest = await prisma.recordEntity.delete({
    where: { id },
  });

  return prismaRequest;
}
