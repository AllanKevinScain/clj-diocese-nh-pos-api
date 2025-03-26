export type RecordTypes = 'POSl' | 'POSll' | 'WORK' | 'COUPLE_WORK';
type RecordKeys = 'posl' | 'posll' | 'work' | 'couple';

export const RecordCourses: Record<RecordKeys, RecordTypes> = {
  posl: 'POSl',
  posll: 'POSll',
  work: 'WORK',
  couple: 'COUPLE_WORK',
};
