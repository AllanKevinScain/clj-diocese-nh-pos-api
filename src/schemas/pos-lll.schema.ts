import { z } from 'zod';

export const poslllSchema = z.object({
  id: z.string().uuid().optional(),
  candidateName: z.string(),
  parishChapel: z.string(),
  instagram: z.string().nullish(),
  courseOne: z.string(),
  courseTwo: z.string(),
  courseThree: z.string(),
  formations: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type PoslllInfertypeSchema = z.infer<typeof poslllSchema>;
