import { prisma } from '@/database';
import { candidatePoslllSchema, candidateSubPoslllSchema } from '@/schemas';

import type { RecordWorkPutInterface } from '../../record-work';

export async function putRecordPoslllRepository(params: RecordWorkPutInterface) {
  const { dto, id } = params;
  const { recordPOSlll, ...recordWithoutPoslll } = candidatePoslllSchema.partial().parse(dto);

  let parsedRecordPoslll = {};
  if (recordPOSlll) {
    parsedRecordPoslll = candidateSubPoslllSchema
      .omit({ recordId: true })
      .partial()
      .parse(recordPOSlll);
  }

  const prismaRequest = await prisma.recordEntity.update({
    where: { id },
    data: {
      ...recordWithoutPoslll,
      ...(recordPOSlll && {
        recordPOSlll: { update: parsedRecordPoslll },
      }),
    },
    include: { recordPOSlll: true },
  });

  return prismaRequest;
}
