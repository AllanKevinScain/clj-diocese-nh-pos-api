import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { IdSchema } from '../../schemas';

async function deleteCoupleRepository(id: string) {
  const prismaRequest = await prisma.record.delete({
    where: { id },
    include: { recordCouple: true },
  });

  return prismaRequest;
}

export async function deleteCoupleController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);
    const repositoryRequest = await deleteCoupleRepository(id);

    res.status(HttpStatus.OK).send({
      message: `Fixa de ${repositoryRequest.candidateName} e ${repositoryRequest.recordCouple?.womanName} com id ${repositoryRequest.id} removida com sucesso!`,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
