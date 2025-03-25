import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { CoupleTwoSchemas } from './create';
import { IdSchema, RecordCoupleSchema, RecordSchema } from '../../schemas';

const CouplePartialSchema = CoupleTwoSchemas.partial();

type CouplePartialInfertypeSchema = z.infer<typeof CouplePartialSchema>;

type PutRepositoryParamsType = {
  data: CouplePartialInfertypeSchema;
  id: string;
};

async function putCoupleRepository(params: PutRepositoryParamsType) {
  const { data, id } = params;
  const record = RecordSchema.partial().parse(data);
  const Couple = RecordCoupleSchema.partial().parse(data);

  const prismaRequest = await prisma.record.update({
    where: { id },
    data: {
      ...record,
      recordCouple: {
        update: {
          where: { id },
          data: Couple,
        },
      },
    },
  });

  return prismaRequest;
}

export async function putCoupleController(req: Request, res: Response) {
  try {
    if (isEmpty(req.body)) res.status(HttpStatus.BAD_REQUEST).send();

    const { id } = IdSchema.parse(req.params);
    const parsedRequestBody = CouplePartialSchema.parse(req.body);
    const repositoryRequest = await putCoupleRepository({ data: parsedRequestBody, id });

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
