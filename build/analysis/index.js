"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const dayjs = require("dayjs");
const walkDir_1 = require("../utils/walkDir");
const inquirer = require("inquirer");
const split_by_month_1 = require("./split-by-month");
const listen_1 = require("../listen");
const analysis = async () => {
    const reportPath = (0, path_1.resolve)(process.cwd(), "report.csv");
    (0, fs_1.writeFileSync)(reportPath, "", "utf-8"); // 新建文件 或 覆盖原有文件为空
    // 遍历文件夹，获取所有文件
    const { fileList } = await (0, walkDir_1.default)({
        handleFile: (obj) => {
            const { stat, name, dir: _dir, path } = obj;
            const time = dayjs(stat.birthtime).format("YYYY-MM-DD HH:mm:ss");
            (0, fs_1.appendFileSync)(reportPath, `${name},${path},${time}\n`);
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
            (0, split_by_month_1.default)(fileList, reportPath);
        }
        else if (choice === "网页查看分类结果") {
            (0, listen_1.default)();
        }
        else {
            process.exit();
        }
    });
};
exports.default = analysis;
