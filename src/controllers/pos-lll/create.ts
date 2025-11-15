import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { unauthorizedException } from '../../exception';
import { PoslllInfertypeSchema, poslllSchema } from '../../schemas';

async function createPoslllRepository(data: PoslllInfertypeSchema) {
  const prismaRequest = await prisma.poslll.create({ data });
  return prismaRequest;
}

export async function createPoslllController(req: Request, res: Response) {
  try {
    const parsedRequest = poslllSchema.parse(req.body);
    const repositoryRequest = await createPoslllRepository(parsedRequest);

    res
      .status(HttpStatus.OK)
      .send({ message: `${repositoryRequest.candidateName} adicionado a lista com sucesso!` });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: unauthorizedException(error) });
  }
}
