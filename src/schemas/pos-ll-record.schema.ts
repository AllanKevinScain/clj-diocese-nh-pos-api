import { z } from 'zod';
import { RecordSchema } from './default-record.schema';

export const SubRecordPosllSchema = z.object({
  id: z.string().uuid().optional(),

  // ultimos campos não obrigatórios
  // courseOneDone: z.string(),
  // motivationToParticipate: z.string(),
  // reasonForCLJII: z.string(),
  // approachToChrist: z.string(),
  // acceptsChurchDoctrine: z.string(),
  // commitmentToCLJ: z.string(),
  // perseveranceInCommunity: z.string(),
  // hideImportantInfo: z.boolean(),
  // currentGroupFunction: z.string(),
  // parishChapelActivities: z.string(),

  // Campos nao obrigatórios
  // doingConfirmation: z.boolean().nullable(),
  // notConfirmationBecause: z.string().nullable(),
  recordId: z.string().optional(),
});
export type SubRecordPosllInfertype = z.infer<typeof SubRecordPosllSchema>;

export const RecordPosllSchema = RecordSchema.extend({ recordPOSll: SubRecordPosllSchema });
export type RecordPosllInfertype = z.infer<typeof RecordPosllSchema>;
