import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { unauthorizedException } from '../../exception';
import { CourseNumberSchema } from '../../schemas';

async function listRecordsByCourseNumberRepository(courseNumber: number) {
  const prismaRequest = await prisma.record.findMany({
    where: { courseNumber },
  });

  return prismaRequest;
}

export async function listRecordsByCourseNumberController(req: Request, res: Response) {
  try {
    const { courseNumber } = CourseNumberSchema.parse(req.params);

    const repositoryRequest = await listRecordsByCourseNumberRepository(courseNumber);
    if (isEmpty(repositoryRequest)) throw new Error('Nenhuma fixa encontrada para este curso!');

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
