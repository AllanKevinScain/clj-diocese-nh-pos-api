import { prisma } from '../../../database';
import { RecordPosllSchema, SubRecordPosllSchema } from '../../../schemas';
import { RecordWorkInterface } from '../../record-work';

export async function createRecordPosllRepository(props: RecordWorkInterface) {
  const { createdById, dto } = props;
  const { recordPOSll, ...recordWithoutObject } = RecordPosllSchema.parse(dto);
  const parseRrecordPOSll = SubRecordPosllSchema.omit({ recordId: true, id: true }).parse(
    recordPOSll,
  );

  const prismaRequest = await prisma.recordEntity.create({
    data: {
      ...recordWithoutObject,
      createdById,
      recordPOSll: { create: parseRrecordPOSll },
    },
    include: { recordPOSll: true },
  });
  return prismaRequest;
}
