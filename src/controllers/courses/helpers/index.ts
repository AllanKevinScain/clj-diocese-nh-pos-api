import { prisma } from '../../../database';
import { CourseInfertypeSchema } from '../../../schemas';

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

export async function findCourseByNumberAndType(
  data: Partial<Pick<CourseInfertypeSchema, 'courseNumber' | 'typeOfCourse'>>,
  id?: string,
) {
  const existingCourse = await prisma.course.findFirst({
    where: {
      AND: [
        { courseNumber: data.courseNumber },
        { typeOfCourse: data.typeOfCourse },
        { NOT: { id } },
      ],
    },
  });

  function typeNameMessage() {
    if (data.typeOfCourse === 'POSll') return 'pós clj 2';
    return 'pós clj 1';
  }

  if (existingCourse) {
    throw new Error(
      `Já existe um curso do tipo "${typeNameMessage()}" com o número ${
        existingCourse.courseNumber
      }.`,
    );
  }
}
