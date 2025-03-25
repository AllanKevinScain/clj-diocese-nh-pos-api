import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { IdSchema } from '../../schemas';
import { isEmpty } from 'lodash';
import { unauthorizedException } from '../../exception';

export async function getUserRepository(id: string) {
  const prismaRequest = await prisma.user.findUnique({
    where: { id },
  });

  return prismaRequest;
}

export async function getUserController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);

    const repositoryRequest = await getUserRepository(id);
    if (isEmpty(repositoryRequest)) throw new Error('Usuário não encontrado');

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
