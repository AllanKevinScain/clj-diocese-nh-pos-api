import { ZodError } from 'zod';

export function unauthorizedException(error: unknown) {
  console.log('🚀 ~ ', error);
  const zodError = error instanceof ZodError;
  if (zodError.valueOf()) {
    const { issues } = error as ZodError;
    const joinedIssues = issues.map((issue) => issue.path).join(', ');
    return `Os campos (${joinedIssues}) estão inválidos, ou não foram preenchidos`;
  }

  return error instanceof Error ? error.message : 'Erro desconhecido';
}
