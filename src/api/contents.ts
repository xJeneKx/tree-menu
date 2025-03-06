export const getContents = async () => {
  const response = await fetch(import.meta.env.VITE_SOURCE_FOR_MENU);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};
