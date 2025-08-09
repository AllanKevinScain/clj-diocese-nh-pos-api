import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { RecordSchema } from '../../schemas';
import { searchRecords } from './search';

const filterParamsSchema = RecordSchema.pick({
  parishAcronym: true,
  candidateName: true,
  nickname: true,
  birthDate: true,
  candidatePhone: true,
  instagram: true,
  priest: true,
  parishChapel: true,
  courseNumber: true,
  recordNumber: true,
});

export function filterRecords(req: Request) {
  const filters = filterParamsSchema.partial().parse(req.query);

  const OR = searchRecords(req);

  const where: Prisma.RecordWhereInput = {};

  if (filters.courseNumber !== undefined) {
    where.courseNumber = { contains: filters.courseNumber, mode: 'insensitive' };
  }

  if (filters.recordNumber !== undefined) {
    where.recordNumber = { contains: filters.recordNumber, mode: 'insensitive' };
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
