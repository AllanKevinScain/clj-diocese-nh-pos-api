import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { unauthorizedException } from '../../exception';
import { PeapleCljThreeSchema } from '../../schemas';

type PeapleCljThreeInfertypeSchema = z.infer<typeof PeapleCljThreeSchema>;

async function createPeapleCljThreeRepository(data: PeapleCljThreeInfertypeSchema) {
  const prismaRequest = await prisma.peapleCljThree.create({ data });
  return prismaRequest;
}

export async function createPeapleCljThreeController(req: Request, res: Response) {
  try {
    const parsedRequest = PeapleCljThreeSchema.parse(req.body);
    const repositoryRequest = await createPeapleCljThreeRepository(parsedRequest);

    res
      .status(HttpStatus.OK)
      .send({ message: `${repositoryRequest.candidateName} adicionado a lista com sucesso!` });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: unauthorizedException(error) });
  }
}
