import { prisma } from '@/database';
import { RecordWorkSchema, SubRecordWorkSchema } from '@/schemas';

import type { RecordWorkInterface } from '../record-work.type';

export async function createWorkRepository(props: RecordWorkInterface) {
  const { createdById, dto } = props;
  const { recordWork, ...recordWithoutObject } = RecordWorkSchema.parse(dto);
  const parseRecordWork = SubRecordWorkSchema.omit({ recordId: true, id: true }).parse(recordWork);

  const prismaRequest = await prisma.recordEntity.create({
    data: {
      ...recordWithoutObject,
      createdById,
      isWork: true,
      recordWork: { create: parseRecordWork },
    },
    include: { recordWork: true },
  });
  return prismaRequest;
}
