import { prisma } from '@/database';

export async function getDinamicRecordById(id: string) {
  const normalRecord = await prisma.recordEntity.findUnique({
    where: { id },
    include: { recordPOSl: true, recordCouple: true, recordWork: true, recordPOSll: true },
  });

  if (normalRecord) return normalRecord;

  const poslllRecords = await prisma.poslll.findUnique({
    where: { id },
  });

  return poslllRecords;
}
