import { prisma } from '../../../database';
import { candidatePoslSchema, candidateSubRecordPoslSchema } from '../../../schemas';
import { RecordWorkInterface } from '../../record-work';

export async function createRecordPOSlRepository(props: RecordWorkInterface) {
  const { createdById, dto } = props;
  const { recordPOSl, ...recordWithoutObject } = candidatePoslSchema.parse(dto);
  const recordPoslCreate = candidateSubRecordPoslSchema
    .omit({ recordId: true, id: true })
    .parse(recordPOSl);

  const prismaRequest = await prisma.recordEntity.create({
    data: {
      ...recordWithoutObject,
      candidatePhone: recordWithoutObject.candidatePhone.replace(/[^\d]/g, '').trim(),
      createdById,
      recordPOSl: { create: recordPoslCreate },
    },
    include: { recordPOSl: true },
  });

  if (prismaRequest) {
    await prisma.participant.create({ data: { recordId: prismaRequest.id } });
  }

  return prismaRequest;
}
