import { isEmpty } from 'lodash';
import { TokenSchema } from '../../schemas';
import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../constants';
import { unauthorizedException } from '../../exception';

import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

interface VerifyTokenResponse {
  id: string;
  email: string;
  loginType: 'admin' | 'manager';
}

function verifyToken(token: string): VerifyTokenResponse | null {
  try {
    return jwt.verify(token, SECRET_KEY) as VerifyTokenResponse;
  } catch (error) {
    throw error;
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const tokenHeader = req.headers.authorization?.split(' ')[1];

    const { token } = TokenSchema.parse({ token: tokenHeader });

    console.log('🚀 ~ authMiddleware ~ token:', token);
    if (isEmpty(token)) throw new Error('Token não fornecido');

    const decoded = verifyToken(token);

    if (!decoded) throw new Error('Token inválido ou expirado');

    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
