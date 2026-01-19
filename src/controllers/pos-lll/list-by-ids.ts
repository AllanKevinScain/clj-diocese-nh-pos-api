import type { Request, Response } from 'express';
import { isEmpty } from 'lodash';

import { HttpStatus } from '@/constants';
import { prisma } from '@/database';
import { unauthorizedException } from '@/exception';
import { IdsSchema } from '@/schemas';

async function listPoslllByIdsRepository(ids: string[]) {
  const prismaRequest = await prisma.poslll.findMany({
    select: {
      id: true,
      candidateName: true,
    },
    where: { id: { in: ids } },
  });

  return prismaRequest;
}

export async function listPoslllByIdsController(req: Request, res: Response) {
  try {
    const { ids } = IdsSchema.parse(req.body);

    const repositoryRequest = await listPoslllByIdsRepository(ids);

    if (isEmpty(repositoryRequest)) {
      res.status(HttpStatus.NO_CONTENT).send([]);
    } else {
      res.status(HttpStatus.OK).send(repositoryRequest);
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
