<script setup lang="ts">
import HomeView from '@/views/VHomeView.vue';
import { useMenu } from '@/composables/useMenu';
import VLoader from '@/components/icons/VLoader.vue';

const { menu, status, errorMessage, rawContents } = useMenu();
</script>

<template>
  <div v-if="status === 'pending'" :class="$style.statusBlock">
    <div><VLoader :width="76" /></div>
  </div>
  <div v-else-if="status === 'error'" :class="$style.statusBlock">
    <div :class="$style.errorMessage">Error: {{ errorMessage }}</div>
  </div>

  <HomeView v-else :menu="menu" :raw-contents="rawContents" />
</template>

<style module>
.statusBlock {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.errorMessage {
  font-size: 24px;
}
</style>
