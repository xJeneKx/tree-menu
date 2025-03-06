<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { RouterLink } from 'vue-router';
import type { MenuItem } from '@/types/menu.ts';
import VOpenTree from '@/components/VOpenTree.vue';

defineProps<{ menuItems: MenuItem[]; isSearching: boolean }>();

const openedKeys: Ref<Record<string, boolean>> = ref({});

function toggleOpen(key: string) {
  openedKeys.value[key] = !openedKeys.value[key];
}
</script>

<template>
  <div v-for="item in menuItems" :key="item.key">
    <div :class="{ [$style.menuItem]: true, [$style[`lvl${item.level}`]]: item.level }">
      <VOpenTree
        :class="$style.menuIcon"
        :enabled="item.children.length > 0"
        :isOpen="isSearching || openedKeys[item.key]"
        :width="14"
        @click="toggleOpen(item.key)"
      />
      <RouterLink :class="$style.link" :to="item.link" @click="toggleOpen(item.key)">
        {{ item.name }}
      </RouterLink>
    </div>
    <div v-if="item.children.length > 0 && (isSearching || openedKeys[item.key])">
      <VMenuTree :menu-items="item.children" :is-searching="isSearching" />
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
