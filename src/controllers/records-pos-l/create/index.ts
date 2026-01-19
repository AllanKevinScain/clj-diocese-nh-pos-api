import type { Request, Response } from 'express';

import { HttpStatus } from '@/constants';
import { getLoginInfo, handleZodError } from '@/helpers';
import { candidatePoslSchema, RecordCoupleSchema, RecordSchema, RecordWorkSchema } from '@/schemas';
import type { RecordType } from '@/types';

import { createCoupleRepository, createWorkRepository } from '../../record-work';
import { createRecordPOSlRepository } from './candidate';
import type { ChooseEntityCreateRecordInterface } from './create.type';

async function chooseEntityCreateRecord(props: ChooseEntityCreateRecordInterface) {
  const { dtoType, ...rest } = props;

  if (dtoType === 'WORK') return createWorkRepository(rest);
  if (dtoType === 'COUPLE_WORK') return createCoupleRepository(rest);

  return createRecordPOSlRepository(rest);
}

export async function createRecordPoslController(req: Request, res: Response) {
  try {
    const userRequisitor = getLoginInfo(req);
    if (userRequisitor === null) throw Error('Requisição de usuário nao identificado!');

    const parsedRecordRequest = RecordSchema.parse(req.body);
    let dto: unknown = {};
    let dtoType: RecordType = 'POSl';

    if (parsedRecordRequest.isWork) {
      dto = RecordWorkSchema.parse(req.body);
      dtoType = 'WORK';
    } else if (parsedRecordRequest.isCoupleWork) {
      dto = RecordCoupleSchema.parse(req.body);
      dtoType = 'COUPLE_WORK';
    } else {
      dto = candidatePoslSchema.parse(req.body);
    }

    const repositoryRequest = await chooseEntityCreateRecord({
      createdById: userRequisitor?.id,
      dto: { ...(dto as {}), typeOfRecord: 'POSl' },
      dtoType,
    });

    res
      .status(HttpStatus.OK)
      .send({ message: 'Ficha criada com sucesso!', data: repositoryRequest });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
