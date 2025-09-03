import { Request, Response } from 'express';
import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { unauthorizedException } from '../../exception';
import { filterRecords } from './filter';
import { isEmpty } from 'lodash';

export async function filterRecordsController(req: Request, res: Response) {
  try {
    const where = filterRecords(req);
    let records = {};

    const isSearcher =
      isEmpty(where.courseNumber) &&
      isEmpty(where.recordNumber) &&
      isEmpty(where.parishAcronym) &&
      isEmpty(where.candidateName) &&
      isEmpty(where.nickname) &&
      isEmpty(where.birthDate) &&
      isEmpty(where.candidatePhone) &&
      isEmpty(where.instagram) &&
      isEmpty(where.priest) &&
      isEmpty(where.parishChapel) &&
      isEmpty(where.typeOfRecord) &&
      isEmpty(where.OR);

    if (isSearcher) {
      records = await prisma.record.findMany({
        include: { recordCouple: true, recordPOSl: true, recordPOSll: true, recordWork: true },
      });
    } else {
      records = await prisma.record.findMany({
        where,
        include: { recordCouple: true, recordPOSl: true, recordPOSll: true, recordWork: true },
      });
    }

    res.status(HttpStatus.OK).send(records);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
