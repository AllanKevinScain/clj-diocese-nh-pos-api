import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus, RecordCourses } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { RecordPOSllSchema, RecordSchema } from '../../schemas';

export const POSllTwoSchemas = RecordSchema.merge(RecordPOSllSchema);

type TwoSchemasInfertypeSchema = z.infer<typeof POSllTwoSchemas>;

async function createRecordPOSllRepository(params: TwoSchemasInfertypeSchema) {
  const record = RecordSchema.parse(params);
  const recordPOSll = RecordPOSllSchema.parse(params);

  const prismaRequest = await prisma.record.create({
    data: {
      typeOfRecord: RecordCourses.posll,
      ...record,
      recordPOSll: {
        create: recordPOSll,
      },
    },
  });
  return prismaRequest;
}

export async function createRecordPOSllController(req: Request, res: Response) {
  try {
    const parsedRequest = POSllTwoSchemas.parse(req.body);
    const repositoryRequest = await createRecordPOSllRepository(parsedRequest);

    res
      .status(HttpStatus.OK)
      .send({ message: 'Ficha criada com sucesso!', data: repositoryRequest });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
