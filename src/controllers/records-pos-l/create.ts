import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus, Record } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { RecordPOSlSchema, RecordSchema } from '../../schemas';

export const POSlTwoSchemas = RecordSchema.merge(RecordPOSlSchema);

type TwoSchemasInfertypeSchema = z.infer<typeof POSlTwoSchemas>;

async function createRecordPOSlRepository(params: TwoSchemasInfertypeSchema) {
  const record = RecordSchema.parse(params);
  const recordPOSl = RecordPOSlSchema.parse(params);

  const prismaRequest = await prisma.record.create({
    data: {
      typeOfRecord: Record.posl,
      ...record,
      recordPOSl: {
        create: recordPOSl,
      },
    },
  });
  return prismaRequest;
}

export async function createRecordPOSlController(req: Request, res: Response) {
  try {
    const parsedRequest = POSlTwoSchemas.parse(req.body);
    const repositoryRequest = await createRecordPOSlRepository(parsedRequest);

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
