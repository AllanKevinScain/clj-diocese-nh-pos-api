import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { IdSchema } from '../../schemas';

async function getRecordByIdRepository(id: string) {
  const prismaRequest = await prisma.recordEntity.findUnique({
    where: { id },
    include: { recordPOSl: true, recordCouple: true, recordPOSll: true, recordWork: true },
  });

  return prismaRequest;
}

export async function getRecordByIdController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);
    const repositoryRequest = await getRecordByIdRepository(id);

    if (repositoryRequest !== null) {
      res.status(HttpStatus.OK).send(repositoryRequest);
    } else {
      res.status(HttpStatus.NO_CONTENT).send({ message: 'Ficha não encontrada!' });
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
