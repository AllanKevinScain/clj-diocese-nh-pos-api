import { z } from 'zod';

export const communityMemberSchema = z.object({
  communityId: z.string().uuid(),
  recordId: z.string().uuid(),
});

export const communitySchema = z.object({
  id: z.string().uuid().nullish(),
  number: z.string(),
  workTableId: z.string().uuid().nullish(),
  members: z.array(communityMemberSchema),
});

export const workTableSchema = z.object({
  id: z.string().uuid().nullish(),
  courseId: z.string(),

  auxiliarLiturgy: z.string().uuid().nullish(),
  auxiliarSecretary: z.string().uuid().nullish(),
  bar: z.string().uuid().nullish(),
  coupleSafeToBe: z.string().uuid().nullish(),
  folkloreCoordinator: z.string().uuid().nullish(),

  cleanWorkRecords: z.array(z.string().uuid()).default([]),
  copeWorkRecords: z.array(z.string().uuid()).default([]),
  kitchenWorkRecords: z.array(z.string().uuid()).default([]),

  communities: z.array(communitySchema).default([]),
});

export type WorkTableInfertypeSchema = z.infer<typeof workTableSchema>;
