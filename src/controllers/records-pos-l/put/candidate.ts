import { prisma } from '../../../database';
import { PoslSchema, RecordPoslSchema } from '../../../schemas';
import { RecordWorkPutInterface } from '../../record-work';

export async function putRecordPOSlRepository(params: RecordWorkPutInterface) {
  const { dto, id } = params;
  const { recordPOSl, ...recordWithoutPOSl } = PoslSchema.partial().parse(dto);

  let parsedRecordPosl = {};
  if (recordPOSl) {
    parsedRecordPosl = RecordPoslSchema.omit({ recordId: true }).partial().parse(recordPOSl);
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
