import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus, RecordCourses } from '../../constants';
import { getLoginInfo, handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { RecordWorkSchema, RecordSchema } from '../../schemas';

const WorkTwoSchemas = RecordSchema.extend({ recordWork: RecordWorkSchema });

type TwoSchemasInfertypeSchema = z.infer<typeof WorkTwoSchemas>;

interface CreateWorkRepositoryInterface {
  createdById: string;
  dto: TwoSchemasInfertypeSchema;
}

async function createWorkRepository(props: CreateWorkRepositoryInterface) {
  const { createdById, dto } = props;
  const { recordWork, ...recordWithoutObject } = WorkTwoSchemas.parse(dto);
  const parseRecordWork = RecordWorkSchema.omit({ recordId: true, id: true }).parse(recordWork);

  const prismaRequest = await prisma.recordEntity.create({
    data: {
      ...recordWithoutObject,
      createdById,
      typeOfRecord: RecordCourses.work,
      recordWork: { create: parseRecordWork },
    },
  });
  return prismaRequest;
}

export async function createWorkController(req: Request, res: Response) {
  try {
    const userRequisitor = getLoginInfo(req);
    if (userRequisitor === null) throw Error('Requisição de usuário nao identificado!');

    const parsedRequest = WorkTwoSchemas.parse(req.body);
    const repositoryRequest = await createWorkRepository({
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
