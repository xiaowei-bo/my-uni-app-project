project=$1
stage=$2
workDir=`pwd`

diffInfo=`git diff --name-only HEAD^`
if [[ $diffInfo =~ "package.json" ]];
then
    echo "外层依赖开始安装..."
    npm i
else
    echo "外层 package.json 无变动"
fi

if [ ! -d "$workDir/node_modules" ];
then
    echo "外层 node_modules 不存在外层依赖开始安装..."
    npm i
fi

if [[ $diffInfo =~ "projects/$project/package.json" ]];
then
    echo "$project 项目依赖开始安装..."
    cd $workDir/projects/$project
    npm i
else
    echo "$project 项目 package.json 无变动"
fi

if [ ! -d "$workDir/projects/$project/node_modules" ];
then
    echo "$project 项目 node_modules 不存在，$project 项目依赖开始安装..."
    cd $workDir/projects/$project
    npm i
fi

# 小程序构建
echo "$project 项目 开始构建..."
cd $workDir/projects/$project
npm run build:mp-weixin:${stage}

if [ "$?" != "0" ]; then
    echo "小程序构建失败!!!"
    exit 1
fi

# 上传小程序代码
echo "$project 项目 开始上传..."
cd $workDir
npm run upload:$project:${stage}

if [ "$?" != "0" ]; then
    echo "代码上传失败!!!"
    exit 1
fi
