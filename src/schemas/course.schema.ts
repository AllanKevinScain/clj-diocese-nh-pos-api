import { z } from 'zod';

export const CourseSchema = z.object({
  id: z.string().uuid().optional(),
  courseNumber: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  typeOfCourse: z.enum(['POSl', 'POSll', 'WORK', 'COUPLE_WORK']),
});

export type CourseInfertypeSchema = z.infer<typeof CourseSchema>;
