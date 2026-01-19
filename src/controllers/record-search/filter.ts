import type { Prisma } from '@prisma/client';
import type { Request } from 'express';
import z from 'zod';

import { RecordSchema } from '@/schemas';

import { searchRecords } from './search';

const filterParamsSchema = RecordSchema.pick({
  candidateName: true,
  nickname: true,
  birthDate: true,
  candidatePhone: true,
  parishChapel: true,
  courseNumber: true,
  recordNumber: true,
}).merge(
  z.object({
    typeOfRecord: z
      .union([z.enum(['POSl', 'POSll', 'POSlll']), z.array(z.enum(['POSl', 'POSll', 'POSlll']))])
      .nullish(),
  }),
);

export function filterRecords(req: Request) {
  const filters = filterParamsSchema.partial().parse(req.query);

  const OR = searchRecords(req);

  const where: Prisma.RecordEntityWhereInput = {};

  if (filters.courseNumber !== undefined) {
    where.courseNumber = { contains: filters.courseNumber, mode: 'insensitive' };
  }

  if (filters.recordNumber !== undefined) {
    where.recordNumber = { contains: filters.recordNumber, mode: 'insensitive' };
  }

  if (filters.candidateName !== undefined) {
    where.candidateName = { contains: filters.candidateName, mode: 'insensitive' };
  }

  if (filters.nickname !== undefined) {
    where.nickname = { contains: filters.nickname, mode: 'insensitive' };
  }

  if (filters.birthDate !== undefined) {
    where.birthDate = { contains: filters.birthDate, mode: 'insensitive' };
  }

  if (filters.candidatePhone !== undefined) {
    where.candidatePhone = { contains: filters.candidatePhone, mode: 'insensitive' };
  }

  if (filters.parishChapel !== undefined) {
    where.parishChapel = { contains: filters.parishChapel, mode: 'insensitive' };
  }

  if (filters.typeOfRecord !== undefined && filters.typeOfRecord !== null) {
    if (Array.isArray(filters.typeOfRecord)) {
      where.typeOfRecord = { in: filters.typeOfRecord };
    } else {
      where.typeOfRecord = { equals: filters.typeOfRecord };
    }
  }

  return { ...where, OR };
}
