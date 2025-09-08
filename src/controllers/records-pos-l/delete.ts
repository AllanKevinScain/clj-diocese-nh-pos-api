import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { IdSchema } from '../../schemas';
import { unauthorizedException } from '../../exception';

async function deleteRecordPOSlRepository(id: string) {
  const prismaRequest = await prisma.recordEntity.delete({
    where: { id },
  });

  return prismaRequest;
}

export async function deleteRecordPOSlController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);
    const repositoryRequest = await deleteRecordPOSlRepository(id);

    res.status(HttpStatus.OK).send({
      message: `Fixa de ${repositoryRequest.candidateName}/${repositoryRequest.id} removida com sucesso!`,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
