import { ENV, urlMap } from './config.js';
import request from "./request.js";

/**
 * @description 跳转 h5 链接，需全链
 * @param {String} url 跳转链接
 * @param {Boolean} Boolean_page_close 是否关闭当前页面
 */
async function openLinkH5(url, Boolean_page_close) {
    if(!url.includes("http")) {
        url = `${urlMap[ENV]}${url}`
    }
    const jump = Boolean_page_close ? uni.redirectTo : uni.navigateTo;
    const resUrl = `/package_common/webview/index?url=${encodeURIComponent(url)}`;
    jump({ url: resUrl });
}

/**
 * @description 存 cookie
 * @param {*} key 
 * @param {*} value 
 */
function setCookie(key, value) {
    const cookieObj = uni.getStorageSync(`${ENV}_cookies`) || {};
    cookieObj[key] = value;
    uni.setStorageSync(`${ENV}_cookies`, cookieObj);
}

/**
 * @description 取 cookie
 * @param {*} key 
 */
function getCookie(key) {
    const cookieObj = uni.getStorageSync(`${ENV}_cookies`) || {};
    return cookieObj[key];
}

/**
 * @description 获取地址栏参数
 * @param {String} item 
 */
function getQuery(item, url) {
    if(!url) {
        const pages = getCurrentPages();
        const curPage = pages[pages.length-1];
        const query = curPage ? (curPage.options || curPage.$route.query) : {};
        if(item) return query[item] || '';
        return query;
    } else if(!url.includes('?')) {
        if(item) return '';
        return {};
    } else {
        const query = {};
        const _url = url.split('?')[1];
        _url.split("&").forEach(function (kv) {
            query[kv.split("=")[0]] = decodeURIComponent(kv.split("=")[1]);
        });
        if(item) return query[item] || '';
        return query;
    }
}


export default {
    openLinkH5,
    setCookie,
    getCookie,
    getQuery
}
