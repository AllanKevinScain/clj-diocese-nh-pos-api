import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { IdSchema } from '../../schemas';
import { getPeapleCljThreeRepository } from './get';
import { isEmpty } from 'lodash';
import { unauthorizedException } from '../../exception';

async function deletePeapleCljThreeRepository(id: string) {
  const prismaRequest = await prisma.peapleCljThree.delete({
    where: { id },
  });

  return prismaRequest;
}

export async function deletePeapleCljThreeController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);

    const currentPeapleById = await getPeapleCljThreeRepository(id);
    if (isEmpty(currentPeapleById)) throw new Error('Informação não encontrada.');

    const repositoryRequest = await deletePeapleCljThreeRepository(id);

    res.status(HttpStatus.OK).send({
      message: `${repositoryRequest.candidateName} removido da lista de jovens.`,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
