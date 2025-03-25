import { ZodError } from 'zod';

export function unauthorizedException(error: unknown) {
  const zodError = error instanceof ZodError;
  if (zodError.valueOf()) {
    const { issues } = error as ZodError;
    return issues;
  }

  return error instanceof Error ? error.message : 'Erro desconhecido';
}
