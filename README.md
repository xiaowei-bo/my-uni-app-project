### 概览

这是一个基于 uni-app 的小程序管理框架，框架提供基础模板（_template）,模板初始包含 扫码测试页及webview页。
框架提供基础创建小程序脚本，提供小程序版本统一管理，提供代码上传脚本

### 命令

1. 创建

- npm run create
- 交互式填写 小程序名称及小程序appid，脚本自动替换至模板并创建子项目至 projects 中并生成对应 upload 命令放置于父项目 script 中

2. 启动

- npm run dev | npm run start | npm start
- 交互式选择要启动的小程序，启动脚本自动检测子项目 node_modules 是否存在 自动安装依赖 并 启动

3. 部署

- sh build/deploy.sh projectName environment （eg：sh build/deploy.sh jinshu test）

### 目录

```
    ├── README.md                   - 项目说明
    ├── _template/                  - 基础模板
    │   ├── config/                 - 子项目配置
    │   │   ├── private.appid.key   - 代码上传秘钥
    │   │   └── update_log.js       - 小程序版本管理文件
    │   ├── package.json            - 包管理文件
    │   ├── project.config.json     - 项目配置文件
    │   └── src/                    - 开发目录
    ├── build/                      - 工程相关
    │   ├── config.js               - 配置文件
    │   ├── deploy.sh               - 部署脚本
    │   ├── start.js                - 本地启动脚本
    │   └── upload.js               - 代码上传脚本
    ├── create/                     - 创建脚本
    │   ├── answer.js
    │   └── index.js
    ├── package.json
    └── projects/                   - 所有项目
```

### 使用步骤

1. 拉取该项目(git clone ...)  
2. 安装依赖(npm i)
3. 创建小程序(npm run create)
4. 启动小程序(npm start)
5. 开发...
6. 打开微信公众平台，下载对应的小程序上传秘钥文件，替换上述创建小程序中的 config/private.appid.key
7. 本地部署 | 或接入远程部署平台(sh build/deploy.sh projectName environment)
8. 打开微信公众平台版本管理，即可看到三个小机器人，对应关系如下：
    1  —— master
    2  —— staging
    3  —— production（仅该版本可被用作提审发版）

### 其他

1. 多小程序项目独立构建，互不关联，因此禁止任何形式的逻辑耦合

2. 子项目相关

```
    小程序代码量限制问题
    采用分包机制，分为首页主包，公共页面分包，...分包
    所有图片采用 CDN 方式
        管理于 common/images 中
        js 引入 index.js 中对应图片变量即可使用
        scss 中直接使用 index.scss 中对应图片变量即可
        尺寸单位使用 rpx，uni-app已处理
```