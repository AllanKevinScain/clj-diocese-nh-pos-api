import { z } from 'zod';

export const CourseIdSchema = z.object({
  courseId: z.string(),
});
