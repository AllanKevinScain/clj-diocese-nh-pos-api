import { z } from 'zod';

export const RecordWorkSchema = z.object({
  id: z.string().uuid().optional(),
  coursesDone: z.string(),
  workedInWhichCourses: z.string(),
  graceStateAwareness: z.string(),
  notFalsifyData: z.boolean(),
  showLifeTestimony: z.string(),
  currentGroupFunction: z.string(),
  parishActivities: z.string(),
  instrument: z.string(),
  reasonToWork: z.string(),
  workPreference: z.string(),
  willingToOtherFunction: z.boolean(),
  parishIndication: z.string(),
  recordId: z.string().optional(),
});
