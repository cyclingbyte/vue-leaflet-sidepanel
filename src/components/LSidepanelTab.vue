<template>
  <div class="sidepanel-tab-content" :data-tab-content="`tab-${link}`">
    <component v-if="!!heading" :is="level">
      {{ heading }}
    </component>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  const { link, level, heading } = withDefaults(
    defineProps<{
      link: number | string;
      level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      heading?: string;
    }>(),
    {
      level: 'h3',
    }
  );
</script>
