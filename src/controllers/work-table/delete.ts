import type { Request, Response } from 'express';

import { HttpStatus } from '@/constants';
import { prisma } from '@/database';
import { unauthorizedException } from '@/exception';
import { IdSchema } from '@/schemas';

async function deleteWorkTableRepository(id: string) {
  const prismaRequest = await prisma.workTableEntity.delete({
    where: { id },
  });

  return prismaRequest;
}

export async function deleteWorkTableController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);
    const repositoryRequest = await deleteWorkTableRepository(id);

    res.status(HttpStatus.OK).send({
      message: `Mesa de fundo do curso ${repositoryRequest.courseId} removida com sucesso!`,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
