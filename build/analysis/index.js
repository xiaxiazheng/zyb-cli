"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const dayjs = require("dayjs");
const walkDir_1 = require("../utils/walkDir");
const inquirer = require("inquirer");
const split_by_month_1 = require("./split-by-month");
const isFileExist_1 = require("../utils/isFileExist");
const listen_1 = require("../listen");
const analysis = async () => {
    const reportPath = path_1.resolve(process.cwd(), "report.csv");
    if (!(await isFileExist_1.default(reportPath))) {
        fs_1.writeFileSync(reportPath, "", "utf-8"); // 新建文件
    }
    // 遍历文件夹，获取所有文件
    const { fileList } = await walkDir_1.default({
        handleFile: (obj) => {
            const { stat, name, dir: _dir, path } = obj;
            const time = dayjs(stat.birthtime).format("YYYY-MM-DD HH:mm:ss");
            fs_1.appendFileSync(reportPath, `${name},${path},${time}\n`);
        },
        filterDirList: [".git", "node_modules", "build"],
    });
    console.log("fileList", fileList);
    inquirer
        .prompt([
        {
            type: "list",
            message: "请选择下一步操作",
            name: "choice",
            choices: ["按月份分类文件", "网页查看分类结果", "退出"],
        },
    ])
        .then((answers) => {
        const { choice } = answers;
        if (choice === "按月份分类文件") {
            split_by_month_1.default(fileList);
        }
        else if (choice === "网页查看分类结果") {
            listen_1.default();
        }
        else {
            process.exit();
        }
    });
};
exports.default = analysis;
