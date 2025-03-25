import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus, RecordCourses } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { RecordCoupleSchema, RecordSchema } from '../../schemas';

export const CoupleTwoSchemas = RecordSchema.merge(RecordCoupleSchema);

type TwoSchemasInfertypeSchema = z.infer<typeof CoupleTwoSchemas>;

async function createCoupleRepository(params: TwoSchemasInfertypeSchema) {
  const record = RecordSchema.parse(params);
  const Couple = RecordCoupleSchema.parse(params);

  const prismaRequest = await prisma.record.create({
    data: {
      typeOfRecord: RecordCourses.posl,
      ...record,
      recordCouple: {
        create: Couple,
      },
    },
  });
  return prismaRequest;
}

export async function createCoupleController(req: Request, res: Response) {
  try {
    const parsedRequest = CoupleTwoSchemas.parse(req.body);
    const repositoryRequest = await createCoupleRepository(parsedRequest);

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
