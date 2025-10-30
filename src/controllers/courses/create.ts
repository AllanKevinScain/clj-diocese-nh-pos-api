import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { unauthorizedException } from '../../exception';
import { CourseInfertypeSchema, CourseSchema } from '../../schemas';
import { findCourseByDate, findCourseByNumberAndType } from './helpers';
import { isEmpty } from 'lodash';

async function createCourseRepository(data: CourseInfertypeSchema) {
  const prismaRequest = await prisma.course.create({
    data,
  });

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
    await findCourseByNumberAndType({
      courseNumber: parsedRequestBody.courseNumber,
      typeOfCourse: parsedRequestBody.typeOfCourse,
    });

    const repositoryRequest = await createCourseRepository(parsedRequestBody);

    res
      .status(HttpStatus.OK)
      .send({ message: `Curso ${repositoryRequest.courseNumber} criado com sucesso!` });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: unauthorizedException(error) });
  }
}
