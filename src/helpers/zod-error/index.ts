import type { ZodError } from 'zod';
import { isEmpty } from 'lodash';

export function handleZodError(error: unknown) {
  if (error) {
    const zodError = error as ZodError;
    const { issues } = zodError;

    if (!isEmpty(issues)) {
      const errorMessages = issues.map((issue) => {
        const fieldPath = issue.path.join('.') || 'campo desconhecido';
        return `Erro no campo '${fieldPath}': ${issue.message}.`;
      });

      const detailedMessage = errorMessages.join(' ');

      return `Erro de validação: ${detailedMessage}`;
    }
  }

  return error ?? 'Erro desconhecido de validação.';
}
