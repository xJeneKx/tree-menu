import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { MenuItem } from '@/types/menu.ts';
import { convertLinkToKey } from '@/utils/convertLinkToKey.ts';
import { findKeysPath } from '@/utils/findKeysPath.ts';

export const useMenuState = (menuItems: MenuItem[]) => {
  const route = useRoute();
  const router = useRouter();

  const openedKeys = ref<Record<string, boolean>>({});
  const activeKey = ref<string | null>(null);

  function handleValidLink(link: string): void {
    const key = convertLinkToKey(link);
    activeKey.value = key;

    const keys = findKeysPath(menuItems, key);
    if (keys.length) {
      keys.forEach((pathKey: string) => {
        openedKeys.value[pathKey] = true;
      });
    }
  }

  function redirectToFirstItem(): void {
    const firstElement = menuItems[0];
    if (firstElement) {
      router.replace({ name: 'home', params: { link: firstElement.link } });
    }
  }

  watch(
    () => route.params.link,
    (link) => {
      if (typeof link === 'string' && link !== '') {
        handleValidLink(link);
        return;
      }

      redirectToFirstItem();
    },
    { immediate: true },
  );

  return {
    openedKeys,
    activeKey,
  };
};
