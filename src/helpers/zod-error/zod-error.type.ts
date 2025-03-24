import { ZodIssue } from 'zod';

export type ZodErrorPayload = {
  issues: ZodIssue[];
  name: string;
};
