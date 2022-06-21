import { getUserInfo, getUserExtendInfo, getUnionIdStatus } from '../../api/index.js';

export default {
    state: {
        userInfo: {},
        jsCode: ''
    },
    mutations: {
        SET_USERINFO(state, userInfo) {
            state.userInfo = userInfo
        },
        SET_JSCODE(state, jsCode) {
            state.jsCode = jsCode
        }
    },
    getters: {
        userInfo: state => {
            return state.userInfo
        },
        jsCode: state => {
            return state.jsCode
        }
    },
    actions: {
        async setUserInfo(context) {
        },
        setJsCode(context) {
            return new Promise((resolve) => {
                uni.login({
                    provider: 'weixin',
                    success: async (res) => {
                        context.commit('SET_JSCODE', res.code);
                        resolve({
                            jsCode: res.code
                        });
                    }
                });
            });
        },
        checkSession(context) {
            return new Promise((resolve) => {
                uni.checkSession({
                    success() {
                        resolve({
                            jsCode: context.getters.jsCode
                        });
                    },
                    async fail() {
                        const res = await context.dispatch('setJsCode');
                        resolve(res);
                    }
                });
            });
        }
    }
}
