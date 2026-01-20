import type { Request, Response } from 'express';
import { isEmpty } from 'lodash';

import { HttpStatus } from '@/constants';
import { prisma } from '@/database';
import { unauthorizedException } from '@/exception';
import { IdSchema } from '@/schemas';

export async function getPoslllRepository(id: string) {
  const prismaRequest = await prisma.poslll.findUnique({
    where: { id },
  });

  return prismaRequest;
}

export async function getPoslllController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);

    const repositoryRequest = await getPoslllRepository(id);
    if (isEmpty(repositoryRequest)) throw new Error('Informação não encontrada!');

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
