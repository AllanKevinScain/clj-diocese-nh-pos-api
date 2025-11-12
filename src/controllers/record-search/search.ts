import { Request } from 'express';
import { Prisma } from '@prisma/client';

export function searchRecords(req: Request): Prisma.RecordEntityWhereInput[] | undefined {
  const { search } = req.query;

  if (typeof search === 'string' && search.trim() !== '') {
    const normalizedSearch = search.trim();
    const or: Prisma.RecordEntityWhereInput[] = [];

    or.push(
      // { parishAcronym: { contains: normalizedSearch, mode: 'insensitive' } },
      { candidateName: { contains: normalizedSearch, mode: 'insensitive' } },
      { nickname: { contains: normalizedSearch, mode: 'insensitive' } },
      { birthDate: { contains: normalizedSearch, mode: 'insensitive' } },
      { candidatePhone: { contains: normalizedSearch, mode: 'insensitive' } },
      // { instagram: { contains: normalizedSearch, mode: 'insensitive' } },
      // { priest: { contains: normalizedSearch, mode: 'insensitive' } },
      { parishChapel: { contains: normalizedSearch, mode: 'insensitive' } },
      { courseNumber: { contains: normalizedSearch, mode: 'insensitive' } },
      { recordNumber: { contains: normalizedSearch, mode: 'insensitive' } },
    );

    return or;
  }

  return undefined;
}
