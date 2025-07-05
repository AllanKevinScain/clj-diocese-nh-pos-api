import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus, RecordCourses } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { RecordWorkSchema, RecordSchema } from '../../schemas';

const WorkTwoSchemas = RecordSchema.extend({ recordWork: RecordWorkSchema });

type TwoSchemasInfertypeSchema = z.infer<typeof WorkTwoSchemas>;

async function createWorkRepository(params: TwoSchemasInfertypeSchema) {
  const { recordWork, ...recordWithoutObject } = WorkTwoSchemas.parse(params);
  const parseRecordWork = RecordWorkSchema.parse(recordWork);

  const prismaRequest = await prisma.record.create({
    data: {
      typeOfRecord: RecordCourses.work,
      ...recordWithoutObject,
      recordWork: { create: parseRecordWork },
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
