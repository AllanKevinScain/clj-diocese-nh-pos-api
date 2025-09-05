import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { CourseNumberSchema } from '../../schemas';

async function getWorkTableRepository(courseNumber: string) {
  const prismaRequest = await prisma.workTable.findUnique({
    where: { courseNumber },
    include: {
      communities: {
        include: {
          members: true,
        },
      },
    },
  });

  return prismaRequest;
}

export async function getWorkTableController(req: Request, res: Response) {
  try {
    const { courseNumber } = CourseNumberSchema.parse(req.params);
    const repositoryRequest = await getWorkTableRepository(courseNumber);

    if (repositoryRequest === null) {
      res.status(HttpStatus.NO_CONTENT).send(repositoryRequest);
    } else {
      res.status(HttpStatus.OK).send(repositoryRequest);
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
