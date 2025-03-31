import { z } from 'zod';

export const CourseSchema = z.object({
  id: z.string().uuid().optional(),
  courseNumber: z.number(),
  startDate: z.string(),
  endDate: z.string(),
});
