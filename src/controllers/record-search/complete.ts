import { Request, Response } from 'express';
import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { unauthorizedException } from '../../exception';
import { filterRecords } from './filter';

export async function filterRecordsController(req: Request, res: Response) {
  try {
    const where = filterRecords(req);
    const records = await prisma.record.findMany({ where });

    res.status(HttpStatus.OK).send(records);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
