import { ENV, apiMap } from './config.js';
import { vaild } from './vaild.js'

/**
 * @description 处理链接参数
 * @param {String} url 
 * @param {Object} obj
 */
function objToUrl(obj = {}, url = '') {
    if(typeof obj !== 'object' || !Object.keys(obj).length) return url;
    const _arr = [];
    const _hasQuery = url && url.includes('?');
    for(const k in obj) {
        _arr.push(`${k}=${obj[k]}`);
    }
    return `${url}${_hasQuery ? '&' : '?'}${_arr.join('&')}`;
}

// 拦截 登录接口 cookies 信息持久化至 storage
function saveCookie(cookies) {
    const arr = cookies.map(v => v.split(';')).flat();;
    const cookieArr = [ ...new Set(arr) ];
    const cookieObj = {};
    cookieArr.forEach((v) => {
        const va = v.split('=');
        cookieObj[va[0]] = va[1];
    });
    uni.setStorageSync(`${ENV}_cookies`, cookieObj);
}

// 为每个接口请求插入 cookie 信息
function insertCookie() {
    const obj = uni.getStorageSync(`${ENV}_cookies`);
    let str = '';
    for(const k in obj) {
        str = `${str};${k}=${obj[k]}`;
    }
    const cookie = str.slice(1);
    return cookie;
}

/**
 * @description 通用 request 请求
 * @param {Object} conf 
 */
function request(conf = {}) {
    const { url, method, data, header } = conf;
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${apiMap[ENV]}${url}`,
            method: (method || 'POST').toUpperCase(),
            header: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'cookie': insertCookie(),
                ...header
            },
            data: data,
            success: (res) => {
                if(res.statusCode === 200) {
                    if(res.cookie.length) {
                        saveCookie(res.cookies);
                    }
                    resolve(res.data);
                } else {
                    reject(res);
                }
            },
            fail: (err) => {
                reject(err);
            }
        });
    })
}

export default {
    objToUrl,
    request,
    vaild
}
