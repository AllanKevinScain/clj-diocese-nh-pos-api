import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { unauthorizedException } from '../../exception';
import { CourseInfertypeSchema, CourseSchema } from '../../schemas';
import { findCourseByDate } from './helpers';
import { isEmpty } from 'lodash';
import { createRecordRoleByCreateCourseResponse } from './record-role';

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

  await createRecordRoleByCreateCourseResponse(prismaRequest);

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
