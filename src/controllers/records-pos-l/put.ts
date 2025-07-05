import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { IdSchema, RecordPOSlSchema, RecordSchema } from '../../schemas';

const RecordPOSlPartialSchema = RecordSchema.extend({ recordPOSl: RecordPOSlSchema });

type RecordPOSlPartialInfertypeSchema = z.infer<typeof RecordPOSlPartialSchema>;

type PutRepositoryParamsType = {
  data: RecordPOSlPartialInfertypeSchema;
  id: string;
};

export async function putRecordPOSlRepository(params: PutRepositoryParamsType) {
  const { data, id } = params;
  const { recordPOSl, ...recordWithoutPOSl } = RecordPOSlPartialSchema.partial().parse(data);
  const parsedRecordPOSl = RecordPOSlSchema.omit({ recordId: true }).partial().parse(recordPOSl);

  const prismaRequest = await prisma.record.update({
    where: { id },
    data: {
      ...recordWithoutPOSl,
      ...(recordPOSl && {
        recordPOSl: { update: parsedRecordPOSl },
      }),
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

    res.status(HttpStatus.OK).send({
      message: `A ficha de ${repositoryRequest.candidateName} foi atualizada`,
      data: repositoryRequest,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
