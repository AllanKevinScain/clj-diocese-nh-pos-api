import { isEmpty } from 'lodash';
import { TokenSchema } from '../../schemas';
import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../constants';
import { unauthorizedException } from '../../exception';

import jwt from 'jsonwebtoken';
import { LoginType } from '../../types';

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

interface VerifyTokenResponse {
  id: string;
  email: string;
  loginType: LoginType;
}

function verifyRole(token: string): VerifyTokenResponse | null {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as VerifyTokenResponse;
    return decoded;
  } catch (error) {
    throw error;
  }
}

export function roleMiddleware(allowedRoles: LoginType[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenHeader = req.headers.authorization?.split(' ')[1];
      const { token } = TokenSchema.parse({ token: tokenHeader });

      if (isEmpty(token)) {
        throw new Error('Token não informado');
      }

      const user = verifyRole(token);

      if (isEmpty(user) || !allowedRoles.includes(user.loginType)) {
        throw new Error('Acesso negado');
      }

      next();
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
    }
  };
}
