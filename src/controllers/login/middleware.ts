import { isEmpty } from 'lodash';
import { TokenSchema } from '../../schemas';
import { verifyToken } from './verify-token';
import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../constants';
import { unauthorizedException } from '../../exception';

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
