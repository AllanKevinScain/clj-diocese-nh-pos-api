import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { IdSchema, workTableSchema, WorkTableInfertypeSchema } from '../../schemas';

type PutRepositoryParamsType = {
  data: Partial<WorkTableInfertypeSchema>;
  id: string;
};

async function putWorkTableRepository(params: PutRepositoryParamsType) {
  const { data, id } = params;
  const { communities, id: _, ...workTableObject } = workTableSchema.partial().parse(data);

  const prismaRequest = await prisma.workTableEntity.update({
    where: { id },
    data: {
      ...workTableObject,
      ...(communities && {
        communities: {
          deleteMany: {}, // limpa as antigas
          create: communities.map((c) => ({
            number: c.number,
            members: {
              create: c.members.map((member) => ({
                recordId: member.recordId,
              })),
            },
          })),
        },
      }),
    },
    include: {
      communities: { include: { members: true } },
    },
  });

  return prismaRequest;
}

export async function putWorkTableController(req: Request, res: Response) {
  try {
    if (isEmpty(req.body)) res.status(HttpStatus.BAD_REQUEST).send();

    const { id } = IdSchema.parse(req.params);
    const parsedRequestBody = workTableSchema.partial().parse(req.body);
    const repositoryRequest = await putWorkTableRepository({ data: parsedRequestBody, id });

    res.status(HttpStatus.OK).send({
      message: 'A mesa de fundo foi atualizada com sucesso!',
      data: repositoryRequest,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
