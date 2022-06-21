/**
 * @description 小程序版本维护
 * @author xiaowei.bo
 * 该版本数组只增不删，严禁修改他人记录
 * 将自己的更新添加至数组中，永远加在第一项
 */
 const versionList = [
    {
        version: "1.0.0",
        desc: "小程序",
        author: "xiaowei.bo"
    }
];

const env = process.argv.slice(2)[1].split('=')[1];
const curVersion = versionList[0];
curVersion.desc = `${env} 环境：${curVersion.desc}-by@${curVersion.author}`;
module.exports = curVersion;
