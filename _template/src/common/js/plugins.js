import utils from './utils.js';
import request from './request.js';
import store from '../../store';
import { ENV, urlMap } from './config.js';

export default {
    install(Vue, options) {
        Vue.prototype.$store = store;
        Vue.prototype.$utils = utils;
        Vue.prototype.$request = request;
        Vue.prototype.$ENV = ENV;
        Vue.prototype.$urlMap = urlMap;
    }
};