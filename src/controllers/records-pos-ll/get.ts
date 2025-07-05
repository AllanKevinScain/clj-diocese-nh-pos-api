import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { IdSchema } from '../../schemas';

async function getRecordPOSllRepository(id: string) {
  const prismaRequest = await prisma.record.findUnique({
    where: { id },
    include: {
      recordPOSll: true,
    },
  });

  return prismaRequest;
}

export async function getRecordPOSllController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);
    const repositoryRequest = await getRecordPOSllRepository(id);

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
