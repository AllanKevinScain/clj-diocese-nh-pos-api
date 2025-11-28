import { prisma } from '../../../database';
import { candidatePoslllSchema, candidateSubPoslllSchema } from '../../../schemas';
import { RecordWorkInterface } from '../../record-work';

export async function createRecordPoslllRepository(props: RecordWorkInterface) {
  const { createdById, dto } = props;
  const { recordPOSlll, ...recordWithoutObject } = candidatePoslllSchema.parse(dto);
  const parseRrecordPOSlll = candidateSubPoslllSchema
    .omit({ recordId: true, id: true })
    .parse(recordPOSlll);

  const prismaRequest = await prisma.recordEntity.create({
    data: {
      ...recordWithoutObject,
      createdById,
      recordPOSlll: { create: parseRrecordPOSlll },
    },
    include: { recordPOSlll: true },
  });
  return prismaRequest;
}
