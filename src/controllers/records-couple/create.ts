import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus, RecordCourses } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { RecordCoupleSchema, RecordSchema } from '../../schemas';

const CoupleTwoSchemas = RecordSchema.extend({ recordCouple: RecordCoupleSchema });

type TwoSchemasInfertypeSchema = z.infer<typeof CoupleTwoSchemas>;

async function createCoupleRepository(params: TwoSchemasInfertypeSchema) {
  const { recordCouple, ...recordWithoutObject } = CoupleTwoSchemas.parse(params);
  const recordCoupleCreate = RecordCoupleSchema.omit({ recordId: true, id: true }).parse(
    recordCouple,
  );

  const prismaRequest = await prisma.record.create({
    data: {
      ...recordWithoutObject,
      typeOfRecord: RecordCourses.couple,
      recordCouple: { create: recordCoupleCreate },
    },
  });
  return prismaRequest;
}

export async function createCoupleController(req: Request, res: Response) {
  try {
    const parsedRequest = CoupleTwoSchemas.parse(req.body);
    const repositoryRequest = await createCoupleRepository(parsedRequest);

    res
      .status(HttpStatus.OK)
      .send({ message: 'Ficha criada com sucesso!', data: repositoryRequest });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
