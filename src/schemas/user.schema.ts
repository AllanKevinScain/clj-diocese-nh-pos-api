import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  loginType: z.enum(['admin', 'manager', 'builder-manager']),
  name: z.string(),
  city: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
