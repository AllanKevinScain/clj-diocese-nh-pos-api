import { z } from 'zod';
import { RecordSchema } from './default-record.schema';

export const RecordPoslSchema = z.object({
  id: z.string().uuid().optional(),

  godfatherName: z.string(),
  godfatherPhone: z.string(),
  candidateSpirit: z.string(),
  candidateDisposition: z.string(),
  candidateParticipation: z.string(),
  recordId: z.string().uuid().optional(),
});

export const PoslSchema = RecordSchema.extend({ recordPOSl: RecordPoslSchema });
export type PoslInfertypeSchema = z.infer<typeof PoslSchema>;
