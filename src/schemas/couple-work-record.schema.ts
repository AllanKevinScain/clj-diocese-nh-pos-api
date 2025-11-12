import { z } from 'zod';
import { RecordSchema } from './default-record.schema';

export const SubRecordCoupleSchema = z.object({
  id: z.string().uuid().optional(),
  womanName: z.string(),
  womanNickname: z.string(),
  womanPhone: z.string(),
  womanBirthDate: z.string(),

  // ultimos campos não obrigatórios
  // parishIndication: z.array(z.string()),
  // motivationToParticipate: z.string(),
  // participatedInRetreat: z.boolean(),
  // religiousWeddingDate: z.string(),
  // familyLife: z.string(),
  // womanSpiritualLife: z.array(z.string()),
  // participatedOtherGroups: z.string(),
  // currentGroupFunction: z.string(),
  // coursesDone: z.string(),
  // womanInstagram: z.string(),
  // workPreference: z.string(),

  // Campos nao obrigatórios
  // externalCouple: z.boolean().nullish(),
  // cookCouple: z.boolean().nullish(),
  // coursesOneDone: z.string().nullish(),
  // coursesTwoDone: z.string().nullish(),
  // coursesThreeDone: z.string().nullish(),
  recordId: z.string().optional(),
});
export type SubRecordCoupleInfertype = z.infer<typeof SubRecordCoupleSchema>;

export const RecordCoupleSchema = RecordSchema.extend({ recordCouple: SubRecordCoupleSchema });
export type RecordCoupleInfertype = z.infer<typeof RecordCoupleSchema>;
