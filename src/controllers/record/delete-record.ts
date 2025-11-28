import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { IdSchema } from '../../schemas';
import { deleteRecordById } from '../../services-helpers';

export async function deleteRecordController(req: Request, res: Response) {
  try {
    const { id } = IdSchema.parse(req.params);
    const repositoryRequest = await deleteRecordById(id);

    res.status(HttpStatus.OK).send({
      message: `Fixa de ${repositoryRequest.candidateName}/${repositoryRequest.id} removida com sucesso!`,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
