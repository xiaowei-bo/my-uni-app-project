import { getUserInfo } from '../../api/index.js';

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
        },
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
            const res = await getUserInfo();
            let userInfo = {
                hasLogin: false
            };
            if(res.success) {
                const currentUser = res.data.currentUser;
                userInfo = {
                    hasLogin: true,
                    ...currentUser
                }
            }
            context.commit('SET_USERINFO', userInfo);
        },
        setJsCode(context) {
            uni.login({
                provider: 'weixin',
                success(res) {
                    context.commit('SET_JSCODE', res.code);
                }
            });
        },
        checkSession(context) {
            uni.checkSession({
                complete() {
                    context.dispatch('setJsCode');
                }
            });
        }
    }
}