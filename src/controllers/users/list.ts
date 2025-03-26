import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { unauthorizedException } from '../../exception';

async function listUsersRepository() {
  const prismaRequest = await prisma.user.findMany();

  return prismaRequest;
}

export async function listUsersController(_: Request, res: Response) {
  try {
    const repositoryRequest = await listUsersRepository();
    if (isEmpty(repositoryRequest)) throw new Error('Nenhum usuário encontrado');

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
