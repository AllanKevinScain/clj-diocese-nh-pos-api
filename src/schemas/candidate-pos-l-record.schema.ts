import { z } from 'zod';
import { RecordSchema } from './default-record.schema';

export const candidateSubRecordPoslSchema = z.object({
  id: z.string().uuid().optional(),

  godfatherName: z.string(),
  godfatherPhone: z.string(),
  candidateSpirit: z.string(),
  candidateDisposition: z.string(),
  candidateParticipation: z.string(),
  recordId: z.string().uuid().optional(),
});

export const candidatePoslSchema = RecordSchema.extend({
  recordPOSl: candidateSubRecordPoslSchema,
});
