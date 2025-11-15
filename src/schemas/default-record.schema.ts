import { z } from 'zod';

export const RecordSchema = z.object({
  id: z.string().uuid().optional(),
  typeOfRecord: z.enum(['POSl', 'POSll', 'POSlll']).nullish(),
  courseNumber: z.string(),
  recordNumber: z.string(),
  candidateName: z.string(),
  nickname: z.string(),
  birthDate: z.string(),
  candidatePhone: z.string(),
  parishChapel: z.string(),
  dataConsent: z.boolean(),
  isWork: z.boolean(),
  isCoupleWork: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
