<script setup lang="ts">
import { computed } from 'vue';

import type { MenuItem } from '@/types/menu';
import type { Contents } from '@/types/contents';
import VMenuTree from '@/components/tree/VMenuTree.vue';
import VLoader from '@/components/icons/VLoader.vue';
import VContent from '@/components/VContent.vue';
import { useMenuSearch } from '@/composables/useMenuSearch';
import { useMenuState } from '@/composables/useMenuState.ts';

const props = defineProps<{
  menu: MenuItem[];
  rawContents: Contents;
}>();

const { openedKeys, activeKey } = useMenuState(props.menu);
const { searchInput, filteredMenuItems, isPendingSearch } = useMenuSearch(props.menu);

const isSearching = computed(() => searchInput.value !== '');
const menuItems = computed(() => {
  return searchInput.value !== '' ? filteredMenuItems.value : props.menu;
});
</script>

<template>
  <main :class="$style.wrapper">
    <aside :class="$style.menuWrapper">
      <div :class="$style.searchContainer">
        <input v-model="searchInput" placeholder="Search in the menu" :class="$style.searchInput" />
      </div>

      <div :class="$style.menuContainer">
        <template v-if="isSearching">
          <div v-if="isPendingSearch" :class="$style.searchStatus">
            <VLoader :width="42" />
          </div>
          <div v-else-if="filteredMenuItems.length === 0" :class="$style.searchStatus">
            Nothing was found
          </div>
        </template>

        <VMenuTree
          v-if="!isPendingSearch"
          :menu-items="menuItems"
          :is-searching="isSearching"
          :active-key="activeKey"
          v-model:openedKeys="openedKeys"
        />
      </div>
    </aside>

    <VContent :active-key="activeKey" :raw-contents="rawContents" />
  </main>
</template>

<style lang="scss" module>
.wrapper {
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: var(--menu-width) 1fr;
}

.menuWrapper {
  font-size: 14px;
  position: sticky;
  block-size: 100vh;
  top: 0;
  border-right: var(--menu-border);
}

.menuContainer {
  height: calc(100vh - var(--search-height));
  overflow: auto;
}

.searchContainer {
  padding: 8px 16px;
  height: var(--search-height);
  box-sizing: border-box;
}

.searchInput {
  border: 0;
  width: 100%;
  font-size: 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  height: 32px;
  outline: none;

  &:focus {
    border-bottom-color: #333;
  }
}

.searchStatus {
  padding: 8px 16px;
  text-align: center;
}
</style>
