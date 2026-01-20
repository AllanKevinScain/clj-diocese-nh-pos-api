import type { TypeOfficeWorkKitchenMember } from '@prisma/client';
import { RecordRoleType } from '@prisma/client';
import type { Request, Response } from 'express';
import { isEmpty } from 'lodash';

import { HttpStatus } from '@/constants';
import { prisma } from '@/database';
import { handleZodError } from '@/helpers';
import type { WorkTableInfertypeSchema } from '@/schemas';
import { IdSchema, workTableSchema } from '@/schemas';

type PutRepositoryParamsType = {
  data: Partial<WorkTableInfertypeSchema>;
  id: string;
};

async function putWorkTableRepository(params: PutRepositoryParamsType) {
  const { data, id } = params;
  const { communities, id: _id, ...workTableObject } = workTableSchema.partial().parse(data);
  const { cleanWorkRecords, copeWorkRecords, kitchenWorkRecords, ...restWorkTable } =
    workTableObject;

  const cleanWork =
    cleanWorkRecords?.map((item) => {
      return { office: 'cleanWork' as TypeOfficeWorkKitchenMember, recordId: item };
    }) || [];

  const copeWork =
    copeWorkRecords?.map((item) => {
      return { office: 'copeWork' as TypeOfficeWorkKitchenMember, recordId: item };
    }) || [];

  const kitchenWork =
    kitchenWorkRecords?.map((item) => {
      return { office: 'kitchenWork' as TypeOfficeWorkKitchenMember, recordId: item };
    }) || [];

  const prismaRequest = await prisma.workTableEntity.update({
    where: { id },
    data: {
      ...restWorkTable,
      kitchenRecords: {
        deleteMany: {},
        createMany: {
          data: [...cleanWork, ...copeWork, ...kitchenWork],
        },
      },
      ...(communities && {
        communities: {
          deleteMany: {},
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
      kitchenRecords: true,
      communities: { include: { members: true } },
    },
  });

  const { auxiliarLiturgy, auxiliarSecretary, bar, coupleSafeToBe, folkloreCoordinator, courseId } =
    prismaRequest;

  const userRoles = [
    { role: RecordRoleType.auxiliarLiturgy, recordId: auxiliarLiturgy },
    { role: RecordRoleType.auxiliarSecretary, recordId: auxiliarSecretary },
    { role: RecordRoleType.bar, recordId: bar },
    { role: RecordRoleType.coupleSafeToBe, recordId: coupleSafeToBe },
    { role: RecordRoleType.folkloreCoordinator, recordId: folkloreCoordinator },
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
          courseId: prismaRequest.courseId,
          workTableId: prismaRequest.id,
        },
      });
    }),
  );

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
