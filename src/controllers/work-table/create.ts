import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { WorkTableInfertypeSchema, workTableSchema } from '../../schemas';
import { TypeOfficeWorkKitchenMember } from '@prisma/client';

async function createWorkTableRepository(params: WorkTableInfertypeSchema) {
  const { communities, id: _, ...workTableObject } = workTableSchema.parse(params);
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
