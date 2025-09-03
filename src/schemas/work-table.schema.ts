import { z } from 'zod';

export const communityMemberSchema = z.string().uuid();

export const communitySchema = z.object({
  id: z.string().uuid().nullish(),
  number: z.string(),
  members: z.array(communityMemberSchema),
});

export const workTableSchema = z.object({
  id: z.string().uuid().nullish(),
  base: z.string().uuid(),
  auxiliar: z.string().uuid(),
  coordinator: z.string().uuid(),
  courseNumber: z.string(),

  auxiliarLiturgy: z.string().uuid().nullish(),
  auxiliarSecretary: z.string().uuid().nullish(),
  bar: z.string().uuid().nullish(),
  coupleKitchenCoordinator: z.string().uuid().nullish(),
  coupleSafeToBe: z.string().uuid().nullish(),
  folkloreCoordinator: z.string().uuid().nullish(),
  kitchenSpiritual: z.string().uuid().nullish(),
  liturgy: z.string().uuid().nullish(),
  secretary: z.string().uuid().nullish(),

  cleanWorkRecords: z.array(z.string().uuid()).default([]),
  copeWorkRecords: z.array(z.string().uuid()).default([]),
  kitchenWorkRecords: z.array(z.string().uuid()).default([]),

  communities: z.array(communitySchema).default([]),
});
