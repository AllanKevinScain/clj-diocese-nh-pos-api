import { RecordType } from '../../../types';
import { RecordWorkPutInterface } from '../../record-work';

export interface ChooseEntityPutRecordInterface extends RecordWorkPutInterface {
  dtoType: RecordType;
}
