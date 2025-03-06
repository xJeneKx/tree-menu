<script setup lang="ts">
import { computed } from 'vue';

import type { MenuItem } from '@/types/menu';
import VMenuTree from '@/components/VMenuTree.vue';
import VLoader from '@/components/icons/VLoader.vue';
import { useMenuSearch } from '@/composables/useMenuSearch';
import { useMenuState } from '@/composables/useMenuState.ts';

const props = defineProps<{
  menu: MenuItem[];
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

    <article :class="$style.contentContainer">
      <h1 :class="$style.title">Title</h1>
      <div :class="$style.content">
        <p v-for="i in 10" :key="i">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla sem, cursus quis
          ante in, pretium gravida velit. Integer eget lacus vitae nisl suscipit iaculis vel id
          nunc. Phasellus tincidunt dignissim est eget laoreet. Pellentesque non tristique magna, eu
          aliquam diam. Etiam venenatis non justo id pretium. Vivamus ut mi eu urna viverra viverra
          sit amet ac metus. Vivamus euismod ex mi, in iaculis ante semper eu. Proin in commodo
          erat. Ut leo ipsum, viverra sed elit vitae, dictum eleifend lacus. Morbi vel faucibus leo.
          Etiam et finibus urna, id dignissim est. Aliquam erat volutpat. Vivamus cursus massa vel
          nunc egestas, vitae auctor urna luctus. Pellentesque nec erat sit amet lacus aliquam
          aliquet et eget nisi. Nullam laoreet ultrices urna nec convallis. Nullam neque quam,
          bibendum sed pellentesque at, mollis in lacus.
        </p>
      </div>
    </article>
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

.contentContainer {
  padding: var(--content-padding);
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.content {
  font-size: 14px;
  line-height: 1.5;
}
</style>
