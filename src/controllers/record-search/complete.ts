import { Request, Response } from 'express';
import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { unauthorizedException } from '../../exception';
import { filterRecords } from './filter';
import { isEmpty } from 'lodash';
import { getLoginInfo } from '../../helpers';

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
      // isEmpty(where.parishAcronym) &&
      isEmpty(where.candidateName) &&
      isEmpty(where.nickname) &&
      isEmpty(where.birthDate) &&
      isEmpty(where.candidatePhone) &&
      // isEmpty(where.instagram) &&
      // isEmpty(where.priest) &&
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
