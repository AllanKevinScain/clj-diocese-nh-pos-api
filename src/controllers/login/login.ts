import { prisma } from '../../database';
import { Request, Response } from 'express';
import { LoginSchema } from '../../schemas';
import { isEmpty } from 'lodash';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { HttpStatus } from '../../constants';
import { unauthorizedException } from '../../exception';
import dayjs from 'dayjs';

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

export async function getUserByEmail(email: string) {
  const prismaRequest = await prisma.user.findUnique({
    where: { email },
  });

  return prismaRequest;
}

export async function loginController(req: Request, res: Response) {
  try {
    const parsedRequest = LoginSchema.parse(req.body);
    const user = await getUserByEmail(parsedRequest.email);

    const { email, password } = parsedRequest;
    if (isEmpty(email) || isEmpty(password)) throw new Error('E-mail e senha são obrigatórios');

    if (!user) throw new Error('Credenciais inválidas');

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new Error('Credenciais inválidas');

    const token = jwt.sign({ ...user }, SECRET_KEY, { expiresIn: '1h' });

    await prisma.refreshToken.deleteMany({
      where: { userId: user.id },
    });

    const expiresIn = dayjs().add(7, 'days').unix();

    const refreshToken = await prisma.refreshToken.create({
      data: {
        userId: user.id,
        expiresIn,
        token,
      },
    });

    res.status(HttpStatus.OK).send({
      accessToken: token,
      refreshToken: refreshToken.id,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
