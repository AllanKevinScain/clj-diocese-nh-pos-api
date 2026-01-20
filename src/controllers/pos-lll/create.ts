import type { Request, Response } from 'express';

import { HttpStatus } from '@/constants';
import { prisma } from '@/database';
import { unauthorizedException } from '@/exception';
import type { PoslllInfertypeSchema} from '@/schemas';
import { poslllSchema } from '@/schemas';

async function createPoslllRepository(data: PoslllInfertypeSchema) {
  const prismaRequest = await prisma.poslll.create({ data });

  if (prismaRequest) {
    await prisma.participant.create({ data: { poslllId: prismaRequest.id } });
  }

  return prismaRequest;
}

export async function createPoslllController(req: Request, res: Response) {
  try {
    const parsedRequest = poslllSchema.parse(req.body);
    const repositoryRequest = await createPoslllRepository(parsedRequest);

    res.status(HttpStatus.OK).send({
      message: `${repositoryRequest.candidateName} adicionado a lista com sucesso!`,
      data: null,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: unauthorizedException(error) });
  }
}
