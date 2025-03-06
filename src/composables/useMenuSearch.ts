import { ref, watch, type Ref } from 'vue';
import debounce from 'lodash.debounce';

import type { MenuItem } from '@/types/menu';
import { filterMenuByName } from '@/utils/filterMenu';

export function useMenuSearch(menuItems: MenuItem[], debounceMs = 300) {
  const searchInput: Ref<string> = ref('');
  const filteredMenuItems: Ref<MenuItem[]> = ref([]);
  const isPendingSearch: Ref<boolean> = ref(false);

  watch(searchInput, (value: string) => {
    isPendingSearch.value = value !== '';

    debounce(() => {
      filteredMenuItems.value = filterMenuByName(menuItems, value);
      isPendingSearch.value = false;
    }, debounceMs)();
  });

  return {
    searchInput,
    filteredMenuItems,
    isPendingSearch,
  };
}
