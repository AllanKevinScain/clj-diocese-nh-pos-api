import { z } from 'zod';

export const CourseSchema = z.object({
  id: z.string().uuid().optional(),
  courseNumber: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  typeOfCourse: z.enum(['POSl', 'POSll', 'WORK', 'COUPLE_WORK']),

  base: z.string().uuid(),
  auxiliar: z.string().uuid(),
  coordinator: z.string().uuid(),
  liturgy: z.string().uuid(),
  secretary: z.string().uuid(),
  kitchenSpiritual: z.string().uuid(),
  coupleKitchenCoordinator: z.string().uuid(),
});
