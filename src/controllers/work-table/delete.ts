import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { IdSchema } from '../../schemas';
import { unauthorizedException } from '../../exception';

async function deleteWorkTableRepository(id: string) {
  const prismaRequest = await prisma.workTable.delete({
    where: { id },
  });

  return prismaRequest;
}

export async function deleteWorkTableController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);
    const repositoryRequest = await deleteWorkTableRepository(id);

    res.status(HttpStatus.OK).send({
      message: `Mesa de fundo do curso ${repositoryRequest.courseNumber} removida com sucesso!`,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
