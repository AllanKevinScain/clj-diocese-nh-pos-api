import { z } from 'zod';

export const RecordSchema = z.object({
  id: z.string().uuid().optional(),
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
  spiritualLife: z.array(z.string()),
  observationsDed: z.string(),
  disease: z.string().nullish(),
  medication: z.string().nullish(),
  allergy: z.string(),
  dataConsent: z.boolean(),
  observationsCoordinator: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
