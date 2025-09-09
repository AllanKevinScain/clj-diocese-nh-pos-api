import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus, RecordCourses } from '../../constants';
import { getLoginInfo, handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { RecordPOSllSchema, RecordSchema } from '../../schemas';

const POSllSchema = RecordSchema.extend({ recordPOSll: RecordPOSllSchema });

type TwoSchemasInfertypeSchema = z.infer<typeof POSllSchema>;

interface CreateRecordPOSllRepositoryInterface {
  createdById: string;
  dto: TwoSchemasInfertypeSchema;
}

async function createRecordPOSllRepository(props: CreateRecordPOSllRepositoryInterface) {
  const { createdById, dto } = props;
  const { recordPOSll, ...recordWithoutObject } = POSllSchema.parse(dto);
  const parseRrecordPOSll = RecordPOSllSchema.omit({ recordId: true, id: true }).parse(recordPOSll);

  const prismaRequest = await prisma.recordEntity.create({
    data: {
      ...recordWithoutObject,
      createdById,
      typeOfRecord: RecordCourses.posll,
      recordPOSll: { create: parseRrecordPOSll },
    },
  });
  return prismaRequest;
}

export async function createRecordPOSllController(req: Request, res: Response) {
  try {
    const userRequisitor = getLoginInfo(req);
    if (userRequisitor === null) throw Error('Requisição de usuário nao identificado!');

    const parsedRequest = POSllSchema.parse(req.body);
    const repositoryRequest = await createRecordPOSllRepository({
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
