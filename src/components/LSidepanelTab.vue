<template>
  <div class="sidepanel-tab-content" :data-tab-content="`tab-${link}`">
    <component :is="level" v-if="!!heading">
      {{ heading }}
    </component>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { toRefs } from 'vue';

  const props = withDefaults(
    defineProps<{
      link: number | string;
      level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      heading?: string;
    }>(),
    {
      level: 'h3',
      heading: undefined,
    }
  );
  const { link, level, heading } = toRefs(props);
</script>
