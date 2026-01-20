import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';
import { isEmpty } from 'lodash';

import { HttpStatus } from '@/constants';
import { prisma } from '@/database';
import { unauthorizedException } from '@/exception';
import type { UserInfertypeSchema} from '@/schemas';
import { UserSchema } from '@/schemas';

import { getUserByEmail } from '../login';

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

    res.status(HttpStatus.OK).send({
      message: `Usuário ${repositoryRequest.name} criado com sucesso`,
      data: null,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: unauthorizedException(error) });
  }
}
