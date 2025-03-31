import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { unauthorizedException } from '../../exception';
import { CourseSchema } from '../../schemas';

type CourseInfertypeSchema = z.infer<typeof CourseSchema>;

async function createCourseRepository(params: CourseInfertypeSchema) {
  const prismaRequest = await prisma.course.create({
    data: { ...params },
  });

  return prismaRequest;
}

export async function createCourseController(req: Request, res: Response) {
  try {
    const parsedRequest = CourseSchema.parse(req.body);
    const repositoryRequest = await createCourseRepository(parsedRequest);

    res
      .status(HttpStatus.OK)
      .send({ message: `Curso ${repositoryRequest.courseNumber} criado com sucesso!` });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: unauthorizedException(error) });
  }
}
