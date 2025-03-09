import { ref, onMounted, type Ref } from 'vue';

import { getContents } from '@/api/contents.ts';
import type { Contents } from '@/types/contents.ts';
import type { MenuItem } from '@/types/menu';
import { convertContentsToMenu } from '@/utils/contentsToMenu.ts';

type IStatus = 'pending' | 'success' | 'error';

export const useMenu = () => {
  const menu: Ref<MenuItem[]> = ref([]);
  const status: Ref<IStatus> = ref('pending');
  const errorMessage: Ref<string> = ref('');

  // just for title
  const rawContents: Ref<Contents> = ref({ pages: {}, rootLevelKeys: [] });

  async function fetchAndProcessContents(): Promise<Contents> {
    const contents = await getContents();
    rawContents.value = contents;
    menu.value = convertContentsToMenu(contents);
    return contents;
  }

  function handleError(error: unknown): void {
    status.value = 'error';
    if (error instanceof Error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = 'Unknown error';
    }
  }

  async function initDataForMenu() {
    try {
      status.value = 'pending';
      errorMessage.value = '';

      await fetchAndProcessContents();

      status.value = 'success';
    } catch (error) {
      handleError(error);
    }
  }

  onMounted(() => {
    initDataForMenu();
  });

  return {
    menu,
    status,
    errorMessage,
    rawContents,
  };
};
