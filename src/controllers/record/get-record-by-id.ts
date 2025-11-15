import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { IdSchema } from '../../schemas';
import { getRecordById } from '../../services-helpers';
import { isEmpty } from 'lodash';

export async function getRecordByIdController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);
    const repositoryRequest = await getRecordById(id);

    if (isEmpty(repositoryRequest)) {
      res.status(HttpStatus.NO_CONTENT).send();
    } else {
      res.status(HttpStatus.OK).send(repositoryRequest);
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
