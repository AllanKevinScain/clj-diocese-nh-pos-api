import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { unauthorizedException } from '../../exception';

async function listPeapleCljThreeRepository() {
  const prismaRequest = await prisma.peapleCljThree.findMany();

  return prismaRequest;
}

export async function listPeapleCljThreeController(_: Request, res: Response) {
  try {
    const repositoryRequest = await listPeapleCljThreeRepository();
    if (isEmpty(repositoryRequest)) {
      res.status(HttpStatus.NO_CONTENT).send([]);
    } else {
      res.status(HttpStatus.OK).send(repositoryRequest);
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
