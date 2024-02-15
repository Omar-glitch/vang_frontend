import axios from 'axios';

export default function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (axios.isAxiosError(error))
    return String(error.response?.data) || 'Error con axios';
  if (error instanceof Error) return error.message;
  return 'Error desconocido';
}
