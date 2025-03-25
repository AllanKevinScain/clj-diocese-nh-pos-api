import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { IdSchema } from '../../schemas';
import { getUserRepository } from './get';
import { isEmpty } from 'lodash';
import { unauthorizedException } from '../../exception';

async function deleteUserRepository(id: string) {
  const prismaRequest = await prisma.user.delete({
    where: { id },
  });

  return prismaRequest;
}

export async function deleteUserController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);

    const currentUserById = await getUserRepository(id);
    if (isEmpty(currentUserById)) throw new Error('Usuário não encontrado');

    const repositoryRequest = await deleteUserRepository(id);

    res
      .status(HttpStatus.OK)
      .send({
        message: `Usuário ${repositoryRequest.name}/${repositoryRequest.email}/${repositoryRequest.city} deletado com sucesso`,
      });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
