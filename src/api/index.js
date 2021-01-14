import UTools from '../common/js/utils.js';

function getUserInfo() {
    return UTools.request({
        url: '/user.vpage',
        method: 'GET',
        data: {
            _time: new Date().getTime()
        }
    });
}

function getParamInfo(data) {
    return UTools.request({
        url: '/params.vpage',
        method: 'GET',
        data: data
    });
}

export {
    getUserInfo,
    getParamInfo
}