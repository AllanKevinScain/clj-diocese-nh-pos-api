import { z } from 'zod';

export const RecordPOSlSchema = z.object({
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
  livesWith: z.string(),
  otherWho: z.string(),
  parentsReligion: z.string(),
  parentsComment: z.string(),
  recordId: z.string().uuid().optional(),
});
