import { z } from 'zod';

export const RecordPOSlSchema = z.object({
  id: z.string().uuid().optional(),

  godfatherName: z.string(),
  godfatherPhone: z.string(),
  godfatherEmail: z.string(),
  affinityWithGodfather: z.string(),
  attitudeCommunication: z.string(),
  doctrineCommunication: z.string(),
  godfatherResponsibility: z.string(),
  candidateSpirit: z.string(),
  candidateDisposition: z.string(),
  candidateParticipation: z.string(),
  fatherSituation: z.string(),
  motherSituation: z.string(),
  parentsComment: z.string(),
  livesWith: z.array(z.string()),

  // optional/null fields
  recordId: z.string().uuid().optional(),
  otherWho: z.string().nullable(),
  otherReligion: z.string().nullable(),
  parentsReligion: z.string().nullable(),
});
