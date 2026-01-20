import type { Request, Response } from 'express';
import { isEmpty } from 'lodash';

import { HttpStatus } from '@/constants';
import { prisma } from '@/database';
import { unauthorizedException } from '@/exception';
import { getLoginInfo } from '@/helpers';

import { filterRecords } from './filter';

export async function filterRecordsController(req: Request, res: Response) {
  try {
    const userRequisitor = getLoginInfo(req);
    if (userRequisitor === null) throw Error('Requisição de usuário nao identificado!');

    const where = filterRecords(req);

    if (userRequisitor.loginType === 'manager') {
      Object.assign(where, { createdById: userRequisitor.id });
    }

    const isSearcher =
      isEmpty(where.courseNumber) &&
      isEmpty(where.recordNumber) &&
      isEmpty(where.candidateName) &&
      isEmpty(where.nickname) &&
      isEmpty(where.birthDate) &&
      isEmpty(where.candidatePhone) &&
      isEmpty(where.parishChapel) &&
      isEmpty(where.typeOfRecord) &&
      isEmpty(where.OR);

    const records = await prisma.recordEntity.findMany({
      where: isSearcher ? undefined : where,
      include: {
        recordCouple: true,
        recordPOSl: true,
        recordPOSll: true,
        recordWork: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    res.status(HttpStatus.OK).send(records);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
