import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus, RecordCourses } from '../../constants';
import { getLoginInfo, handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { RecordCoupleSchema, RecordSchema } from '../../schemas';

const CoupleTwoSchemas = RecordSchema.extend({ recordCouple: RecordCoupleSchema });

type TwoSchemasInfertypeSchema = z.infer<typeof CoupleTwoSchemas>;

interface CreateCoupleRepositoryInterface {
  createdById: string;
  dto: TwoSchemasInfertypeSchema;
}

async function createCoupleRepository(props: CreateCoupleRepositoryInterface) {
  const { createdById, dto } = props;
  const { recordCouple, ...recordWithoutObject } = CoupleTwoSchemas.parse(dto);
  const recordCoupleCreate = RecordCoupleSchema.omit({ recordId: true, id: true }).parse(
    recordCouple,
  );

  const prismaRequest = await prisma.recordEntity.create({
    data: {
      ...recordWithoutObject,
      createdById,
      typeOfRecord: RecordCourses.couple,
      recordCouple: { create: recordCoupleCreate },
    },
  });
  return prismaRequest;
}

export async function createCoupleController(req: Request, res: Response) {
  try {
    const userRequisitor = getLoginInfo(req);
    if (userRequisitor === null) throw Error('Requisição de usuário nao identificado!');

    const parsedRequest = CoupleTwoSchemas.parse(req.body);
    const repositoryRequest = await createCoupleRepository({
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
