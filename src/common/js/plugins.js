import utils from './utils.js';
import store from '../../store';
import { ENV, xueUrlMap } from './config.js';

export default {
    install(Vue, options) {
        Vue.prototype.$store = store;
        Vue.prototype.$utils = utils;
        Vue.prototype.$ENV = ENV;
        Vue.prototype.$xueUrlMap = xueUrlMap;

        Vue.filter('u-price', function(price) {
            price = (+price).toFixed(2);
            return price;
        });
        Vue.filter('u-phone', function(_phone) {
            const phone = String(_phone).replace(/\s+/g, '').substring(0,11);
            const pre = phone.substring(0, 3);
            const mid = phone.substring(3, 7);
            const last = phone.substring(7, 12);
            return `${pre} ${mid} ${last}`
        });
    }
};