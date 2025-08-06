import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { unauthorizedException } from '../../exception';
import { IdSchema } from '../../schemas';

export async function getPeapleCljThreeRepository(id: string) {
  const prismaRequest = await prisma.peapleCljThree.findUnique({
    where: { id },
  });

  return prismaRequest;
}

export async function getPeapleCljThreeController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);

    const repositoryRequest = await getPeapleCljThreeRepository(id);
    if (isEmpty(repositoryRequest)) throw new Error('Informação não encontrada!');

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
