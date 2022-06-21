const askQuestions = require("./answer");
const fs = require("fs");
const shell = require("shelljs");
const replace = require("replace");

const init = async() => {
    const { miniName, miniAppid } = await askQuestions();
    const tagDir = `projects/${miniName}`;
    if(fs.existsSync(tagDir)) {
        console.log(`${miniName}小程序已存在!!!`);
        return;
    }
    fs.mkdirSync(tagDir);
    shell.cp('-R', '_template/*', tagDir);
    // appid 替换
    replace({
        regex: "__appid__",
        replacement: miniAppid,
        paths: [`${tagDir}/project.config.json`, `${tagDir}/src/manifest.json`],
        recursive: true,
        silent: true,
    });
    // appName 替换
    replace({
        regex: "__appname__",
        replacement: miniName,
        paths: [`${tagDir}/package.json`, `${tagDir}/src/manifest.json`],
        recursive: true,
        silent: true,
    });
    // 增加上传脚本至父 script 中
    replace({
        regex: `"upload:demo:test": "node build/upload.js project=demo NODE_ENV=test"`,
        replacement: `"upload:${miniName}:test": "node build/upload.js project=${miniName} NODE_ENV=test",\n    "upload:demo:test": "node build/upload.js project=demo NODE_ENV=test"`,
        paths: [`package.json`],
        recursive: true,
        silent: true,
    });
    replace({
        regex: `"upload:demo:staging": "node build/upload.js project=demo NODE_ENV=staging"`,
        replacement: `"upload:${miniName}:staging": "node build/upload.js project=${miniName} NODE_ENV=staging",\n    "upload:demo:staging": "node build/upload.js project=demo NODE_ENV=staging"`,
        paths: [`package.json`],
        recursive: true,
        silent: true,
    });
    replace({
        regex: `"upload:demo:production": "node build/upload.js project=demo NODE_ENV=production"`,
        replacement: `"upload:${miniName}:production": "node build/upload.js project=${miniName} NODE_ENV=production",\n    "upload:demo:production": "node build/upload.js project=demo NODE_ENV=production"`,
        paths: [`package.json`],
        recursive: true,
        silent: true,
    });
}

init();