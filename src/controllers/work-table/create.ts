import type { TypeOfficeWorkKitchenMember } from '@prisma/client';
import type { Request, Response } from 'express';

import { HttpStatus } from '@/constants';
import { prisma } from '@/database';
import { handleZodError } from '@/helpers';
import type { WorkTableInfertypeSchema } from '@/schemas';
import { workTableSchema } from '@/schemas';

import { createRecordRoleByCreateWorkTableResponse } from './record-role';

async function createWorkTableRepository(params: WorkTableInfertypeSchema) {
  const { communities, id: _id, ...workTableObject } = workTableSchema.parse(params);
  const { cleanWorkRecords, copeWorkRecords, kitchenWorkRecords, ...restWorkTable } =
    workTableObject;

  const cleanWork =
    cleanWorkRecords.map((item) => {
      return { office: 'cleanWork' as TypeOfficeWorkKitchenMember, recordId: item };
    }) || [];

  const copeWork =
    copeWorkRecords.map((item) => {
      return { office: 'copeWork' as TypeOfficeWorkKitchenMember, recordId: item };
    }) || [];

  const kitchenWork =
    kitchenWorkRecords.map((item) => {
      return { office: 'kitchenWork' as TypeOfficeWorkKitchenMember, recordId: item };
    }) || [];

  const prismaRequest = await prisma.workTableEntity.create({
    data: {
      ...restWorkTable,
      kitchenRecords: {
        createMany: {
          skipDuplicates: true,
          data: [...cleanWork, ...copeWork, ...kitchenWork],
        },
      },
      communities: {
        create: communities.map((c) => ({
          number: c.number,
          members: {
            create: c.members.map((member) => ({
              recordId: member.recordId,
            })),
          },
        })),
      },
    },
    include: {
      kitchenRecords: true,
      communities: { include: { members: true } },
    },
  });

  await createRecordRoleByCreateWorkTableResponse(prismaRequest);

  return prismaRequest;
}

export async function createWorkTableController(req: Request, res: Response) {
  try {
    const parsedRequest = workTableSchema.parse(req.body);
    const repositoryRequest = await createWorkTableRepository(parsedRequest);

    res
      .status(HttpStatus.OK)
      .send({ message: 'Mesa de fundo criada coom sucesso!', data: repositoryRequest });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
