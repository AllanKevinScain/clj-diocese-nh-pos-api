import { prisma } from '../../database';
import { HttpStatus, RecordTypes } from '../../constants';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { unauthorizedException } from '../../exception';
import { TypeOfRecordSchema } from '../../schemas';

async function listRecordRepository(typeOfRecord: RecordTypes) {
  const prismaRequest = await prisma.record.findMany({
    where: { typeOfRecord },
  });

  return prismaRequest;
}

export async function listRecordController(req: Request, res: Response) {
  try {
    const { typeOfRecord } = TypeOfRecordSchema.parse(req.params);

    const repositoryRequest = await listRecordRepository(typeOfRecord);

    if (isEmpty(repositoryRequest)) throw new Error('Nenhuma fixa encontrada');

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
