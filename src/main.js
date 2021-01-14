import Vue from 'vue'
import App from './App'
import myPlugins from './common/js/plugins.js';

Vue.use(myPlugins);
Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
  ...App
})

app.$mount()
