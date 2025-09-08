import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { IdSchema } from '../../schemas';

async function getCoupleRepository(id: string) {
  const prismaRequest = await prisma.recordEntity.findUnique({
    where: { id },
    include: {
      recordCouple: true,
    },
  });

  return prismaRequest;
}

export async function getCoupleController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);
    const repositoryRequest = await getCoupleRepository(id);

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
