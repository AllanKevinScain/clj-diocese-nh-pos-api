import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  loginType: z.enum(['admin', 'manager', 'builder-manager']),
  name: z.string(),
  coName: z.string().nullish(),
  city: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const UserPasswordSchema = UserSchema.pick({ password: true }).extend({
  newPassword: z.string(),
});

export type UserPasswordInfertypeSchema = z.infer<typeof UserPasswordSchema>;
export type UserInfertypeSchema = z.infer<typeof UserSchema>;
