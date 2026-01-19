import { z } from 'zod';

import { RecordSchema } from './default-record.schema';

export const SubRecordWorkSchema = z.object({
  id: z.string().uuid().optional(),
  recordId: z.string().optional(),
});

export const RecordWorkSchema = RecordSchema.extend({ recordWork: SubRecordWorkSchema });
