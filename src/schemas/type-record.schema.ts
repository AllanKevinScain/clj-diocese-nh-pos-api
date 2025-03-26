import { z } from 'zod';

export const TypeOfRecordSchema = z.object({
  typeOfRecord: z.enum(['POSl', 'POSll', 'WORK', 'COUPLE_WORK']),
});
