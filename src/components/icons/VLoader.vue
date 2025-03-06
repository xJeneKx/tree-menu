<script setup lang="ts">
defineProps({
  width: {
    type: Number,
    default: 76,
  },
});
</script>

<template>
  <!--
  source: https://www.svgbackgrounds.com/elements/animated-svg-preloaders/
  -->
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="width" viewBox="0 0 200 200">
    <rect fill="#333" stroke="#333" stroke-width="15" width="30" height="30" x="25" y="50">
      <animate
        attributeName="y"
        calcMode="spline"
        dur="2"
        values="50;120;50;"
        keySplines=".5 0 .5 1;.5 0 .5 1"
        repeatCount="indefinite"
        begin="-.4"
      ></animate>
    </rect>
    <rect fill="#333" stroke="#333" stroke-width="15" width="30" height="30" x="85" y="50">
      <animate
        attributeName="y"
        calcMode="spline"
        dur="2"
        values="50;120;50;"
        keySplines=".5 0 .5 1;.5 0 .5 1"
        repeatCount="indefinite"
        begin="-.2"
      ></animate>
    </rect>
    <rect fill="#333" stroke="#333" stroke-width="15" width="30" height="30" x="145" y="50">
      <animate
        attributeName="y"
        calcMode="spline"
        dur="2"
        values="50;120;50;"
        keySplines=".5 0 .5 1;.5 0 .5 1"
        repeatCount="indefinite"
        begin="0"
      ></animate>
    </rect>
  </svg>
</template>
