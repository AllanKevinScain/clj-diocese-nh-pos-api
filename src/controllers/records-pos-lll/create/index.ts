import { HttpStatus } from '../../../constants';
import { getLoginInfo, handleZodError } from '../../../helpers';
import {
  RecordCoupleSchema,
  candidatePoslllSchema,
  RecordSchema,
  RecordWorkSchema,
} from '../../../schemas';
import { RecordType } from '../../../types';
import { ChooseEntityCreateRecordInterface } from './create.type';
import { Request, Response } from 'express';
import { createRecordPoslllRepository } from './candidate';
import { createCoupleRepository, createWorkRepository } from '../../record-work';

async function chooseEntityCreateRecord(props: ChooseEntityCreateRecordInterface) {
  const { dtoType, ...rest } = props;

  if (dtoType === 'WORK') return createWorkRepository(rest);
  if (dtoType === 'COUPLE_WORK') return createCoupleRepository(rest);

  return createRecordPoslllRepository(rest);
}

export async function createRecordPoslllController(req: Request, res: Response) {
  try {
    const userRequisitor = getLoginInfo(req);
    if (userRequisitor === null) throw Error('Requisição de usuário nao identificado!');

    const parsedRecordRequest = RecordSchema.parse(req.body);
    let dto: unknown = {};
    let dtoType: RecordType = 'POSlll';

    if (parsedRecordRequest.isWork) {
      dto = RecordWorkSchema.parse(req.body);
      dtoType = 'WORK';
    } else if (parsedRecordRequest.isCoupleWork) {
      dto = RecordCoupleSchema.parse(req.body);
      dtoType = 'COUPLE_WORK';
    } else {
      dto = candidatePoslllSchema.parse(req.body);
    }

    const repositoryRequest = await chooseEntityCreateRecord({
      createdById: userRequisitor?.id,
      dto: { ...(dto as {}), typeOfRecord: 'POSlll' },
      dtoType,
    });

    res
      .status(HttpStatus.OK)
      .send({ message: 'Ficha criada com sucesso!', data: repositoryRequest });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
