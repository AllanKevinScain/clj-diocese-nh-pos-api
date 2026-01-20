import type { Request, Response } from 'express';
import { isEmpty } from 'lodash';

import { HttpStatus } from '@/constants';
import { prisma } from '@/database';
import { unauthorizedException } from '@/exception';
import { CourseNumberSchema } from '@/schemas';
import { getCourseById } from '@/services-helpers';

interface DeleteCourseRepositoryInterface {
  courseNumber: string;
  id: string;
}

async function deleteCourseRepository(props: DeleteCourseRepositoryInterface) {
  const { id, courseNumber } = props;
  const prismaRequest = await prisma.course.delete({
    where: { id, courseNumber },
  });

  return prismaRequest;
}

export async function deleteCourseController(req: Request, res: Response) {
  try {
    const { courseNumber } = CourseNumberSchema.parse(req.params);

    const currentCourseBycourseNumber = await getCourseById(courseNumber);
    if (isEmpty(currentCourseBycourseNumber)) throw new Error('Curso não encontrado.');

    const repositoryRequest = await deleteCourseRepository({
      id: currentCourseBycourseNumber.id,
      courseNumber: currentCourseBycourseNumber.courseNumber,
    });

    res.status(HttpStatus.OK).send({
      message: `Curso ${repositoryRequest.courseNumber} removido com sucesso.s`,
      data: null,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
