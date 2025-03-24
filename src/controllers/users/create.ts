import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  loginType: z.enum(['admin', 'manager']),
  name: z.string(),
  city: z.string(),
});

type UserInfertypeSchema = z.infer<typeof UserSchema>;

async function createUserRepository(params: UserInfertypeSchema) {
  const dateString = new Date().toISOString().split('T')[0];

  const prismaRequest = await prisma.user.create({
    data: { ...params, createdAt: dateString, updatedAt: dateString },
  });

  return prismaRequest;
}

export async function createUserController(req: Request, res: Response) {
  try {
    const parsedRequest = UserSchema.parse(req.body);
    const repositoryRequest = await createUserRepository(parsedRequest);

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
('');
