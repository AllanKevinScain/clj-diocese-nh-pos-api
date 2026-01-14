import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { unauthorizedException } from '../../exception';
import { CourseInfertypeSchema, CourseSchema } from '../../schemas';
import { findCourseByDate } from './helpers';
import { isEmpty } from 'lodash';
import { RecordRoleType } from '@prisma/client';

async function createCourseRepository(data: CourseInfertypeSchema) {
  const lastCourse = await prisma.course.findFirst({
    where: { typeOfCourse: data.typeOfCourse },
    orderBy: { courseNumber: 'desc' },
  });

  const nextNumber = lastCourse ? Number(lastCourse.courseNumber) + 1 : 1;

  const prismaRequest = await prisma.course.create({
    data: {
      ...data,
      courseNumber: nextNumber.toString(),
    },
  });

  const { auxiliar, base, coordinator, coupleKitchenCoordinator, id: courseId } = prismaRequest;

  const userRoles = [
    { role: RecordRoleType.auxiliar, recordId: auxiliar },
    { role: RecordRoleType.base, recordId: base },
    { role: RecordRoleType.coordinator, recordId: coordinator },
    { role: RecordRoleType.coupleKitchenCoordinator, recordId: coupleKitchenCoordinator },
  ].filter((item) => !!item.recordId);

  await Promise.all(
    userRoles.map(async ({ recordId, role }) => {
      if (!recordId) return;
      await prisma.recordRole.create({
        data: {
          role,
          participantId: recordId,
          courseId,
        },
      });
    }),
  );

  return prismaRequest;
}

export async function createCourseController(req: Request, res: Response) {
  try {
    const parsedRequestBody = CourseSchema.parse(req.body);
    if (isEmpty(parsedRequestBody)) throw new Error('Dados inválidos!');

    // validações específicas
    await findCourseByDate({
      startDate: parsedRequestBody.startDate,
      endDate: parsedRequestBody.endDate,
    });

    const repositoryRequest = await createCourseRepository(parsedRequestBody);

    res
      .status(HttpStatus.OK)
      .send({ message: `Curso ${repositoryRequest.courseNumber} criado com sucesso!` });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: unauthorizedException(error) });
  }
}
