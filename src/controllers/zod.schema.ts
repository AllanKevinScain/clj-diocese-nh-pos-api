import { z } from 'zod';

export const RecordSchema = z.object({
  id: z.string().uuid().optional(),
  typeOfRecord: z.string(),
  courseNumber: z.number().int(),
  parishAcronym: z.string(),
  recordNumber: z.number().int(),
  candidateName: z.string(),
  nickname: z.string(),
  birthDate: z.string(),
  candidatePhone: z.string(),
  instagram: z.string(),
  priest: z.string(),
  parishChapel: z.string(),
  spiritualLife: z.string(),
  observationsDed: z.string(),
  disease: z.string(),
  medication: z.string(),
  allergy: z.string(),
  dataConsent: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type RecordInfertypeSchema = z.infer<typeof RecordSchema>;
