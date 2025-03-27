import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

export function verifyToken(token: string): { id: string; email: string } | null {
  try {
    return jwt.verify(token, SECRET_KEY) as { id: string; email: string };
  } catch (error) {
    console.error('Erro ao verificar o token:', error);
    return null;
  }
}
