import { HttpStatus } from '../../constants';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { unauthorizedException } from '../../exception';
import { IdSchema } from '../../schemas';
import { getCourseById } from '../../services-helpers';

export async function getCourseController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);

    const repositoryRequest = await getCourseById(id);
    if (isEmpty(repositoryRequest)) throw new Error('Curso não encontrado!');

    const endDate = new Date(repositoryRequest.endDate);
    const now = new Date();
    if (now > endDate) throw new Error('Esse curso já finalizou!');

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: unauthorizedException(error) });
  }
}
