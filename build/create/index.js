"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
const shell = require("shelljs");
const index_1 = require("../utils/index");
function create() {
    //检查控制台是否可以运行`git `开头的命令
    if (!shell.which("git")) {
        //在控制台输出内容
        shell.echo("Sorry, this script requires git");
        shell.exit(1);
    }
    inquirer
        .prompt([
        {
            type: "list",
            message: "请选择你要新建的项目类型",
            name: "projectName",
            choices: ["koa-template", "rollup-template"],
        },
    ])
        .then((answers) => {
        const { projectName } = answers;
        console.log(`正在 clone ${projectName} 项目，请稍等`);
        const remote = `https://github.com/xiaxiazheng/${projectName}.git`;
        index_1.shellExec(`git clone ${remote} --depth=1`);
        shell.cd(`${projectName}`);
        index_1.shellExec(`npm i`);
        index_1.shellExec(`code .`);
        index_1.logger.base("done");
        process.exit();
    });
}
exports.default = create;
