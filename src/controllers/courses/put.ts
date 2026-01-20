import { RecordRoleType } from '@prisma/client';
import type { Request, Response } from 'express';
import { isEmpty } from 'lodash';

import { HttpStatus } from '@/constants';
import { prisma } from '@/database';
import { unauthorizedException } from '@/exception';
import type { CourseInfertypeSchema} from '@/schemas';
import { CourseSchema, IdSchema } from '@/schemas';
import { getCourseById } from '@/services-helpers';

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

  const { auxiliar, base, coordinator, coupleKitchenCoordinator, id: courseId } = prismaRequest;

  const userRoles = [
    { role: RecordRoleType.auxiliar, recordId: auxiliar },
    { role: RecordRoleType.base, recordId: base },
    { role: RecordRoleType.coordinator, recordId: coordinator },
    { role: RecordRoleType.coupleKitchenCoordinator, recordId: coupleKitchenCoordinator },
  ].filter((item) => !!item.recordId);

  await Promise.all(
    userRoles.map(async ({ recordId, role }) => {
      await prisma.recordRole.deleteMany({
        where: {
          role,
          courseId,
        },
      });

      if (!recordId) return;
      await prisma.recordRole.create({
        data: {
          role,
          participantId: recordId,
          courseId,
        },
      });
    }),
  );

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

    const currentCourseById = await getCourseById(id);
    if (isEmpty(currentCourseById)) throw new Error('Curso não encontrado!');

    const repositoryRequest = await putCourseRepository({ data: parsedRequestBody, id });

    res
      .status(HttpStatus.OK)
      .send({ message: `Curso ${repositoryRequest.courseNumber} atualizado com sucesso!` });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
