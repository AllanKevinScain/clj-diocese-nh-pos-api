import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { IdSchema } from './get';

async function deleteUserRepository(id: string) {
  const prismaRequest = await prisma.user.delete({
    where: { id },
  });

  return prismaRequest;
}

export async function deleteUserController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);
    const repositoryRequest = await deleteUserRepository(id);

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
