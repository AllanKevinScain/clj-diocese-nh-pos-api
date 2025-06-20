import { z } from 'zod';

export const RecordCoupleSchema = z.object({
  id: z.string().uuid().optional(),
  workPreference: z.string(),
  externalCouple: z.boolean(),
  cookCouple: z.boolean(),
  womanName: z.string(),
  womanNickname: z.string(),
  womanPhone: z.string(),
  womanInstagram: z.string(),
  womanBirthDate: z.string(),
  coursesDone: z.string(),
  religiousWeddingDate: z.string(),
  participatedInRetreat: z.boolean(),
  motivationToParticipate: z.string(),
  parishIndication: z.string(),
  willingToOtherFunction: z.boolean(),
  recordId: z.string().optional(),
});
