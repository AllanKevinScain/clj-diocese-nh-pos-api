import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { unauthorizedException } from '../../exception';
import { getPoslllRepository } from './get';
import { IdSchema, PoslllInfertypeSchema, poslllSchema } from '../../schemas';

type PutRepositoryParamsType = {
  data: Partial<PoslllInfertypeSchema>;
  id: string;
};

async function putPoslllRepository(params: PutRepositoryParamsType) {
  const { data, id } = params;
  const prismaRequest = await prisma.poslll.update({
    where: { id },
    data,
  });

  return prismaRequest;
}

export async function putPoslllController(req: Request, res: Response) {
  try {
    if (isEmpty(req.body)) res.status(HttpStatus.BAD_REQUEST).send();

    const { id } = IdSchema.parse(req.params);

    const parsedRequestBody = poslllSchema.partial().parse(req.body);
    if (isEmpty(parsedRequestBody)) throw new Error('Dados inválidos!');

    const currentCourseById = await getPoslllRepository(id);
    if (isEmpty(currentCourseById)) throw new Error('Informação não encontrada!');

    const repositoryRequest = await putPoslllRepository({ data: parsedRequestBody, id });

    res
      .status(HttpStatus.OK)
      .send({ message: `${repositoryRequest.candidateName} atualizado com sucesso!`, data: null });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
