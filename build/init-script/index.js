"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../utils/index");
const inquirer = __importStar(require("inquirer"));
const fs = __importStar(require("fs"));
const shelljs_1 = __importDefault(require("shelljs"));
// import util from "util";
const path = __importStar(require("path"));
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
        shelljs_1.default.set("-e"); // 这个 -e 必不可少啊
        shelljs_1.default.cd(`${folder}`);
        index_1.logger.base("正在安装脚本依赖");
        index_1.logger.base(index_1.shellExec(`npm i`));
        index_1.logger.success(`脚本依赖安装成功`);
        /** 用 vscode 打开项目 */
        index_1.logger.base("正在使用 vscode 打开项目");
        index_1.shellExec(`code .`);
        index_1.logger.success(`项目打开成功`);
        process.exit();
    })
        .catch((err) => index_1.logger.error(err));
};
module.exports = initScript;
