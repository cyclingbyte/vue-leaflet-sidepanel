<template>
  <div
    :id="id"
    ref="panel"
    class="sidepanel"
    aria-label="side panel"
    aria-hidden="false"
  >
    <div class="sidepanel-inner-wrapper">
      <nav
        v-if="headings && headings.length > 0"
        class="sidepanel-tabs-wrapper"
        aria-label="sidepanel tab navigation"
      >
        <ul class="sidepanel-tabs">
          <li v-for="heading in headings" :key="heading.key">
            <LSidepanelTabNav :link="heading.key">
              <template v-if="slots[`heading.${heading.key}`]">
                <slot :name="`heading.${heading.key}`"></slot>
              </template>
              <template v-else>
                {{ heading.value }}
              </template>
            </LSidepanelTabNav>
          </li>
        </ul>
      </nav>
      <div class="sidepanel-content-wrapper">
        <div class="sidepanel-content">
          <slot></slot>
        </div>
      </div>
    </div>
    <div class="sidepanel-toggle-container">
      <button
        class="sidepanel-toggle-button"
        type="button"
        aria-label="toggle side panel"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import * as L from 'leaflet';
  import 'leaflet.sidepanel';
  import { onMounted, useSlots, ref, watch, type Slots } from 'vue';
  import LSidepanelTabNav from './LSidepanelTabNav.vue';

  // Define Types
  type SidePanelPositionHeading = { key: string | number; value: string };
  type SidePanelPositionHeadings = SidePanelPositionHeading[] | undefined;

  // Define model
  const isOpen = defineModel<boolean>({ default: false, required: false });
  watch(isOpen, (value) => {
    if (!panel.value) return; // Prevents open/close before panel is mounted
    if (value) open();
    else close();
  });

  // Define props
  const props = withDefaults(
    defineProps<{
      id: string;
      headings?: SidePanelPositionHeadings;
      position?: L.SidePanelPosition;
      tabsPosition?: L.SidePanelTabsPosition;
      darkMode?: boolean;
      defaultTab?: string | number;
      pushControls?: boolean;
      size?: string;
    }>(),
    {
      headings: undefined,
      position: 'left',
      tabsPosition: 'top',
      darkMode: false,
      defaultTab: 1,
      pushControls: false,
      size: '400px',
    }
  );
  const {
    id,
    headings,
    position,
    tabsPosition,
    darkMode,
    defaultTab,
    pushControls,
    size,
  } = props;

  // Define Emits
  const emit = defineEmits<{
    (e: 'tabClick', tab: HTMLElement): void;
  }>();

  // use slots
  const slots: Slots = useSlots();

  // Initialize the side panel
  const map = ref<HTMLElement | null>(null);
  const panel = ref<HTMLElement | null>(null);
  const sidePanel = ref<L.Control.SidePanel>();

  onMounted(() => {
    if (!panel.value) return console.error('Panel not found');
    map.value = panel.value.parentElement;
    if (!map.value) return console.error('Map not found');
    sidePanel.value = L.control.sidepanel(id, {
      panelPosition: position,
      hasTabs: headings && headings.length > 0,
      tabsPosition,
      darkMode,
      defaultTab: defaultTab || headings?.[0]?.key,
      pushControls,
      size,
      onTabClick: (tab: HTMLElement) => emit('tabClick', tab),
      onToggle: (opened: boolean) => (isOpen.value = opened),
    });
    sidePanel.value.addTo(map.value as unknown as L.Map); // expected L.Map but also accepts HTMLElement
    // Intial open/close
    if (isOpen.value) open();
    else close();
  });

  const open = () => {
    if (!sidePanel.value) return console.error('Panel not found');
    sidePanel.value.open();
    isOpen.value = true;
  };

  const close = () => {
    if (!sidePanel.value) return console.error('Panel not found');
    sidePanel.value.close();
    isOpen.value = false;
  };
</script>
