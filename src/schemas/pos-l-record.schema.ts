import { z } from 'zod';
import { RecordSchema } from './default-record.schema';

export const RecordPoslSchema = z.object({
  id: z.string().uuid().optional(),

  godfatherName: z.string(),
  godfatherPhone: z.string(),
  candidateSpirit: z.string(),
  candidateDisposition: z.string(),
  candidateParticipation: z.string(),

  // ultimos campos não obrigatórios
  // livesWith: z.array(z.string()),
  // parentsComment: z.string(),
  // motherSituation: z.string(),
  // fatherSituation: z.string(),
  // doctrineCommunication: z.string(),
  // attitudeCommunication: z.string(),
  // affinityWithGodfather: z.string(),
  // godfatherEmail: z.string(),
  // godfatherResponsibility: z.string(),

  // optional/null fields
  recordId: z.string().uuid().optional(),
  // otherWho: z.string().nullable(),
  // otherReligion: z.string().nullable(),
  // parentsReligion: z.string().nullable(),
});

export const PoslSchema = RecordSchema.extend({ recordPOSl: RecordPoslSchema });
export type PoslInfertypeSchema = z.infer<typeof PoslSchema>;
