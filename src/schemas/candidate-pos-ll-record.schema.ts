import { z } from 'zod';

import { RecordSchema } from './default-record.schema';

export const candidateSubPosllSchema = z.object({
  id: z.string().uuid().optional(),
  recordId: z.string().optional(),
});

export const candidatePosllSchema = RecordSchema.extend({
  recordPOSll: candidateSubPosllSchema,
});
