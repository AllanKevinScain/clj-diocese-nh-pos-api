import { prisma } from '@/database';
import type { CourseInfertypeSchema } from '@/schemas';

export async function findCourseByDate(
  data: Partial<Pick<CourseInfertypeSchema, 'startDate' | 'endDate'>>,
  id?: string,
) {
  const overlappingCourse = await prisma.course.findFirst({
    where: {
      AND: [
        { OR: [{ startDate: { lte: data.endDate }, endDate: { gte: data.startDate } }] },
        { NOT: { id } },
      ],
    },
  });

  if (overlappingCourse) {
    throw new Error(
      `Já existe um curso em andamento nesse período (${overlappingCourse.courseNumber})`,
    );
  }
}
