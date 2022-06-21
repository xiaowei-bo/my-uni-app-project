
import { ENV, urlMap } from './config.js';

/**
 * flat 不兼容处理方案
 * 兼容苹果7P 11.4.1版本 微信 7.1.10版本
 */
 if (!Array.prototype.flat) {
	Array.prototype.flat = function(count) {
        let c = count || 1;
        let len = this.length;
        let exe = [];
        if (this.length == 0) return this;
        while (c--) {
            let _arr = [];
            let flag = false;
            if (exe.length == 0) {
                flag = true;
                for (let i = 0; i < len; i++) {
                    if (this[i] instanceof Array) {
                    exe.push(...this[i]);
                    } else {
                    exe.push(this[i]);
                    }
                }
            } else {
                for (let i = 0; i < exe.length; i++) {
                    if (exe[i] instanceof Array) {
                    flag = true;
                    _arr.push(...exe[i]);
                    } else {
                    _arr.push(exe[i]);
                    }
                }
                exe = _arr;
            }
            if (!flag && c == Infinity) {
                break;
            }
        }
        return exe;
	}
}

// 拦截登录接口 cookies 信息持久化至 storage
const saveCookie = (cookies) => {
    const arr = cookies.map(v => v.split(';')).flat();
    const cookieArr = [ ...new Set(arr) ];
    const cookieObj = uni.getStorageSync(`${ENV}_cookies`) || {};
    cookieArr.forEach((v) => {
        const va = v.split('=');
        if(va[1]) {
            cookieObj[va[0]] = va[1];
        }
    });
    uni.setStorageSync(`${ENV}_cookies`, cookieObj);
}

// 为每个接口请求插入 cookie 信息
const insertCookie = () => {
    const obj = uni.getStorageSync(`${ENV}_cookies`);
    let str = '';
    for(const k in obj) {
        str = `${str};${k}=${obj[k]}`;
    }
    const cookie = str.slice(1);
    return cookie;
}

/**
 * @description request 请求
 * @param {Object} conf 
 */
const request = (conf = {}) => {
    let { url, method, data, header } = conf;
    header = header || {};
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${urlMap[ENV]}${url}`,
            method: (method || 'POST').toUpperCase(),
            header: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'x-requested-with': 'XMLHttpRequest',
                'withCredentials': true,
                'cookie': insertCookie(),
                ...header
            },
            data,
            success: (res) => {
                if(res.statusCode === 200) {
                    let loginPathArr = [
                        ''
                    ]
                    if(loginPathArr.includes(url)){
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

export default request;
