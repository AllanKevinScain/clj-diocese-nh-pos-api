import { z } from 'zod';
import { RecordSchema } from './default-record.schema';

export const SubRecordWorkSchema = z.object({
  id: z.string().uuid().optional(),
  recordId: z.string().optional(),
});
export type SubRecordWorkInfertype = z.infer<typeof SubRecordWorkSchema>;

export const RecordWorkSchema = RecordSchema.extend({ recordWork: SubRecordWorkSchema });
export type RecordWorkInfertype = z.infer<typeof RecordWorkSchema>;
