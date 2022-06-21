const inquirer = require("inquirer");
// 命令行交互问答
const askQuestions = () => {
    const questions = [
        {
            name: "miniName",
            type: "input",
            message: "请输入小程序名称"
        },
        {
            name: "miniAppid",
            type: "input",
            message: "请输入小程序appid"
        }
    ];
    return inquirer.prompt(questions);
};
module.exports = askQuestions;
