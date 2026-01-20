import type { Request, Response } from 'express';
import { isEmpty } from 'lodash';

import { HttpStatus } from '@/constants';
import { prisma } from '@/database';
import { unauthorizedException } from '@/exception';
import { getInfoByRequisition } from '@/middleware';
import { IdSchema } from '@/schemas';

import { getUserRepository } from './get';

interface PropsChangeActivationUserRepositoryInterface {
  id: string;
  active: boolean;
}

async function changeActivationUserRepository(props: PropsChangeActivationUserRepositoryInterface) {
  const { id, active } = props;
  const prismaRequest = await prisma.user.update({
    where: { id },
    data: { active },
  });

  return prismaRequest;
}

export async function changeActivationUserController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);

    const currentUserById = await getUserRepository(id);
    if (isEmpty(currentUserById)) throw new Error('Usuário não encontrado');

    const requesterInfo = getInfoByRequisition(req);
    if (requesterInfo?.id === id) throw new Error('Você não pode desativar seu próprio usuário');

    const repositoryRequest = await changeActivationUserRepository({
      id,
      active: !currentUserById.active,
    });

    res.status(HttpStatus.OK).send({
      message: `Usuário ${repositoryRequest.email} ${
        repositoryRequest.active ? 'ativado' : 'desativado'
      } com sucesso`,
      data: null,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
