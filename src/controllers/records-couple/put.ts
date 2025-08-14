import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus, RecordCourses } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { IdSchema, RecordCoupleSchema, RecordSchema } from '../../schemas';

const CouplePartialSchema = RecordSchema.extend({ recordCouple: RecordCoupleSchema });

type CouplePartialInfertypeSchema = z.infer<typeof CouplePartialSchema>;

type PutRepositoryParamsType = {
  data: Partial<CouplePartialInfertypeSchema>;
  id: string;
};

async function putCoupleRepository(params: PutRepositoryParamsType) {
  const { data, id } = params;
  const { recordCouple, ...recordWithoutCouple } = CouplePartialSchema.partial().parse(data);
  const parsedRecordCouple = RecordCoupleSchema.omit({ recordId: true })
    .partial()
    .parse(recordCouple);

  const prismaRequest = await prisma.record.update({
    where: { id },
    data: {
      ...recordWithoutCouple,
      typeOfRecord: RecordCourses.couple,
      ...(recordCouple && {
        recordCouple: { update: parsedRecordCouple },
      }),
    },
  });

  return prismaRequest;
}

export async function putCoupleController(req: Request, res: Response) {
  try {
    if (isEmpty(req.body)) res.status(HttpStatus.BAD_REQUEST).send();

    const { id } = IdSchema.parse(req.params);
    const parsedRequestBody = CouplePartialSchema.partial().parse(req.body);
    const repositoryRequest = await putCoupleRepository({ data: parsedRequestBody, id });

    res.status(HttpStatus.OK).send({
      message: `A ficha de ${repositoryRequest.candidateName} foi atualizada`,
      data: repositoryRequest,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
