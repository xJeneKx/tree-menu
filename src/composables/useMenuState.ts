import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { convertLinkToKey } from '@/utils/convertLinkToKey.ts';
import { findKeysPath } from '@/utils/findKeysPath.ts';
import type { MenuItem } from '@/types/menu.ts';

export const useMenuState = (menuItems: MenuItem[]) => {
  const route = useRoute();
  const router = useRouter();

  const openedKeys = ref<Record<string, boolean>>({});
  const activeKey = ref<string | null>(null);

  watch(
    () => route.params.link,
    (link) => {
      if (typeof link === 'string' && link !== '') {
        const key = convertLinkToKey(link);
        activeKey.value = key;
        const keys = findKeysPath(menuItems, key);
        if (keys.length) {
          keys.forEach((key: string) => {
            openedKeys.value[key] = true;
          });
        }
        return;
      }

      const firstElement = menuItems[0];
      if (firstElement) {
        router.replace({ name: 'home', params: { link: firstElement.link } });
      }
    },
    { immediate: true },
  );

  return {
    openedKeys,
    activeKey,
  };
};
