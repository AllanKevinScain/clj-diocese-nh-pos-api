import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { IdSchema } from '../../schemas';
import { getPeapleCljThreeRepository } from './get';
import { isEmpty } from 'lodash';
import { unauthorizedException } from '../../exception';

async function deleteCourseRepository(id: string) {
  const prismaRequest = await prisma.course.delete({
    where: { id },
  });

  return prismaRequest;
}

export async function deleteCourseController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);

    const currentCourseById = await getPeapleCljThreeRepository(id);
    if (isEmpty(currentCourseById)) throw new Error('Course not found');

    const repositoryRequest = await deleteCourseRepository(id);

    res.status(HttpStatus.OK).send({
      message: `Curso ${repositoryRequest.courseNumber} removido com sucesso`,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
