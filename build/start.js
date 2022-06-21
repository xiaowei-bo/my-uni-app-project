const fs = require("fs");
const inquirer = require("inquirer");
const shell = require("shelljs");
const projects = fs.readdirSync("projects/");

if(!projects || !projects.length) {
    console.log("项目中暂无可启动的小程序!");
    return;
}
const askQuestions = () => {
    const questions = [
        {
            type: "list",
            name: "project",
            message: "请选择你想启动的小程序",
            choices: projects,
            filter: function(val) {
                return val;
            }
        }
    ];
    return inquirer.prompt(questions);
};

const init = async () => {
    const { project } = await askQuestions();
    shell.cd(`${process.cwd()}/projects/${project}/`);
    if(!fs.existsSync("node_modules")) {
        console.log("项目依赖不存在，开始安装...");
        shell.exec("npm install");
    }
    shell.exec("npm run start");
}
init();