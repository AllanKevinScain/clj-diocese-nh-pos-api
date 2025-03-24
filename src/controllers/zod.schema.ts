import { z } from 'zod';

export const RecordSchema = z.object({
  id: z.string().uuid().optional(),
  typeOfRecord: z.string(),
  courseNumber: z.number().int(),
  parishAcronym: z.string(),
  recordNumber: z.number().int(),
  photo: z.string(),
  candidateName: z.string(),
  document: z.string(),
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
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type RecordInfertypeSchema = z.infer<typeof RecordSchema>;
