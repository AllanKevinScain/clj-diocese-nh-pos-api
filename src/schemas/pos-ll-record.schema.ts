import { z } from 'zod';
import { RecordSchema } from './default-record.schema';

export const SubRecordPosllSchema = z.object({
  id: z.string().uuid().optional(),
  recordId: z.string().optional(),
});
export type SubRecordPosllInfertype = z.infer<typeof SubRecordPosllSchema>;

export const RecordPosllSchema = RecordSchema.extend({ recordPOSll: SubRecordPosllSchema });
export type RecordPosllInfertype = z.infer<typeof RecordPosllSchema>;
