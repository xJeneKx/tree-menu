<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { MenuItem } from '@/types/menu.ts';
import VToggleTree from '@/components/tree/VToggleTree.vue';

defineProps<{
  menuItems: MenuItem[];
  isSearching: boolean;
  activeKey: string | null;
}>();

const openedKeys = defineModel<Record<string, boolean>>('openedKeys', {
  default: {},
});

function toggleOpen(key: string) {
  openedKeys.value[key] = !openedKeys.value[key];
}
</script>

<template>
  <div v-for="item in menuItems" :key="item.key">
    <div
      :class="{ [$style.menuItem]: true, [$style[`lvl${item.level}`]]: item.level }"
      data-testid="menu-item"
    >
      <VToggleTree
        :class="$style.menuIcon"
        :enabled="item.children.length > 0"
        :isOpen="isSearching || !!openedKeys[item.key]"
        :width="14"
        @click="toggleOpen(item.key)"
      />
      <RouterLink
        :class="{ [$style.link]: true, [$style.link_active]: activeKey === item.key }"
        :to="item.link"
        @click="toggleOpen(item.key)"
        data-testid="menu-link"
        :data-active="activeKey === item.key"
      >
        {{ item.name }}
      </RouterLink>
    </div>
    <div v-if="item.children.length > 0 && (isSearching || !!openedKeys[item.key])">
      <VMenuTree
        :menu-items="item.children"
        :is-searching="isSearching"
        :active-key="activeKey"
        v-model:openedKeys="openedKeys"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
.menuItem {
  display: flex;
  padding: 8px 4px;
}

.menuIcon {
  cursor: pointer;
  flex-shrink: 0;
  padding: 2px 0;
}

.menuItem svg:hover {
  color: var(--link-hover);
}

.link {
  margin-left: 4px;
  text-decoration: none;
  color: var(--link);
}

.link:hover {
  color: var(--link-hover);
}

.link_active {
  color: var(--link-active);
}

@for $i from 1 through 6 {
  .lvl#{$i} {
    margin-left: #{16 * $i}px;
  }
}
</style>
