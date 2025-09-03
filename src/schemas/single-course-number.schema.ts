import { z } from 'zod';

export const CourseNumberSchema = z.object({
  courseNumber: z.string(),
});
