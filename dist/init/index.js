"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../utils/index");
const inquirer = require("inquirer");
const fs = require("fs");
const shell = require("shelljs");
// import util from "util";
const path = require("path");
// 在运行该命令的当前目录初始化一个脚本模板
const initScript = () => {
    inquirer
        .prompt([
        {
            type: "input",
            name: "folder",
            message: "请输入脚本名称",
        },
    ])
        .then(async (answers) => {
        const { folder } = answers;
        /** 创建文件夹 */
        index_1.logger.base(`正在新建脚本文件夹 ${folder}`);
        fs.mkdir(`${folder}`, (err) => {
            if (err)
                index_1.logger.error(err);
        });
        index_1.logger.success(`新建脚本文件夹 ${folder} 成功`);
        /** 复制脚本模板 */
        index_1.logger.base(`正在复制脚本模板`);
        await index_1.copyDir(path.resolve(__dirname, `../../assets/template`), `./${folder}`);
        // 修改项目名称
        const data = fs.readFileSync(`./${folder}/package.json`, "utf-8");
        fs.writeFileSync(`./${folder}/package.json`, data.replace("zyb-script", `${folder}`), "utf-8");
        index_1.logger.success(`复制脚本模板成功`);
        /** 进入文件夹安装依赖 */
        shell.set("-e"); // 这个 -e 必不可少啊
        shell.cd(`${folder}`);
        index_1.logger.base("正在安装脚本依赖");
        index_1.logger.base(index_1.shellExec(`npm i`));
        index_1.logger.success(`脚本依赖安装成功`);
        /** 用 vscode 打开项目 */
        index_1.logger.base("正在使用 vscode 打开项目");
        index_1.shellExec(`code .`);
        index_1.logger.success(`项目打开成功`);
        process.exit(0);
    })
        .catch((err) => {
        index_1.logger.error(err);
        process.exit(0);
    });
};
exports.default = initScript;
