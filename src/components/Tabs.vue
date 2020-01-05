<template>
  <div id="tabs">
    <v-app id="inspire">
      <div>
        <v-row
          justify="space-around"
        />

        <v-tabs
          id="scrolling-techniques-2"
          v-model="tab"
          background-color="#00A54F"
          class="elevation-2"
          dark
          :centered="centered"
          :grow="grow"
          :vertical="vertical"
          :right="right"
          :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
          :next-icon="$next"
          :icons-and-text="icons"
          :show-arrows="true"
        >
          <v-tabs-slider />

          <v-tab
            v-for="item in items"
            :key="item"
            class="tab-text"
          >
            {{ item }}
            <v-icon v-if="icons">
              mdi-phone
            </v-icon>
          </v-tab>

          <!-- <v-tab-item>
            <v-card
              flat
              tile
            >
              <v-card-text>
                <GoalsAndScorers />
                <Pitch />
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card
              flat
              tile
            >
              <v-card-text />
            </v-card>
          </v-tab-item> -->
        </v-tabs>
      </div>
    </v-app>
  </div>
</template>

<script>
import GoalsAndScorers from './GoalsAndScorers.vue';
import Pitch from './Pitch.vue';

export default {
  name: 'Tabs',
  components: {
    GoalsAndScorers,
    Pitch,
  },
  data: () => ({
    tab: null,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    icons: false,
    centered: true,
    grow: false,
    vertical: false,
    prevIcon: false,
    nextIcon: true,
    right: false,
    tabs: 7,
    items: [
      'MATCH INFO', 'STATISTICS', 'LINE-UP', 'OTHER',
    ],
  }),
};
</script>

<style>
.v-slide-group__prev {
    display: none !important;
}

.tab-text {
    padding: 0px !important;
    font-size: 10px !important;
}
</style>
