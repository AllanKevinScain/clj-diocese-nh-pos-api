import { Request, Response } from 'express';
import { ChooseEntityPutRecordInterface } from './put.type';
import { isEmpty } from 'lodash';
import { HttpStatus } from '../../../constants';
import {
  IdSchema,
  RecordCoupleInfertype,
  RecordCoupleSchema,
  candidatePoslllSchema,
  RecordWorkSchema,
} from '../../../schemas';
import { handleZodError } from '../../../helpers';
import { RecordType } from '../../../types';
import { putRecordPoslllRepository } from './candidate';
import { putCoupleRepository, putWorkRepository } from '../../record-work';
import { getRecordById } from '../../../services-helpers';

async function chooseEntityCreateRecord(props: ChooseEntityPutRecordInterface) {
  const { dtoType, ...rest } = props;

  if (dtoType === 'WORK') return putWorkRepository(rest);
  if (dtoType === 'COUPLE_WORK') return putCoupleRepository(rest);

  return putRecordPoslllRepository(rest);
}

export async function putRecordPoslllController(req: Request, res: Response) {
  try {
    if (isEmpty(req.body)) res.status(HttpStatus.BAD_REQUEST).send();

    const { id } = IdSchema.parse(req.params);
    if (!id) throw Error('Identificador não encontrado!');

    const currentRecord = await getRecordById(id);

    let dto: unknown = {};
    let dtoType: RecordType = 'POSlll';

    if (currentRecord?.isWork) {
      dto = RecordWorkSchema.partial().parse(req.body);
      dtoType = 'WORK';
    } else if (currentRecord?.isCoupleWork) {
      dto = RecordCoupleSchema.partial().parse(req.body);
      dtoType = 'COUPLE_WORK';
    } else {
      dto = candidatePoslllSchema.partial().parse(req.body);
    }

    const repositoryRequest = await chooseEntityCreateRecord({ dto, id, dtoType });

    let message = `A ficha de ${repositoryRequest.candidateName} foi atualizada`;

    if (repositoryRequest.isCoupleWork) {
      const auxResponse = repositoryRequest as RecordCoupleInfertype;
      message = `A ficha dos tios ${auxResponse.candidateName} e ${auxResponse.recordCouple.womanName} foi atualizada`;
    }

    res.status(HttpStatus.OK).send({ message, data: repositoryRequest });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
