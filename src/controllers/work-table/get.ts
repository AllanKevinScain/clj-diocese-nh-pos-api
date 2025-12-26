import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { CourseIdSchema } from '../../schemas';

async function getWorkTableRepository(courseId: string) {
  const prismaRequest = await prisma.workTableEntity.findUnique({
    where: { courseId },
    include: {
      kitchenRecords: true,
      communities: {
        include: {
          members: true,
        },
      },
    },
  });

  if (prismaRequest !== null) {
    const { kitchenRecords, ...restPrismaRequest } = prismaRequest;

    const cleanWorkRecords = kitchenRecords
      .filter((item) => item.office === 'cleanWork')
      .map((item) => item.recordId);
    const copeWorkRecords = kitchenRecords
      .filter((item) => item.office === 'copeWork')
      .map((item) => item.recordId);
    const kitchenWorkRecords = kitchenRecords
      .filter((item) => item.office === 'kitchenWork')
      .map((item) => item.recordId);

    return {
      ...restPrismaRequest,
      cleanWorkRecords,
      copeWorkRecords,
      kitchenWorkRecords,
    };
  }

  return prismaRequest;
}

export async function getWorkTableController(req: Request, res: Response) {
  try {
    const { courseId } = CourseIdSchema.parse(req.params);
    const repositoryRequest = await getWorkTableRepository(courseId);

    if (repositoryRequest === null) {
      res.status(HttpStatus.NO_CONTENT).send(repositoryRequest);
    } else {
      res.status(HttpStatus.OK).send(repositoryRequest);
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
