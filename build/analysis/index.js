"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const dayjs = require("dayjs");
const walkDir_1 = require("../utils/walkDir");
const isFileExist = (file) => {
    return new Promise((resolve) => {
        fs_1.access(file, fs_1.constants.F_OK, (err) => {
            err ? resolve(false) : resolve(true);
        });
    });
};
const analysis = async () => {
    const reportPath = path_1.resolve(process.cwd(), "report.csv");
    if (!(await isFileExist(reportPath))) {
        fs_1.writeFileSync(reportPath, "", "utf-8");
    }
    const { fileList } = await walkDir_1.default({
        handleFile: (stat, name, dir, filePath) => {
            const time = dayjs(stat.birthtime).format("YYYY-MM-DD HH:mm:ss");
            fs_1.appendFileSync(reportPath, `${name},${dir},${filePath},${time}\n\t`);
        },
        filterDirList: [".git", "node_modules", "build"],
    });
    console.log("fileList", fileList);
    process.exit();
};
exports.default = analysis;
