import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus, RecordCourses } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { IdSchema, RecordWorkSchema, RecordSchema } from '../../schemas';

const WorkPartialSchema = RecordSchema.extend({ recordWork: RecordWorkSchema });

type WorkPartialInfertypeSchema = z.infer<typeof WorkPartialSchema>;

type PutRepositoryParamsType = {
  data: Partial<WorkPartialInfertypeSchema>;
  id: string;
};

async function putWorkRepository(params: PutRepositoryParamsType) {
  const { data, id } = params;
  const { recordWork, ...recordWithoutObject } = WorkPartialSchema.partial().parse(data);
  const parsedRecordWork = RecordWorkSchema.omit({ recordId: true }).partial().parse(recordWork);

  const prismaRequest = await prisma.record.update({
    where: { id },
    data: {
      ...recordWithoutObject,
      typeOfRecord: RecordCourses.work,
      ...(recordWork && {
        recordWork: { update: parsedRecordWork },
      }),
    },
  });

  return prismaRequest;
}

export async function putWorkController(req: Request, res: Response) {
  try {
    if (isEmpty(req.body)) res.status(HttpStatus.BAD_REQUEST).send();

    const { id } = IdSchema.parse(req.params);
    const parsedRequestBody = WorkPartialSchema.partial().parse(req.body);
    const repositoryRequest = await putWorkRepository({ data: parsedRequestBody, id });

    res.status(HttpStatus.OK).send({
      message: `A ficha de ${repositoryRequest.candidateName} foi atualizada`,
      data: repositoryRequest,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
