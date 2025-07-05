import { z } from 'zod';

export const RecordWorkSchema = z.object({
  id: z.string().uuid().optional(),
  courseOneDone: z.string(),
  courseTwoDone: z.string(),
  workedInWhichCourses: z.string(),
  graceStateAwareness: z.string(),
  notFalsifyData: z.boolean(),
  showLifeTestimony: z.string(),
  currentGroupFunction: z.string(),
  parishActivities: z.string(),
  reasonToWork: z.string(),
  workPreference: z.string(),
  willingToOtherFunction: z.boolean(),
  parishIndication: z.array(z.string()),

  // Campos nao obrigatórios
  courseThreeDone: z.string().nullable(),
  instrument: z.string().nullable(),
  doingConfirmation: z.boolean().nullable(),
  notConfirmationBecause: z.string().nullable(),
  recordId: z.string().optional(),
});
