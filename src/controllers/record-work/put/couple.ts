import { prisma } from '@/database';
import { RecordCoupleSchema, SubRecordCoupleSchema } from '@/schemas';

import type { RecordWorkPutInterface } from '../record-work.type';

export async function putCoupleRepository(params: RecordWorkPutInterface) {
  const { dto, id } = params;
  const { recordCouple, ...recordWithoutCouple } = RecordCoupleSchema.partial().parse(dto);

  let parsedRecordCouple = {};
  if (recordCouple) {
    parsedRecordCouple = SubRecordCoupleSchema.omit({ recordId: true })
      .partial()
      .parse(recordCouple);
  }

  const prismaRequest = await prisma.recordEntity.update({
    where: { id },
    data: {
      ...recordWithoutCouple,
      ...(recordCouple && {
        recordCouple: { update: parsedRecordCouple },
      }),
    },
    include: { recordCouple: true },
  });

  return prismaRequest;
}
