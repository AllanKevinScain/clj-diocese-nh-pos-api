import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash';

import { HttpStatus } from '@/constants';
import { unauthorizedException } from '@/exception';
import { TokenSchema } from '@/schemas';
import type { LoginType } from '@/types';

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

interface VerifyTokenResponse {
  id: string;
  email: string;
  loginType: LoginType;
}

function verifyToken(token: string): VerifyTokenResponse | null {
  return jwt.verify(token, SECRET_KEY) as VerifyTokenResponse;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const tokenHeader = req.headers.authorization?.split(' ')[1];

    const { token } = TokenSchema.parse({ token: tokenHeader });

    if (isEmpty(token)) throw new Error('Token não fornecido');

    const decoded = verifyToken(token);

    if (!decoded) throw new Error('Token inválido ou expirado');

    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}

export function authMiddlewareSpecial(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'];
    if (isEmpty(authHeader)) throw new Error('Credenciais não fornecidas');

    if (authHeader) {
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');

      const [username, password] = credentials.split(':');
      if (username === process.env.DEV_USER && password === process.env.DEV_PASSWORD) {
        next();
      } else {
        throw new Error('Credenciais inválidas');
      }
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
