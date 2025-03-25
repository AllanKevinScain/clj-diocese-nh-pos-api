import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { WorkTwoSchemas } from './create';
import { IdSchema, RecordWorkSchema, RecordSchema } from '../../schemas';

const WorkPartialSchema = WorkTwoSchemas.partial();

type WorkPartialInfertypeSchema = z.infer<typeof WorkPartialSchema>;

type PutRepositoryParamsType = {
  data: WorkPartialInfertypeSchema;
  id: string;
};

async function putWorkRepository(params: PutRepositoryParamsType) {
  const { data, id } = params;
  const record = RecordSchema.partial().parse(data);
  const Work = RecordWorkSchema.partial().parse(data);

  const prismaRequest = await prisma.record.update({
    where: { id },
    data: {
      ...record,
      recordWork: {
        update: {
          where: { id },
          data: Work,
        },
      },
    },
  });

  return prismaRequest;
}

export async function putWorkController(req: Request, res: Response) {
  try {
    if (isEmpty(req.body)) res.status(HttpStatus.BAD_REQUEST).send();

    const { id } = IdSchema.parse(req.params);
    const parsedRequestBody = WorkPartialSchema.parse(req.body);
    const repositoryRequest = await putWorkRepository({ data: parsedRequestBody, id });

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
