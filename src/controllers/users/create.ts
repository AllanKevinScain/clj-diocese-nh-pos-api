import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { UserInfertypeSchema, UserSchema } from '../../schemas';
import { isEmpty } from 'lodash';
import { unauthorizedException } from '../../exception';
import { getUserByEmail } from '../login';
import bcrypt from 'bcryptjs';

async function createUserRepository(params: UserInfertypeSchema) {
  const hashedPassword = await bcrypt.hash(params.password, 10);

  const prismaRequest = await prisma.user.create({
    data: { ...params, password: hashedPassword },
  });

  return prismaRequest;
}

export async function createUserController(req: Request, res: Response) {
  try {
    const parsedRequest = UserSchema.parse(req.body);
    const userByEmail = await getUserByEmail(parsedRequest.email);

    if (!isEmpty(userByEmail)) throw new Error('Este email já foi cadastrado');

    const repositoryRequest = await createUserRepository(parsedRequest);

    res
      .status(HttpStatus.OK)
      .send({ message: `Usuário ${repositoryRequest.name} criado com sucesso` });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: unauthorizedException(error) });
  }
}
