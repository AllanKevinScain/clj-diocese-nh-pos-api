import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { unauthorizedException } from '../../exception';
import { getPeapleCljThreeRepository } from './get';
import { PeapleCljThreeSchema, IdSchema } from '../../schemas';

const CoursePartialSchema = PeapleCljThreeSchema.partial();

type CoursePartialInfertypeSchema = z.infer<typeof CoursePartialSchema>;

type PutRepositoryParamsType = {
  data: CoursePartialInfertypeSchema;
  id: string;
};

async function putPeapleCljThreeRepository(params: PutRepositoryParamsType) {
  const { data, id } = params;
  const prismaRequest = await prisma.peapleCljThree.update({
    where: { id },
    data,
  });

  return prismaRequest;
}

export async function putPeapleCljThreeController(req: Request, res: Response) {
  try {
    if (isEmpty(req.body)) res.status(HttpStatus.BAD_REQUEST).send();

    const { id } = IdSchema.parse(req.params);

    const parsedRequestBody = CoursePartialSchema.parse(req.body);
    if (isEmpty(parsedRequestBody)) throw new Error('Dados inválidos!');

    const currentCourseById = await getPeapleCljThreeRepository(id);
    if (isEmpty(currentCourseById)) throw new Error('Informação não encontrada!');

    const repositoryRequest = await putPeapleCljThreeRepository({ data: parsedRequestBody, id });

    res
      .status(HttpStatus.OK)
      .send({ message: `${repositoryRequest.candidateName} atualizado com sucesso!` });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
