import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus, RecordCourses } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { RecordPOSlSchema, RecordSchema } from '../../schemas';

const POSlSchema = RecordSchema.extend({ recordPOSl: RecordPOSlSchema });

type TwoSchemasInfertypeSchema = z.infer<typeof POSlSchema>;

async function createRecordPOSlRepository(params: TwoSchemasInfertypeSchema) {
  const { recordPOSl, ...recordWithoutObject } = POSlSchema.parse(params);
  const recordPOSlCreate = RecordPOSlSchema.omit({ recordId: true, id: true }).parse(recordPOSl);

  const prismaRequest = await prisma.record.create({
    data: {
      ...recordWithoutObject,
      typeOfRecord: RecordCourses.posl,
      recordPOSl: { create: recordPOSlCreate },
    },
  });
  return prismaRequest;
}

export async function createRecordPOSlController(req: Request, res: Response) {
  try {
    const parsedRequest = POSlSchema.parse(req.body);
    const repositoryRequest = await createRecordPOSlRepository(parsedRequest);

    res
      .status(HttpStatus.OK)
      .send({ message: 'Ficha criada com sucesso!', data: repositoryRequest });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
