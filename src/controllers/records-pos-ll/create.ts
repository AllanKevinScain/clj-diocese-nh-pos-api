import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus, RecordCourses } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { RecordPOSllSchema, RecordSchema } from '../../schemas';

const POSllSchema = RecordSchema.extend({ recordPOSll: RecordPOSllSchema });

type TwoSchemasInfertypeSchema = z.infer<typeof POSllSchema>;

async function createRecordPOSllRepository(params: TwoSchemasInfertypeSchema) {
  const { recordPOSll, ...recordWithoutObject } = POSllSchema.parse(params);
  const parseRrecordPOSll = RecordPOSllSchema.omit({ recordId: true, id: true }).parse(recordPOSll);

  const prismaRequest = await prisma.record.create({
    data: {
      ...recordWithoutObject,
      typeOfRecord: RecordCourses.posll,
      recordPOSll: { create: parseRrecordPOSll },
    },
  });
  return prismaRequest;
}

export async function createRecordPOSllController(req: Request, res: Response) {
  try {
    const parsedRequest = POSllSchema.parse(req.body);
    const repositoryRequest = await createRecordPOSllRepository(parsedRequest);

    res
      .status(HttpStatus.OK)
      .send({ message: 'Ficha criada com sucesso!', data: repositoryRequest });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
