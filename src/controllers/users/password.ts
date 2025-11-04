import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { IdSchema, UserPasswordSchema, UserPasswordInfertypeSchema } from '../../schemas';
import { unauthorizedException } from '../../exception';
import { getUserRepository } from './get';
import bcrypt from 'bcryptjs';

type PutRepositoryParamsType = {
  data: UserPasswordInfertypeSchema;
  id: string;
};

async function putPasswordUserRepository(params: PutRepositoryParamsType) {
  const { data, id } = params;
  const hashedPassword = await bcrypt.hash(data.newPassword, 10);

  const prismaRequest = await prisma.user.update({
    where: { id },
    data: { password: hashedPassword },
  });

  return prismaRequest;
}

export async function putPasswordUserController(req: Request, res: Response) {
  try {
    if (isEmpty(req.body)) res.status(HttpStatus.BAD_REQUEST).send();

    const { id } = IdSchema.parse(req.params);

    const parsedRequestBody = UserPasswordSchema.parse(req.body);
    if (isEmpty(parsedRequestBody)) throw new Error('Dado inválido');

    const currentUserById = await getUserRepository(id);
    if (isEmpty(currentUserById)) throw new Error('Usuário não encontrado');

    const hashedPassword = await bcrypt.compare(
      parsedRequestBody.newPassword,
      currentUserById.password,
    );
    if (hashedPassword) throw new Error('Essa é sua senha atual!');

    const repositoryRequest = await putPasswordUserRepository({ data: parsedRequestBody, id });

    res
      .status(HttpStatus.OK)
      .send({ message: `A senha de ${repositoryRequest.name} foi atualizado com sucesso` });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
