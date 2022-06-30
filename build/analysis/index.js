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
    //   console.log("fileList", fileList);
    const map = {};
    fileList.forEach((item) => {
        const time = dayjs(item.stat.birthtime).format("YYYY-MM");
        if (typeof map[time] === "undefined") {
            map[time] = [item];
        }
        else {
            map[time].push(item);
        }
    });
    console.log("map", map);
    fs_1.mkdirSync("./origin");
    Object.keys(map).forEach((item) => {
        fs_1.mkdirSync(`./origin/${item}`);
        map[item].forEach((file) => {
            fs_1.copyFileSync(file.path, `./origin/${item}/${file.name}`);
        });
    });
    process.exit();
};
exports.default = analysis;
