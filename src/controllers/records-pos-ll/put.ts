import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { IdSchema, RecordPOSllSchema, RecordSchema } from '../../schemas';

const RecordPOSllPartialSchema = RecordSchema.extend({ recordPOSll: RecordPOSllSchema });

type RecordPOSllPartialInfertypeSchema = z.infer<typeof RecordPOSllPartialSchema>;

type PutRepositoryParamsType = {
  data: RecordPOSllPartialInfertypeSchema;
  id: string;
};

async function putRecordPOSllRepository(params: PutRepositoryParamsType) {
  const { data, id } = params;
  const { recordPOSll, ...recordWithoutObject } = RecordPOSllPartialSchema.partial().parse(data);
  const parsedRecordPOSll = RecordPOSllSchema.omit({ recordId: true }).partial().parse(recordPOSll);

  const prismaRequest = await prisma.record.update({
    where: { id },
    data: {
      ...recordWithoutObject,
      ...(recordPOSll && {
        recordPOSll: { update: parsedRecordPOSll },
      }),
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

    res.status(HttpStatus.OK).send({
      message: `A ficha de ${repositoryRequest.candidateName} foi atualizada`,
      data: repositoryRequest,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
