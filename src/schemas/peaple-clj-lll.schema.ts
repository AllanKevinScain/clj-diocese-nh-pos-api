import { z } from 'zod';

export const PeapleCljThreeSchema = z.object({
  id: z.string().uuid().optional(),
  candidatePhone: z.string().nullish(),
  candidateName: z.string(),
  instagram: z.string().nullish(),
  courseOne: z.number(),
  courseTwo: z.number(),
  courseThree: z.number(),
  formations: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
