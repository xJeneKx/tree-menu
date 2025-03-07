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

  // just for title
  const rawContents: Ref<Contents> = ref({ pages: {}, rootLevelKeys: [] });

  async function getDataForMenu() {
    status.value = 'pending';

    try {
      const contents: Contents = await getContents();
      menu.value = convertContentsToMenu(contents);
      status.value = 'success';
      rawContents.value = contents;
    } catch (error) {
      status.value = 'error';
      if (error instanceof Error) {
        errorMessage.value = error.message;
      }
    }
  }

  onMounted(() => {
    getDataForMenu();
  });

  return {
    menu,
    status,
    errorMessage,
    rawContents,
  };
};
