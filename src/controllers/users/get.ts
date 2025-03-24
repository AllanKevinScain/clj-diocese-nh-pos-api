import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';

export const IdSchema = z.object({
  id: z.string().uuid(),
});

async function getUserRepository(id: string) {
  const prismaRequest = await prisma.user.findUnique({
    where: { id },
  });

  return prismaRequest;
}

export async function getUserController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);
    const repositoryRequest = await getUserRepository(id);

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
