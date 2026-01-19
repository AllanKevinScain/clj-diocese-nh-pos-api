import { prisma } from '@/database';
import { candidatePoslSchema, candidateSubRecordPoslSchema } from '@/schemas';

import type { RecordWorkPutInterface } from '../../record-work';

export async function putRecordPOSlRepository(params: RecordWorkPutInterface) {
  const { dto, id } = params;
  const { recordPOSl, ...recordWithoutPOSl } = candidatePoslSchema.partial().parse(dto);

  let parsedRecordPosl = {};
  if (recordPOSl) {
    parsedRecordPosl = candidateSubRecordPoslSchema
      .omit({ recordId: true })
      .partial()
      .parse(recordPOSl);
  }

  const prismaRequest = await prisma.recordEntity.update({
    where: { id },
    data: {
      ...recordWithoutPOSl,
      ...(recordPOSl && {
        recordPOSl: { update: parsedRecordPosl },
      }),
    },
    include: { recordPOSl: true },
  });

  return prismaRequest;
}
