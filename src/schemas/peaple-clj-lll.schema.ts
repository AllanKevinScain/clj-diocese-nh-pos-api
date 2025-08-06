import { z } from 'zod';

export const PeapleCljThreeSchema = z.object({
  id: z.string().uuid().optional(),
  candidatePhone: z.string().nullish(),
  candidateName: z.string(),
  instagram: z.string().nullish(),
  courseOne: z.string(),
  courseTwo: z.string(),
  courseThree: z.string(),
  formations: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
