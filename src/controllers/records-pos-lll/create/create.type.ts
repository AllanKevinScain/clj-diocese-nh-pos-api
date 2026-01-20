import type { RecordType } from '@/types';

import type { RecordWorkInterface } from '../../record-work';

export interface ChooseEntityCreateRecordInterface extends RecordWorkInterface {
  dtoType: RecordType;
}
