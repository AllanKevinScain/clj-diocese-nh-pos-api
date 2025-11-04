import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { IdSchema } from '../../schemas';
import { getPoslllRepository } from './get';
import { isEmpty } from 'lodash';
import { unauthorizedException } from '../../exception';

interface PropsChangeActivationPoslllRepositoryInterface {
  id: string;
  active: boolean;
}

async function changeActivationPoslllRepository(
  props: PropsChangeActivationPoslllRepositoryInterface,
) {
  const { id, active } = props;
  const prismaRequest = await prisma.poslll.update({
    where: { id },
    data: { active },
  });

  return prismaRequest;
}

export async function changeActivationPoslllController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);

    const currentPoslllById = await getPoslllRepository(id);
    if (isEmpty(currentPoslllById)) throw new Error('Informação não encontrada.');

    const repositoryRequest = await changeActivationPoslllRepository({
      id,
      active: !currentPoslllById.active,
    });

    res.status(HttpStatus.OK).send({
      message: `${repositoryRequest.candidateName} ${
        repositoryRequest.active ? 'ativado' : 'desativado'
      } da lista de jovens.`,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
