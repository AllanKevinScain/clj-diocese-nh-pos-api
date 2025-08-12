import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { IdSchema } from '../../schemas';
import { getPoslllRepository } from './get';
import { isEmpty } from 'lodash';
import { unauthorizedException } from '../../exception';

async function deletePoslllRepository(id: string) {
  const prismaRequest = await prisma.poslll.delete({
    where: { id },
  });

  return prismaRequest;
}

export async function deletePoslllController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);

    const currentPoslllById = await getPoslllRepository(id);
    if (isEmpty(currentPoslllById)) throw new Error('Informação não encontrada.');

    const repositoryRequest = await deletePoslllRepository(id);

    res.status(HttpStatus.OK).send({
      message: `${repositoryRequest.candidateName} removido da lista de jovens.`,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
