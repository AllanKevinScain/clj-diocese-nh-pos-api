import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { RecordSchema } from '../../schemas';
import { searchRecords } from './search';
import z from 'zod';

const numberType = z.object({
  courseNumber: z.coerce.number(),
  recordNumber: z.coerce.number(),
});

const filterParamsSchema = RecordSchema.pick({
  parishAcronym: true,
  candidateName: true,
  nickname: true,
  birthDate: true,
  candidatePhone: true,
  instagram: true,
  priest: true,
  parishChapel: true,
}).merge(numberType);

export function filterRecords(req: Request) {
  const filters = filterParamsSchema.partial().parse(req.query);

  const OR = searchRecords(req);

  const where: Prisma.RecordWhereInput = {};

  if (filters.courseNumber !== undefined) {
    const num = Number(filters.courseNumber);
    if (!isNaN(num)) {
      where.courseNumber = num;
    }
  }

  if (filters.recordNumber !== undefined) {
    const num = Number(filters.recordNumber);
    if (!isNaN(num)) {
      where.recordNumber = num;
    }
  }

  if (filters.parishAcronym !== undefined) {
    where.parishAcronym = { contains: filters.parishAcronym, mode: 'insensitive' };
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

  if (filters.instagram !== undefined) {
    where.instagram = { contains: filters.instagram, mode: 'insensitive' };
  }

  if (filters.priest !== undefined) {
    where.priest = { contains: filters.priest, mode: 'insensitive' };
  }

  if (filters.parishChapel !== undefined) {
    where.parishChapel = { contains: filters.parishChapel, mode: 'insensitive' };
  }

  return { ...where, OR };
}
