import { prisma } from '../../database';
import { NextFunction, Request, Response } from 'express';
import { LoginSchema } from '../../schemas';
import { isEmpty } from 'lodash';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { HttpStatus } from '../../constants';
import { unauthorizedException } from '../../exception';

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

export async function getUserByEmail(email: string) {
  const prismaRequest = await prisma.user.findMany({
    where: { email },
  });

  return prismaRequest;
}

export async function loginController(req: Request, res: Response) {
  try {
    const parsedRequest = LoginSchema.parse(req.body);
    const userByEmail = await getUserByEmail(parsedRequest.email);

    const { email, password } = parsedRequest;
    if (isEmpty(email) || isEmpty('password')) throw new Error('E-mail e senha são obrigatórios');

    if (isEmpty(userByEmail)) throw new Error('Credenciais inválidas');
    const user = userByEmail[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new Error('Credenciais inválidas');

    const token = jwt.sign(
      { id: user.id, email: user.email, loginType: user.loginType, nome: user.name },
      SECRET_KEY,
      { expiresIn: '1h' },
    );

    res
      .status(HttpStatus.OK)
      .send({
        access_token: token,
        id: user.id,
        email: user.email,
        loginType: user.loginType,
        nome: user.name,
      });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
