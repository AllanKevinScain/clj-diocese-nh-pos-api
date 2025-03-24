import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus, Record } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { RecordWorkSchema, RecordSchema } from '../../schemas';

export const WorkTwoSchemas = RecordSchema.merge(RecordWorkSchema);

type TwoSchemasInfertypeSchema = z.infer<typeof WorkTwoSchemas>;

async function createWorkRepository(params: TwoSchemasInfertypeSchema) {
  const record = RecordSchema.parse(params);
  const Work = RecordWorkSchema.parse(params);

  const prismaRequest = await prisma.record.create({
    data: {
      typeOfRecord: Record.work,
      ...record,
      recordWork: {
        create: Work,
      },
    },
  });
  return prismaRequest;
}

export async function createWorkController(req: Request, res: Response) {
  try {
    const parsedRequest = WorkTwoSchemas.parse(req.body);
    const repositoryRequest = await createWorkRepository(parsedRequest);

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
