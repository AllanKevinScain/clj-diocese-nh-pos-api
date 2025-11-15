import { z } from 'zod';

export const CourseSchema = z.object({
  id: z.string().uuid().optional(),
  startDate: z.string(),
  endDate: z.string(),
  typeOfCourse: z.enum(['POSl', 'POSll', 'POSll']),
  base: z.string().uuid(),
  auxiliar: z.string().uuid(),
  coordinator: z.string().uuid(),
  kitchenSpiritual: z.string().uuid(),
  liturgy: z.string().uuid(),
  secretary: z.string().uuid(),
  coupleKitchenCoordinator: z.string().uuid(),
});

export type CourseInfertypeSchema = z.infer<typeof CourseSchema>;
