import type { Request } from 'express';
import jwt from 'jsonwebtoken';

import type { LoginType } from '@/types';

interface TokenPayload {
  id: string;
  loginType: LoginType;
}

export function getLoginInfo(req: Request) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return null;

  const token = authHeader.split(' ')[1];

  const payload = jwt.verify(token, process.env.SECRET_KEY!) as TokenPayload;

  return {
    loginType: payload.loginType,
    id: payload.id,
  };
}
