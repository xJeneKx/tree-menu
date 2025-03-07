import { ref, onMounted, type Ref } from 'vue';
import { getContents } from '@/api/contents.ts';
import { convertContentsToMenu } from '@/utils/contentsToMenu.ts';
import type { Contents } from '@/types/contents.ts';
import type { MenuItem } from '@/types/menu';

type IStatus = 'pending' | 'success' | 'error';

export const useMenu = () => {
  const menu: Ref<MenuItem[]> = ref([]);
  const status: Ref<IStatus> = ref('pending');
  const errorMessage: Ref<string> = ref('');

  async function getDataForMenu() {
    status.value = 'pending';

    try {
      const contents: Contents = await getContents();
      menu.value = convertContentsToMenu(contents);
      status.value = 'success';
    } catch (error) {
      status.value = 'error';
      errorMessage.value = (error as Error).message;
    }
  }

  onMounted(async () => {
    getDataForMenu();
  });

  return {
    menu,
    status,
    errorMessage,
  };
};
