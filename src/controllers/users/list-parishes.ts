import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { unauthorizedException } from '../../exception';

async function listRegisteredParishesRepository() {
  const prismaRequest = await prisma.user.findMany({
    select: {
      coName: true,
      id: true,
    },
    where: {
      NOT: {
        OR: [{ loginType: 'admin' }, { active: false }],
      },
    },
    distinct: ['coName'],
  });

  return prismaRequest;
}

export async function listRegisteredParishesController(_: Request, res: Response) {
  try {
    const repositoryRequest = await listRegisteredParishesRepository();
    if (isEmpty(repositoryRequest)) {
      res.status(HttpStatus.NO_CONTENT).send([]);
    } else {
      res.status(HttpStatus.OK).send(repositoryRequest);
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
