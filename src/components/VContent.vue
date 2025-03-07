<script setup lang="ts">
import { computed } from 'vue';
import type { Contents } from '@/types/contents.ts';

interface Props {
  rawContents: Contents;
  activeKey: string | null;
}

const { rawContents, activeKey } = defineProps<Props>();
const title = computed(() => {
  if (activeKey && rawContents?.pages[activeKey]) {
    return rawContents.pages[activeKey].name;
  }

  return 'Title';
});
</script>

<template>
  <article :class="$style.contentContainer">
    <h1 :class="$style.title">{{ title }}</h1>
    <div :class="$style.content">
      <p v-for="i in 10" :key="i">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla sem, cursus quis
        ante in, pretium gravida velit. Integer eget lacus vitae nisl suscipit iaculis vel id nunc.
        Phasellus tincidunt dignissim est eget laoreet. Pellentesque non tristique magna, eu aliquam
        diam. Etiam venenatis non justo id pretium. Vivamus ut mi eu urna viverra viverra sit amet
        ac metus. Vivamus euismod ex mi, in iaculis ante semper eu. Proin in commodo erat. Ut leo
        ipsum, viverra sed elit vitae, dictum eleifend lacus. Morbi vel faucibus leo. Etiam et
        finibus urna, id dignissim est. Aliquam erat volutpat. Vivamus cursus massa vel nunc
        egestas, vitae auctor urna luctus. Pellentesque nec erat sit amet lacus aliquam aliquet et
        eget nisi. Nullam laoreet ultrices urna nec convallis. Nullam neque quam, bibendum sed
        pellentesque at, mollis in lacus.
      </p>
    </div>
  </article>
</template>

<style lang="scss" module>
.contentContainer {
  padding: var(--content-padding);

  .title {
    font-size: 24px;
    font-weight: bold;
  }

  .content {
    font-size: 14px;
    line-height: 1.5;
  }
}
</style>
