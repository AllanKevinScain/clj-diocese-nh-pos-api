export function parseDateToString(dateString: string): string {
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0];
  }
  throw new Error('Data inválida');
}
