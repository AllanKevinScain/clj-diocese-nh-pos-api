import { RecordType } from '../../../types';
import { RecordWorkInterface } from '../../record-work';

export interface ChooseEntityCreateRecordInterface extends RecordWorkInterface {
  dtoType: RecordType;
}
