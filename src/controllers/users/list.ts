import type { Request, Response } from 'express';
import { isEmpty } from 'lodash';

import { HttpStatus } from '@/constants';
import { prisma } from '@/database';
import { unauthorizedException } from '@/exception';
import { getInfoByRequisition } from '@/middleware';

async function listUsersRepository(showInactiveLines: boolean) {
  const prismaRequest = await prisma.user.findMany({
    where: {
      active: showInactiveLines ? undefined : true,
    },
    orderBy: [{ active: 'desc' }, { name: 'asc' }],
  });

  return prismaRequest;
}

export async function listUsersController(req: Request, res: Response) {
  try {
    const requesterInfo = getInfoByRequisition(req);

    const repositoryRequest = await listUsersRepository(requesterInfo?.loginType === 'admin');
    if (isEmpty(repositoryRequest)) {
      res.status(HttpStatus.NO_CONTENT).send([]);
    } else {
      res.status(HttpStatus.OK).send(repositoryRequest);
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
