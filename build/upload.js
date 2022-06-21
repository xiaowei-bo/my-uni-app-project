
const ci = require('miniprogram-ci');
const env = process.argv.slice(2)[1].split('=')[1]; // test | staging | production
const projectName = process.argv.slice(2)[0].split('=')[1];
const { robotMap, appidMap } = require("./config");
const robot = robotMap[env];
const appid = appidMap[projectName]
let { version, desc } = require(`${process.cwd()}/projects/${projectName}/config/update_log.js`);

console.log(`正在上传 ${projectName} 项目 ${env} 环境`);
const project = new ci.Project({
    appid: appid,
    type: 'miniProgram',
    projectPath: `${process.cwd()}/projects/${projectName}/dist/${env === 'production' ? 'build' : 'dev'}/mp-weixin`,
    privateKeyPath: `${process.cwd()}/projects/${projectName}/config/private.${appid}.key`
})
ci.upload({
    project,
    version,
    desc,
    setting: {
        minify: true,
        es6: true,
        es7: true,
        minifyJS: true,
        minifyWXML: true,
        minifyWXSS: true,
        autoPrefixWXSS: true
    },
    robot
}).then(res => {
    console.log(res)
    console.log('上传成功')
    console.log('小程序发版成功，请前往微信公众平台查看')
}).catch(error => {
    if (error.errCode == -1) {
        console.log('上传成功')
        console.log('小程序发版成功，请前往微信公众平台查看')
    }
    console.log(error)
    console.log('上传失败')
    process.exit(-1)
})