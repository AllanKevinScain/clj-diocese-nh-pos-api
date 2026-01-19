import { prisma } from '@/database';

export async function getCourseById(id: string) {
  const prismaRequest = await prisma.course.findUnique({
    where: { id },
  });

  return prismaRequest;
}
