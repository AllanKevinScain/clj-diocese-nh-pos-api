import { z } from 'zod';

export const IdsSchema = z.object({
  ids: z.array(z.string().uuid()),
});
