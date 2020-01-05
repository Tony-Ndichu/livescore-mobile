// src/plugins/vuetify.js

import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
// import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify);

const opts = {
  icons: {
    iconfont: 'mdiSvg',
  },
};

export default new Vuetify(opts);
