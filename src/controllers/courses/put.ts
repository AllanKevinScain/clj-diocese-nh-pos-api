import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { unauthorizedException } from '../../exception';
import { getCourseRepository } from './get';
import { CourseInfertypeSchema, CourseSchema, IdSchema } from '../../schemas';
import { findCourseByDate } from './helpers';

type PutRepositoryParamsType = {
  data: Partial<CourseInfertypeSchema>;
  id: string;
};

async function putCourseRepository(params: PutRepositoryParamsType) {
  const { data, id } = params;
  const prismaRequest = await prisma.course.update({
    where: { id },
    data,
  });

  return prismaRequest;
}

export async function putCourseController(req: Request, res: Response) {
  try {
    const parsedRequestBody = CourseSchema.partial().parse(req.body);
    if (isEmpty(parsedRequestBody)) throw new Error('Dados inválidos!');

    const { id } = IdSchema.parse(req.params);
    if (isEmpty(id)) throw new Error('Nenhum registro foi fornecido!');

    // validações específicas
    await findCourseByDate(
      {
        startDate: parsedRequestBody.startDate,
        endDate: parsedRequestBody.endDate,
      },
      id,
    );

    const currentCourseById = await getCourseRepository(id);
    if (isEmpty(currentCourseById)) throw new Error('Curso não encontrado!');

    const repositoryRequest = await putCourseRepository({ data: parsedRequestBody, id });

    res
      .status(HttpStatus.OK)
      .send({ message: `Curso ${repositoryRequest.courseNumber} atualizado com sucesso!` });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
