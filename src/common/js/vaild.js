
const v_mobile = () => {
    const mobile = this.mobile.replace(" ", "");
    return mobile && (/^1[0-9]{10}$/.test(mobile));
};

const v_map = {
    mobile: {
        vertifyFun: v_mobile,
        vertifyTip: '手机号输入有误'
    }
};

export function vaild(v_arr) {
    let result = true;
    const errorArr = [];
    for(const k of v_arr) {
        const cur_verify_res = v_map[k] && v_map[k]['vertifyFun']();
        result = result && cur_verify_res;
        if(!cur_verify_res) {
            errorArr.push(k);
        }
    }
    errorArr.length && uni.showToast({
        title: v_map[errorArr[0]].vertifyTip,
        icon: 'none',
        mask: true
    });
    return result;
}