import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus, RecordCourses } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { RecordPOSllSchema, RecordSchema } from '../../schemas';

export const POSllTwoSchemas = RecordSchema.extend({ recordPOSll: RecordPOSllSchema });

type TwoSchemasInfertypeSchema = z.infer<typeof POSllTwoSchemas>;

async function createRecordPOSllRepository(params: TwoSchemasInfertypeSchema) {
  const { recordPOSll, ...record } = POSllTwoSchemas.parse(params);
  const parseRrecordPOSll = RecordPOSllSchema.parse(recordPOSll);

  const prismaRequest = await prisma.record.create({
    data: {
      typeOfRecord: RecordCourses.posll,
      ...record,
      recordPOSll: {
        create: parseRrecordPOSll,
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
