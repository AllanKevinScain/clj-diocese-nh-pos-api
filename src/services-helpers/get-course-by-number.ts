import { prisma } from '../database';

export async function getCourseByNumber(id: string) {
  const prismaRequest = await prisma.course.findUnique({
    where: { id },
  });

  return prismaRequest;
}
