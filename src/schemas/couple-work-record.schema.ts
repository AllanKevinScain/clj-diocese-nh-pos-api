import { z } from 'zod';
import { RecordSchema } from './default-record.schema';

export const SubRecordCoupleSchema = z.object({
  id: z.string().uuid().optional(),
  womanName: z.string(),
  womanNickname: z.string(),
  womanPhone: z.string(),
  womanBirthDate: z.string(),
  recordId: z.string().optional(),
});
export type SubRecordCoupleInfertype = z.infer<typeof SubRecordCoupleSchema>;

export const RecordCoupleSchema = RecordSchema.extend({ recordCouple: SubRecordCoupleSchema });
export type RecordCoupleInfertype = z.infer<typeof RecordCoupleSchema>;
