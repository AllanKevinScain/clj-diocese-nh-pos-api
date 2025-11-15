import type { ZodError } from 'zod';
import { isEmpty } from 'lodash';

export function handleZodError(error: unknown) {
  console.log('🚀 ~ handleZodError ~ error:', error);
  if (error) {
    const zodError = error as ZodError;
    const { issues } = zodError;

    if (!isEmpty(issues)) {
      const errorMessages = issues.map((issue) => {
        const fieldPath = issue.path.join('.') || 'campo desconhecido';

        console.log('🚀 ~ issues ~ zodError:', zodError);
        return `Erro no campo '${fieldPath}': ${issue.message}.`;
      });

      const detailedMessage = errorMessages.join(' ');

      console.log('🚀 ~ detailedMessage ~ zodError:', zodError);
      return `Erro de validação: ${detailedMessage}`;
    }
  }

  console.log('🚀 ~ error:', error);
  return error ?? 'Erro desconhecido de validação.';
}
