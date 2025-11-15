import { prisma } from '../../../database';
import { RecordPosllSchema, SubRecordPosllSchema } from '../../../schemas';
import { RecordWorkPutInterface } from '../../record-work';

export async function putRecordPosllRepository(params: RecordWorkPutInterface) {
  const { dto, id } = params;
  const { recordPOSll, ...recordWithoutPosll } = RecordPosllSchema.partial().parse(dto);

  let parsedRecordPosll = {};
  if (recordPOSll) {
    parsedRecordPosll = SubRecordPosllSchema.omit({ recordId: true }).partial().parse(recordPOSll);
  }

  const prismaRequest = await prisma.recordEntity.update({
    where: { id },
    data: {
      ...recordWithoutPosll,
      ...(recordPOSll && {
        recordPOSll: { update: parsedRecordPosll },
      }),
    },
    include: { recordPOSll: true },
  });

  return prismaRequest;
}
