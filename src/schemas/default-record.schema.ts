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

  // ultimos campos não obrigatórios
  // observationsCoordinator: z.string(),
  // observationsDed: z.string(),
  // spiritualLife: z.array(z.string()),
  // priest: z.string(),
  // parishAcronym: z.string(),
  // instagram: z.string(),

  // Campos não obrigatórios
  // disease: z.string().nullish(),
  // medication: z.string().nullish(),
  // allergy: z.string().nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
