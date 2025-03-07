import type { Contents } from '@/types/contents';

export const getContents = async (): Promise<Contents> => {
  const response = await fetch(import.meta.env.VITE_SOURCE_FOR_MENU);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
