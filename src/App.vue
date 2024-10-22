<script setup >
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const layout = computed(() => {
  const layout = route?.meta?.layout;
  return layout ? layout : "div";
});
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>