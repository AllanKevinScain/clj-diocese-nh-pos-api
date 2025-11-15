import { z } from 'zod';
import { RecordSchema } from './default-record.schema';

export const SubRecordWorkSchema = z.object({
  id: z.string().uuid().optional(),

  // ultimos campos não obrigatórios
  // parishIndication: z.array(z.string()),
  // willingToOtherFunction: z.boolean(),
  // workPreference: z.string(),
  // reasonToWork: z.string(),
  // parishActivities: z.string(),
  // currentGroupFunction: z.string(),
  // showLifeTestimony: z.string(),
  // notFalsifyData: z.boolean(),
  // graceStateAwareness: z.string(),
  // workedInWhichCourses: z.string(),
  // courseTwoDone: z.string(),
  // courseOneDone: z.string(),

  // Campos nao obrigatórios
  // courseThreeDone: z.string().nullable(),
  // instrument: z.string().nullable(),
  // doingConfirmation: z.boolean().nullable(),
  // notConfirmationBecause: z.string().nullable(),
  recordId: z.string().optional(),
});
export type SubRecordWorkInfertype = z.infer<typeof SubRecordWorkSchema>;

export const RecordWorkSchema = RecordSchema.extend({ recordWork: SubRecordWorkSchema });
export type RecordWorkInfertype = z.infer<typeof RecordWorkSchema>;
