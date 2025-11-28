import { z } from 'zod';
import { RecordSchema } from './default-record.schema';

export const candidateSubPoslllSchema = z.object({
  id: z.string().uuid().optional(),
  recordId: z.string().optional(),
});

export const candidatePoslllSchema = RecordSchema.extend({
  recordPOSlll: candidateSubPoslllSchema,
});
