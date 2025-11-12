import { prisma } from '../../../database';
import { PoslSchema, RecordPoslSchema } from '../../../schemas';
import { RecordWorkInterface } from '../../record-work';

export async function createRecordPOSlRepository(props: RecordWorkInterface) {
  const { createdById, dto } = props;
  const { recordPOSl, ...recordWithoutObject } = PoslSchema.parse(dto);
  const recordPoslCreate = RecordPoslSchema.omit({ recordId: true, id: true }).parse(recordPOSl);

  const prismaRequest = await prisma.recordEntity.create({
    data: {
      ...recordWithoutObject,
      candidatePhone: recordWithoutObject.candidatePhone.replace(/[^\d]/g, '').trim(),
      createdById,
      recordPOSl: { create: recordPoslCreate },
    },
    include: { recordPOSl: true },
  });
  return prismaRequest;
}
