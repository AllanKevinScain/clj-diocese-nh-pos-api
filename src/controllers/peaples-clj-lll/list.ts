import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { unauthorizedException } from '../../exception';

async function listCoursesRepository() {
  const prismaRequest = await prisma.course.findMany();

  return prismaRequest;
}

export async function listCoursesController(_: Request, res: Response) {
  try {
    const repositoryRequest = await listCoursesRepository();
    if (isEmpty(repositoryRequest)) {
      res.status(HttpStatus.NO_CONTENT).send([]);
    } else {
      res.status(HttpStatus.OK).send(repositoryRequest);
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
