import Vue from 'vue';
import App from './App';
import UPlugins from './common/js/plugins.js';

Vue.use(UPlugins);

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
  ...App
});
app.$mount();
