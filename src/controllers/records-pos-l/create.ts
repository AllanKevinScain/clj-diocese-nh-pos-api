import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus, RecordCourses } from '../../constants';
import { getLoginInfo, handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { RecordPOSlSchema, RecordSchema } from '../../schemas';

const POSlSchema = RecordSchema.extend({ recordPOSl: RecordPOSlSchema });

type TwoSchemasInfertypeSchema = z.infer<typeof POSlSchema>;

interface CreateRecordPOSlRepositoryInterface {
  createdById: string;
  dto: TwoSchemasInfertypeSchema;
}

async function createRecordPOSlRepository(props: CreateRecordPOSlRepositoryInterface) {
  const { createdById, dto } = props;
  const { recordPOSl, ...recordWithoutObject } = POSlSchema.parse(dto);
  const recordPOSlCreate = RecordPOSlSchema.omit({ recordId: true, id: true }).parse(recordPOSl);

  const prismaRequest = await prisma.recordEntity.create({
    data: {
      ...recordWithoutObject,
      createdById,
      typeOfRecord: RecordCourses.posl,
      recordPOSl: { create: recordPOSlCreate },
    },
  });
  return prismaRequest;
}

export async function createRecordPOSlController(req: Request, res: Response) {
  try {
    const userRequisitor = getLoginInfo(req);
    if (userRequisitor === null) throw Error('Requisição de usuário nao identificado!');

    const parsedRequest = POSlSchema.parse(req.body);
    const repositoryRequest = await createRecordPOSlRepository({
      createdById: userRequisitor?.id,
      dto: parsedRequest,
    });

    res
      .status(HttpStatus.OK)
      .send({ message: 'Ficha criada com sucesso!', data: repositoryRequest });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
