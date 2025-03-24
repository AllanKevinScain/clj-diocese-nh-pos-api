import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { POSllTwoSchemas } from './create';
import { IdSchema, RecordPOSllSchema, RecordSchema } from '../../schemas';

const RecordPOSllPartialSchema = POSllTwoSchemas.partial();

type RecordPOSllPartialInfertypeSchema = z.infer<typeof RecordPOSllPartialSchema>;

type PutRepositoryParamsType = {
  data: RecordPOSllPartialInfertypeSchema;
  id: string;
};

async function putRecordPOSllRepository(params: PutRepositoryParamsType) {
  const { data, id } = params;
  const record = RecordSchema.partial().parse(data);
  const recordPOSll = RecordPOSllSchema.partial().parse(data);

  const prismaRequest = await prisma.record.update({
    where: { id },
    data: {
      ...record,
      recordPOSll: {
        update: {
          where: { id: id },
          data: recordPOSll,
        },
      },
    },
  });

  return prismaRequest;
}

export async function putRecordPOSllController(req: Request, res: Response) {
  try {
    if (isEmpty(req.body)) res.status(HttpStatus.BAD_REQUEST).send();

    const { id } = IdSchema.parse(req.params);
    const parsedRequestBody = RecordPOSllPartialSchema.parse(req.body);
    const repositoryRequest = await putRecordPOSllRepository({ data: parsedRequestBody, id });

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
