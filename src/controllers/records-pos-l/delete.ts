import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { IdSchema } from '../../schemas';

async function deleteRecordPOSlRepository(id: string) {
  const prismaRequest = await prisma.record.delete({
    where: { id },
  });

  return prismaRequest;
}

export async function deleteRecordPOSlController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);
    const repositoryRequest = await deleteRecordPOSlRepository(id);

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    console.log('🚀 ~ deleteRecordPOSlController ~ error:', error);
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
