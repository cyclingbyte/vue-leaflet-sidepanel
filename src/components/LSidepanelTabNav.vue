<template>
  <li class="sidepanel-tab">
    <a
      href="#"
      class="sidebar-tab-link"
      role="tab"
      :data-tab-link="`tab-${link}`"
    >
      <slot></slot>
    </a>
  </li>
</template>

<script setup lang="ts">
  const { link } = defineProps<{
    link: number | string;
  }>();
</script>
