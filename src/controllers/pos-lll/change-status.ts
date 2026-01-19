import type { Request, Response } from 'express';
import { isEmpty } from 'lodash';

import { HttpStatus } from '@/constants';
import { prisma } from '@/database';
import { unauthorizedException } from '@/exception';
import { IdSchema } from '@/schemas';

import { getPoslllRepository } from './get';

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
      data: null,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
