import type { RecordType } from '@/types';

import type { RecordWorkPutInterface } from '../../record-work';

export interface ChooseEntityPutRecordInterface extends RecordWorkPutInterface {
  dtoType: RecordType;
}
