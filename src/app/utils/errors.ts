import axios from 'axios';

export default function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (axios.isAxiosError(error)) {
    const resError = error.response?.data;
    if (!resError) return error.message;
    return String(resError);
  }
  if (error instanceof Error) return error.message;
  return 'Error desconocido';
}
