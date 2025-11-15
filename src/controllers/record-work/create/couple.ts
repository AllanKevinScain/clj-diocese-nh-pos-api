import { prisma } from '../../../database';
import { RecordCoupleSchema, SubRecordCoupleSchema } from '../../../schemas';
import { RecordWorkInterface } from '../record-work.type';

export async function createCoupleRepository(props: RecordWorkInterface) {
  const { createdById, dto } = props;
  const { recordCouple, ...recordWithoutObject } = RecordCoupleSchema.parse(dto);
  const recordCoupleCreate = SubRecordCoupleSchema.omit({ recordId: true, id: true }).parse(
    recordCouple,
  );

  const prismaRequest = await prisma.recordEntity.create({
    data: {
      ...recordWithoutObject,
      createdById,
      isCoupleWork: true,
      recordCouple: { create: recordCoupleCreate },
    },
    include: { recordCouple: true },
  });
  return prismaRequest;
}
