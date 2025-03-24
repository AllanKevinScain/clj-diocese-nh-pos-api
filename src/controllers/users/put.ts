import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { IdSchema, UserSchema } from '../../schemas';

const UserPartialSchema = UserSchema.partial();

type UserPartialInfertypeSchema = z.infer<typeof UserPartialSchema>;

type PutRepositoryParamsType = {
  data: UserPartialInfertypeSchema;
  id: string;
};

async function putUserRepository(params: PutRepositoryParamsType) {
  const { data, id } = params;
  const prismaRequest = await prisma.user.update({
    where: { id },
    data,
  });

  return prismaRequest;
}

export async function putUserController(req: Request, res: Response) {
  try {
    if (isEmpty(req.body)) res.status(HttpStatus.BAD_REQUEST).send();

    const { id } = IdSchema.parse(req.params);
    const parsedRequestBody = UserPartialSchema.parse(req.body);
    const repositoryRequest = await putUserRepository({ data: parsedRequestBody, id });

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
