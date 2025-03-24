import { z } from 'zod';

export const RecordPOSllSchema = z.object({
  id: z.string().uuid().optional(),
  courseOneDone: z.string(),
  motivationToParticipate: z.string(),
  reasonForCLJII: z.string(),
  approachToChrist: z.string(),
  acceptsChurchDoctrine: z.string(),
  commitmentToCLJ: z.string(),
  perseveranceInCommunity: z.string(),
  hideImportantInfo: z.boolean(),
  currentGroupFunction: z.string(),
  parishChapelActivities: z.string(),
  doingConfirmation: z.boolean(),
  groupObservations: z.string(),
  recordId: z.string().optional(),
});
