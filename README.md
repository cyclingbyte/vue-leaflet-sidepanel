[![npm version](https://img.shields.io/npm/v/vue-leaflet-sidepanel)](https://www.npmjs.com/package/vue-leaflet-sidepanel)
[![npm downloads](https://img.shields.io/npm/dt/vue-leaflet-sidepanel)](https://www.npmjs.com/package/vue-leaflet-sidepanel)
[![npm license](https://img.shields.io/npm/l/vue-leaflet-sidepanel)](https://github.com/cyclingbyte/vue-leaflet-sidepanel?tab=MIT-1-ov-file#readme)
![last commit](https://img.shields.io/github/last-commit/cyclingbyte/vue-leaflet-sidepanel)
<img src="./src/assets/language-typescript.svg" height="24px" />

<!-- ![npm dependents](https://img.shields.io/librariesio/dependents/npm/vue-leaflet-sidepanel) -->
<!-- ![git stars](https://img.shields.io/github/stars/cyclingbyte/vue-leaflet-sidepanel) -->

# vue-leaflet-sidepanel

Slide side panel plugin for [@vue-leaflet/vue-leaflet](https://github.com/vue-leaflet/vue-leaflet/ 'vue-leaflet for vue3')

This plugin is a wrapper for **vue3** and based on [cyclingbyte/Leaflet.SidePanel](https://github.com/cyclingbyte/Leaflet.SidePanel 'Leaflet.SidePanel')

## Prerequirements

- [leaflet](https://github.com/Leaflet/Leaflet) (v1.0.0 or higher)
  (Tested with v1.8.0)
- [@vue-leaflet/vue-leaflet](https://github.com/vue-leaflet/vue-leaflet) (v0.10.1 or higher)
  (Tested with v0.10.1)

This packages targets Vue 3. There is no support for Vue 2 (it might work, but it might not)

## Installation

```sh
# NPM
npm i vue-leaflet-sidepanel

# yarn
yarn add vue-leaflet-sidepanel

# pnpm
pnpm i vue-leaflet-sidepanel
```

## Demo

You can find a demo [here](https://cyclingbyte.github.io/Leaflet.SidePanel/ 'Demo for Leaflet.SidePanel')

## Usage

Until the complete documentation is ready, please check the `playground/App.vue` as example usage.
Feel free to ask questions in the discussion area if something is not clear

```vue
<template>
  <div style="width: fit-content; margin: auto">
    <l-map id="map" :zoom="15" :center="[53.0758, 8.8071]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
        :attribution="attribution"
      />
      <l-sidepanel id="leftPanel" :headings tabsPosition="left">
        <template #[`heading.1`]>
          <!-- Here you can custumize your tab if simple text is not enough. Follow the scheme #[`heading.<link>`] -->
          1. Tab
        </template>
        <l-sidepanel-tab link="1">
          <p>Content 1</p>
        </l-sidepanel-tab>
        <!-- [...] -->
      </l-sidepanel>
      <l-sidepanel id="rigthPanel" position="right" dark-mode></l-sidepanel>
    </l-map>
  </div>
</template>

<script setup lang="ts">
  import 'leaflet/dist/leaflet.css';
  import 'vue-leaflet-sidepanel/dist/style.css';
  import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';
  import { LSidepanel, LSidepanelTab } from 'vue-leaflet-sidepanel';

  const attribution =
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

  const headings = [
    {
      // This is the link to the tab
      key: 1,
      // This is the text displayed in the tab, can be overridden with <template #[`heading.<link>`>
      value: 'Tab 1',
    },
  ];
</script>
```

## Credits

Special thanks to **[maxwell-ilai](https://github.com/maxwell-ilai 'Maxwell Ilai')** for the original sidepanel [maxwell-ilai/Leaflet.SidePanel](https://github.com/maxwell-ilai/Leaflet.SidePanel 'Leaflet.SidePanel by maxwell-ilai')

## Visitors

[![Flag Counter](https://s11.flagcounter.com/count2/NvG2/bg_FFFFFF/txt_000000/border_CCCCCC/columns_6/maxflags_12/viewers_0/labels_0/pageviews_1/flags_0/percent_0/)](https://info.flagcounter.com/NvG2)
