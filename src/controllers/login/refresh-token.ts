import { Request, Response } from 'express';
import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { unauthorizedException } from '../../exception';
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

export async function refreshTokenController(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;

    const refreshTokenExists = await prisma.refreshToken.findFirst({
      where: { id: refreshToken },
    });

    if (!refreshTokenExists) throw new Error('Refresh token inválido');

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshTokenExists.expiresIn));

    const user = await prisma.user.findUnique({
      where: { id: refreshTokenExists.userId },
    });

    if (!user) throw new Error('Usuário não encontrado');

    const token = jwt.sign({ ...user }, SECRET_KEY, { expiresIn: '1h' });

    if (refreshTokenExpired) {
      await prisma.refreshToken.deleteMany({
        where: { userId: refreshTokenExists.userId },
      });

      const expiresIn = dayjs().add(7, 'days').unix();

      const newRefreshToken = await prisma.refreshToken.create({
        data: {
          userId: refreshTokenExists.userId,
          expiresIn,
          token,
        },
      });

      res.status(HttpStatus.OK).send({
        accessToken: token,
        refreshToken: newRefreshToken.id,
      });
    } else {
      res.status(HttpStatus.OK).send({
        accessToken: token,
        refreshToken: refreshToken.id,
      });
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
