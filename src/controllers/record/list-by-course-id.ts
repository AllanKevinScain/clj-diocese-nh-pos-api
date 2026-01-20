import type { Request, Response } from 'express';
import { isEmpty } from 'lodash';

import { HttpStatus } from '@/constants';
import { handleZodError } from '@/helpers';
import { IdSchema } from '@/schemas';
import { getCourseById, listRecordsByCourseNumber } from '@/services-helpers';

export async function listRecordByCourseIdController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);

    const courseRepositoryRequest = await getCourseById(id);
    if (isEmpty(courseRepositoryRequest)) throw Error('Esse curso não existe!');

    const repositoryRequest = await listRecordsByCourseNumber(courseRepositoryRequest.courseNumber);

    if (isEmpty(repositoryRequest)) {
      res.status(HttpStatus.NO_CONTENT).send();
    } else {
      res.status(HttpStatus.OK).send(repositoryRequest);
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
