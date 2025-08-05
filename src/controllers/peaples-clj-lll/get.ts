import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { unauthorizedException } from '../../exception';
import { IdSchema } from '../../schemas';

export async function getCourseRepository(id: string) {
  const prismaRequest = await prisma.course.findUnique({
    where: { id },
  });

  return prismaRequest;
}

export async function getCourseController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);

    const repositoryRequest = await getCourseRepository(id);
    if (isEmpty(repositoryRequest)) throw new Error('Curso não encontrado!');

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
