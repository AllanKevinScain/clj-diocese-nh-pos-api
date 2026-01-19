import type { Request, Response } from 'express';
import { isEmpty } from 'lodash';

import { HttpStatus } from '@/constants';
import { prisma } from '@/database';
import { unauthorizedException } from '@/exception';
import { getInfoByRequisition } from '@/middleware';

async function listPoslllRepository(showInactiveLines: boolean) {
  const prismaRequest = await prisma.poslll.findMany({
    where: {
      active: showInactiveLines ? undefined : true,
    },
    orderBy: [{ active: 'desc' }, { candidateName: 'asc' }],
  });

  return prismaRequest;
}

export async function listPoslllController(req: Request, res: Response) {
  try {
    const requesterInfo = getInfoByRequisition(req);

    const repositoryRequest = await listPoslllRepository(requesterInfo?.loginType === 'admin');
    if (isEmpty(repositoryRequest)) {
      res.status(HttpStatus.NO_CONTENT).send([]);
    } else {
      res.status(HttpStatus.OK).send(repositoryRequest);
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
