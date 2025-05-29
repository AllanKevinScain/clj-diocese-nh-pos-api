import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { POSlSchema } from './create';
import { IdSchema, RecordPOSlSchema, RecordSchema } from '../../schemas';

const RecordPOSlPartialSchema = POSlSchema.partial();

type RecordPOSlPartialInfertypeSchema = z.infer<typeof RecordPOSlPartialSchema>;

type PutRepositoryParamsType = {
  data: RecordPOSlPartialInfertypeSchema;
  id: string;
};

async function putRecordPOSlRepository(params: PutRepositoryParamsType) {
  const { data, id } = params;
  const record = RecordSchema.partial().parse(data);
  const recordPOSl = RecordPOSlSchema.partial().parse(data);

  const prismaRequest = await prisma.record.update({
    where: { id },
    data: {
      ...record,
      recordPOSl: {
        update: {
          where: { id },
          data: recordPOSl,
        },
      },
    },
  });

  return prismaRequest;
}

export async function putRecordPOSlController(req: Request, res: Response) {
  try {
    if (isEmpty(req.body)) res.status(HttpStatus.BAD_REQUEST).send();

    const { id } = IdSchema.parse(req.params);
    const parsedRequestBody = RecordPOSlPartialSchema.parse(req.body);
    const repositoryRequest = await putRecordPOSlRepository({ data: parsedRequestBody, id });

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
