<script setup lang="ts">
import VRightIcon from '@/components/icons/VRightIcon.vue';
defineProps({
  enabled: {
    type: Boolean,
    default: false,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 16,
  },
});
</script>

<template>
  <VRightIcon
    v-if="enabled"
    :width="width"
    :class="{ [$style.icon]: true, [$style.iconOpen]: isOpen }"
  />
  <div v-else :class="$style.emptyBlock" :style="{ width: `${width}px` }"></div>
</template>

<style module>
.icon {
  transition: transform 0.2s ease-in-out;
}

.iconOpen {
  transform: rotate(90deg);
}

.emptyBlock {
  display: inline-block;
}
</style>
