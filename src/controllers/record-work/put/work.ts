import { prisma } from '@/database';
import { RecordWorkSchema, SubRecordWorkSchema } from '@/schemas';

import type { RecordWorkPutInterface } from '../record-work.type';

export async function putWorkRepository(params: RecordWorkPutInterface) {
  const { dto, id } = params;
  const { recordWork, ...recordWithoutObject } = RecordWorkSchema.partial().parse(dto);

  let parsedRecordWork = {};
  if (recordWork) {
    parsedRecordWork = SubRecordWorkSchema.omit({ recordId: true }).partial().parse(recordWork);
  }

  const prismaRequest = await prisma.recordEntity.update({
    where: { id },
    data: {
      ...recordWithoutObject,
      ...(recordWork && {
        recordWork: { update: parsedRecordWork },
      }),
    },
    include: { recordWork: true },
  });

  return prismaRequest;
}
